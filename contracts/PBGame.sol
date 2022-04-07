pragma ton-solidity >= 0.47.0;

pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./interfaces/ITokenRoot.sol";
import "./interfaces/ITokenWallet.sol";
import "./interfaces/IGameHost.sol";
import "./interfaces/IAcceptTokensTransferCallback.sol";

import "./TokenWallet.sol";
import "./PBConstants.sol";
import "./abstract/RewardCalculatorShouldering.sol";


contract PBGame is PBConstants, RewardCalculatorShouldering, IAcceptTokensTransferCallback {

    // PILE token info
    TvmCell static walletCode;
    address static tokenRootAddress;

    // Game params
    uint64 static created;
    address static imageOwner;

    address gameWallet;
    uint16 remainingTiles;
    uint32 gameId;
    address gameHost;
    uint8 status;

    // Game render params
    uint8 vertFragments;
    uint8 horizFragments;
    uint8 maxColors;
    uint24[] renderSettings;
    uint128 tokensPerPut;
    string gameName;
    uint64 gameStartTime;

    mapping(address => PlayerInfo) public players;
    mapping(address => uint16[]) public playerColors;
    mapping(uint8 => uint8[][]) public field;
    mapping(uint8 => uint8[][]) public template;

    modifier onlyHost() {
        require(msg.sender == gameHost, CALLER_NOT_GAME_HOST);
        _;
    }

    modifier onlyOwner() {
        require(msg.pubkey() == tvm.pubkey(), CALLER_NOT_GAME_HOST);
        _;
    }

    modifier onlyImageOwner() {
        require(msg.sender == imageOwner, CALLER_NOT_IMAGE_OWNER);
        _;
    }

    event OperationCompleted(
        string name,
        address player,
        uint8 gameStatus,
        uint64 timestamp,
        uint128 value
    );

    constructor (uint24[] _renderSettings, string _gameName, uint64 _gameStartTime) public {

        optional(TvmCell) optSalt = tvm.codeSalt(tvm.code());
        require(optSalt.hasValue(), FAILED_FETCH_GAME_ID);
        (gameId, gameHost) = optSalt
            .get()
            .toSlice()
            .decode(uint32, address);

        require(msg.sender == gameHost, INVALID_GAME_HOST);
        gameName = _gameName;
        gameStartTime = _gameStartTime;
        //renderSettings [VERT_FRAGMENTS, HORIZ_FRAGMENTS, TOKENS_PER_PUT, MAX_COLORS, 0xfefefe, 0xaab0bc, 0x60697b, 0x2f353a, 0x1e2228]
        renderSettings = _renderSettings;
        vertFragments = uint8(renderSettings[0]);
        horizFragments = uint8(renderSettings[1]);
        tokensPerPut = uint128(renderSettings[2]) * uint128(1e9);
        maxColors = uint8(renderSettings[3]);


        status = STATUS_GAME_DRAFT;
        uint8 numFragments = vertFragments * horizFragments;
        for (uint8 n=0; n < numFragments; n++) {
            uint8[][] fieldPiece;
            for (uint8 i=0; i < ROW_COUNT; i++) {
                fieldPiece.push(new uint8[](COL_COUNT));
            }
            field[n] = fieldPiece;
        }

        gameWallet = getWalletAddress(address(this));
        tvm.log(format("Game wallet: {}", gameWallet));
        remainingTiles = uint16(ROW_COUNT) * uint16(COL_COUNT) * uint16(numFragments);
        tvm.log(format("remainingTiles: {}", remainingTiles));

        ITokenRoot(tokenRootAddress).deployWallet{value: 0, flag: 128, callback: PBGame.onDeploy}(
            address(this),
            0.3 ton
        );
    }

    function onDeploy(address gWallet) external {
    }

    function saveImageFragment(uint8 fragmentNum, uint8[][] tiles) external internalMsg onlyImageOwner {
        require(status == STATUS_GAME_DRAFT, WRONG_GAME_STATUS);
        require(fragmentNum < uint8(vertFragments * horizFragments), WRONG_FRAGMENT_COUNT);
        require(tiles.length == ROW_COUNT, WRONG_NUM_ROWS);
        for (uint8 i=0; i < ROW_COUNT; i++) {
            require(tiles[i].length == COL_COUNT, WRONG_NUM_COLS);
            for (uint8 j=0; j < COL_COUNT; j++) {
                require(tiles[i][j] > 0 && tiles[i][j] <= maxColors, WRONG_TILE_COLOR);
            }
        }
        template[fragmentNum] = tiles;
    }

    function setImageForReview() external internalMsg onlyImageOwner {
        require(status == STATUS_GAME_DRAFT, WRONG_GAME_STATUS);
        if (isImageComplete()) {
            status = STATUS_GAME_IMAGE_READY;
        }
        msg.sender.transfer(0, false, 64);
    }

    /*
        @notice A game host approves one of the games, and then players can start interacting with it.
        @param newStatus - new status, can be among the STATUS_GAME_* constants
    */
    function setGameStatus(uint8 newStatus) external internalMsg onlyHost {
        status = newStatus;
    }

    /*
        @notice An owner calls the wallet's claimTiles method, and the wallet calls back onClaimTiles with the number of tiles,
        the game records these tiles and assigns colors.
        @param ownerAddress - the game needs it to allocate tiles to the correct player
               (we assume that players initially only have their ownerAddress, the address
               with EVERs)
        @param tilesNum - the number of tiles a player wants to transform to colored tiles
    */
    function onClaimTiles(address ownerAddress, uint16 tilesNum) external internalMsg {
        require(msg.sender == getWalletAddress(ownerAddress), WALLET_DOES_NOT_MATCH_OWNER);
        require(status == STATUS_GAME_ACTIVE, WRONG_GAME_STATUS);
        require(now >= gameStartTime, GAME_NOT_STARTED);

        uint16[] pColors = playerColors[ownerAddress];
        if (pColors.empty()) {
            pColors = new uint16[](maxColors);
        }

        if (tilesNum == 1024) {
            tilesNum = 128;
        }

        uint16[] coloredTiles = getColoredTiles(tilesNum);

        for (uint16 i=0; i < maxColors; i++) {
             pColors[i] = math.min(coloredTiles[i] + pColors[i], 1024);
        }
        playerColors[ownerAddress] = pColors;
        emit OperationCompleted("onClaimTiles", ownerAddress, status, now, tilesNum);
    }

    /*
        @notice An owner calls the wallet's putTiles method, and the wallet calls back onPutTiles of a game
        with the data necessary to put the tiles.
        @param ownerAddress - address of an owner of a token wallet
        @param tiles - the array of tiles to put
        @param tokensNum - the allocated amount of tokens a game can receive
        @param balance - the balance of the sending token wallet
    */

    function onAcceptTokensTransfer(
        address tokenRoot,
        uint128 amount,
        address sender,
        address senderWallet,
        address remainingGasTo,
        TvmCell payload
    ) override external {
        require(msg.sender == gameWallet, WRONG_NOTIFICATION_SENDER);
        require(status == STATUS_GAME_ACTIVE, WRONG_GAME_STATUS);
        require(msg.value >= MIN_PUT_AMOUNT, NOT_ENOUGH_TOKENS_TO_PUT_TILE);
        require(amount == tokensPerPut, INVALID_TOKENS_PER_PUT);

        ColorTile[] tiles;

        if (!payload.toSlice().empty()) {
            tiles = abi.decode(payload, (ColorTile[]));
        }
        require(tiles.length <= MAX_PUT_PER_TURN, MAX_TILES_EXCEEDED);

        // Reserve a fee per put
        tvm.rawReserve(address(this).balance - msg.value + SERVICE_FEE, 2);

        addTilesToField(tiles, sender);

        if (remainingTiles == 0) {
            status = STATUS_GAME_COMPLETED;
            IGameHost(gameHost).onGameCompleted{value: 0.3 ton}(getInfo());
        }
        emit OperationCompleted("onAcceptTokensTransfer", sender, status, now, uint128(tiles.length));
    }

    function packTiles(ColorTile[] tiles) external pure returns (TvmCell){
        return abi.encode(tiles);
    }

    function completeGame(uint128 totalReward) external internalMsg {
        require(msg.sender == gameHost, INVALID_GAME_HOST);
        uint16 _totalTiles = uint16(ROW_COUNT) * uint16(COL_COUNT) * uint16(vertFragments * horizFragments);
        rewardLastPlayer(totalReward);
        rewardPrelastPlayer(totalReward);
        totalReward = (totalReward / 100) * 85;
        calculateRewards(totalReward, _totalTiles);
    }

    function rewardLastPlayer(uint128 totalReward) internal {
        address pAddress = getPlayerWithLastTile();
        PlayerInfo pl = players[pAddress];
        pl.reward += totalReward / 10;
        players[pAddress] = pl;
    }

    function rewardPrelastPlayer(uint128 totalReward) internal {
        address pAddress = getPlayerWithPrelastTile();
        PlayerInfo pl = players[pAddress];
        pl.reward += totalReward / 20;
        players[pAddress] = pl;
    }

    function sendReward(address playerAddress, uint128 rewardValue) override internal {
        PlayerInfo player = getPlayer(playerAddress);
        player.reward += rewardValue;
        players[playerAddress] = player;
        tvm.log(format("Calculate reward for {} is {:t}", playerAddress, rewardValue));
    }

    function claimReward() external {
        require(status == STATUS_GAME_COMPLETED, WRONG_GAME_STATUS);
        if (players.exists(msg.sender)) {
            PlayerInfo player = players[msg.sender];
            if (!player.isReceived) {
                TvmCell payload;
                ITokenWallet(gameWallet).transfer{value: 0.3 ton}(
                    player.reward,
                    msg.sender,
                    0 ton,
                    address(this),
                    false,
                    payload
                    );
                player.isReceived = true;
                players[msg.sender] = player;
                emit OperationCompleted("claimReward", msg.sender, status, now, player.reward);
            }
        }
    }

//
//  DRAIN functions
//

    /*
        @notice A game drains itself on completion
    */
    function drain() override internal view {
        tvm.rawReserve(0.1 ton, 0);
        gameHost.transfer({ value: 0, flag: 128 });
    }

    /*
        @notice Force a game to drain itself
    */
    function drainByHost() onlyHost external view {
        tvm.rawReserve(0.1 ton, 0);
        gameHost.transfer({ value: 0, flag: 128 });
    }

    function drainTokens(uint128 value) onlyHost external view {
        TvmCell payload;
        ITokenWallet(gameWallet).transfer{value: 0.3 ton}(
            value,
            msg.sender,
            0,
            address(this),
            false,
            payload
            );
    }
//
//        Service functions
//

    function getPlayerWithLastTile() internal view returns(address) {
        for ((address pAddress, PlayerInfo player): players) {
            if (player.isLast) {
                return pAddress;
            }
        }
    }

    function getPlayerWithPrelastTile() internal view returns(address) {
        for ((address pAddress, PlayerInfo player): players) {
            if (player.isPrelast) {
                return pAddress;
            }
        }
    }

    function isImageComplete() public view returns (bool) {
        uint8 frNum = uint8(vertFragments * horizFragments);
        uint8[] fragmentArr;

        for ((uint8 id, ): template) {
            fragmentArr.push(id);
        }
        if (fragmentArr.length == frNum) {
            return true;
        }
        return false;
    }

    /*
        @notice Derive token wallet contract address from owner credentials
        @param owner_address_ Address of a wallet which owns the token wallet
    */
    function getWalletAddress(address walletOwner) private inline view returns (address) {
        TvmCell stateInit = tvm.buildStateInit({
            contr: TokenWallet,
            varInit: {
                root_: tokenRootAddress,
                owner_: walletOwner
            },
            pubkey: 0,
            code: walletCode
        });

        return address(tvm.hash(stateInit));
    }

    function getPlayer(address ownerAddress) private view returns (PlayerInfo player) {
        if (players.exists(ownerAddress)) {
            player = players[ownerAddress];
        } else {
            player = PlayerInfo(getWalletAddress(ownerAddress), 0, false, false, 0, 0, false);
        }
    }

    /*
        @notice Calculates the number of tiles of each color to be claimed by a player in exchange for their tiles.
        @param tilesNum - the number of tiles a player wants to transform to colored tiles
    */
    function getColoredTiles(uint16 tilesNum) private view returns(uint16[] colorArr) {

        uint16 share = (tilesNum * 8) / 10;
        uint16 rest = tilesNum - (share / maxColors) * maxColors;

        for (uint8 i=0; i < maxColors; i++) {
            colorArr.push(share / maxColors);
        }

        for (uint8 i=0; i < (maxColors - 1); i++) {
            uint16 rn = rnd.next(rest);
            rnd.shuffle();
            colorArr[i] += rn;
            rest -= rn;
        }
        colorArr[4] += rest;
    }

    function addTilesToField (ColorTile[] tiles, address ownerAddress) private returns (bool) {
        bool isError = false;
        mapping(uint8 => uint8[][]) fieldTemp;
        uint16 remainingTilesTemp;
        fieldTemp = field;
        remainingTilesTemp = remainingTiles;

        PlayerInfo player = getPlayer(ownerAddress);
        uint16[] pColors = playerColors[ownerAddress];

        if (pColors.empty()) {
            isError = true;
            return isError;
        }
        for (ColorTile tile: tiles) {
            if ((template[tile.f][tile.y][tile.x] == tile.color)
            && (fieldTemp[tile.f][tile.y][tile.x] == 0)
            && (pColors[tile.color - 1] > 0))
            {
                fieldTemp[tile.f][tile.y][tile.x] = tile.color;
                pColors[tile.color - 1] -= 1;
                remainingTilesTemp -= 1;
                if (remainingTilesTemp == 1) {
                    player.isPrelast = true;
                }
                if (remainingTilesTemp == 0) {
                    player.isLast = true;
                }
            }
            else {
                isError = true;
                break;
            }
        }
        if (!isError) {
            player.lastPutTime = now;
            player.captured += uint16(tiles.length);
            field = fieldTemp;
            remainingTiles = remainingTilesTemp;
            players[ownerAddress] = player;
            playerColors[ownerAddress] = pColors;
        }
        return isError;
    }

    function getInfo() public view returns (GameInfo) {
        return GameInfo(
                    tokenRootAddress,
                    created,
                    imageOwner,
                    gameId,
                    gameWallet,
                    remainingTiles,
                    gameHost,
                    renderSettings,
                    status,
                    gameName,
                    gameStartTime
        );
    }

    function getPlayers() override internal returns (mapping(address => PlayerInfo)) {
        return players;
    }

}
