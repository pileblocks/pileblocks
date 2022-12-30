pragma ton-solidity >= 0.47.0;

pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./interfaces/ITokenRoot.sol";
import "./interfaces/ITokenWallet.sol";
import "./interfaces/IGameHost.sol";
import "./interfaces/IAcceptTokensTransferCallback.sol";
import "./interfaces/IFarmingWallet.sol";
import "./interfaces/IOracle.sol";

import "./TokenWallet.sol";
import "./FarmingWallet.sol";
import "./PBConstants.sol";
import "./abstract/RewardCalculatorNFT.sol";
import "./abstract/GameEvents.sol";
import "./libraries/ExpMath.sol";


contract PBGame is PBConstants, RewardCalculatorNFT, IAcceptTokensTransferCallback {

    // Oracle
    address public oracleAddress;

    // PILE token info
    TvmCell static walletCode;
    address static tokenRootAddress;
    TvmCell static farmingCode;

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

    //Game extra settings
    uint128 farmingSpeed;
    uint8 blockColorsProbability;

    // Block putting colors
    uint8[] public blockColors;

    mapping(address => PlayerInfo) public players;
    mapping(address => uint16[]) public playerColors;
    mapping(address => uint128) public playerBalances;

    mapping(uint8 => uint8[][]) public field;
    mapping(uint8 => uint8[][]) public template;

    modifier onlyHost() {
        require(msg.sender == gameHost, CALLER_NOT_GAME_HOST);
        _;
    }

    modifier onlyImageOwner() {
        require(msg.sender == imageOwner, CALLER_NOT_IMAGE_OWNER);
        _;
    }

    constructor (uint24[] _renderSettings, string _gameName, uint64 _gameStartTime) public {

        optional(TvmCell) optSalt = tvm.codeSalt(tvm.code());
        require(optSalt.hasValue(), FAILED_FETCH_GAME_ID);
        gameHost = optSalt
            .get()
            .toSlice()
            .decode(address);

        require(msg.sender == gameHost, INVALID_GAME_HOST);

        gameName = _gameName;
        gameStartTime = _gameStartTime;
        //renderSettings [VERT_FRAGMENTS, HORIZ_FRAGMENTS, TOKENS_PER_PUT, MAX_COLORS, 0xfefefe, 0xaab0bc, 0x60697b, 0x2f353a, 0x1e2228]
        renderSettings = _renderSettings;
        vertFragments = uint8(renderSettings[0]);
        horizFragments = uint8(renderSettings[1]);
        tokensPerPut = uint128(renderSettings[2]);
        maxColors = uint8(renderSettings[3]);
        blockColors = new uint8[](maxColors);

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
            DEPLOY_VALUE
        );
    }

    function onDeploy(address gWallet) external {
    }

    function setGameId(uint32 _gameId) external onlyHost {
        tvm.accept();
        gameId = _gameId;
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
        @notice A game may define some extra playground settings, for example, the number of stars and their size
    */
    function setGameExtraSettings(uint128[] _gameExtraSettings) external onlyImageOwner {
        require(status == STATUS_GAME_DRAFT, WRONG_GAME_STATUS);
        farmingSpeed = uint128(_gameExtraSettings[0]);
        blockColorsProbability = uint8(_gameExtraSettings[1]);
    }

    function getGameExtraSettings() external view returns(GameExtraSettings){
        return GameExtraSettings(
                    farmingSpeed,
                    blockColorsProbability
                );
    }

    function notifyBalanceChange(address ownerAddress, uint128 tokenBalance) external {
        require(msg.sender == getFarmingAddress(ownerAddress), WALLET_DOES_NOT_MATCH_OWNER);
        playerBalances[ownerAddress] = tokenBalance;
        ownerAddress.transfer({value: 0, flag: 64});
    }

    /*
        @notice An owner calls the farming wallet's claimTiles method, and the wallet calls back onClaimTilesFarming with the number of tiles,
        the game records these tiles and assigns colors.
        @param ownerAddress - the game needs it to allocate tiles to the correct player
               (we assume that players initially only have their ownerAddress, the address
               with EVERs)
        @param tilesNum - the number of tiles a player wants to transform to colored tiles
        @param tokenBalance - the number of tokens on the farming account
    */
    function onClaimTilesFarming(address ownerAddress, uint16 tilesNum) external internalMsg {
        require(msg.sender == getFarmingAddress(ownerAddress), WALLET_DOES_NOT_MATCH_OWNER);
        require(status == STATUS_GAME_ACTIVE, WRONG_GAME_STATUS);
        require(now >= gameStartTime, GAME_NOT_STARTED);
        require(msg.value >= MIN_CLAIM_AMOUNT, NOT_ENOUGH_TOKENS_TO_CLAIM_TILE);

        uint16[] pColors = playerColors[ownerAddress];

        if (pColors.empty()) {
            pColors = new uint16[](maxColors);
        }

        uint16[] coloredTiles = getColoredTiles(tilesNum);

        for (uint16 i=0; i < maxColors; i++) {
             pColors[i] = math.min(coloredTiles[i] + pColors[i], 1024);
        }
        playerColors[ownerAddress] = pColors;
        emit OperationCompleted("onClaimTiles", ownerAddress, status, now, tilesNum);
        ownerAddress.transfer({value: 0, flag: 64});
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
        address ,
        uint128 amount,
        address sender,
        address ,
        address ,
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

        PBGame(this).putTiles{value: 0, flag: 64}(tiles, sender);

    }

    function putTiles(ColorTile[] tiles, address ownerAddress) external internalMsg {
        require(msg.sender == address(this), WRONG_GAME_ADDRESS);
        addTilesToField(tiles, ownerAddress);
        PBGame(this).postPutTiles{value: 0, flag: 64}(ownerAddress, uint128(tiles.length));
    }

    function postPutTiles(address ownerAddress, uint128 tilesQty) external internalMsg {
        require(msg.sender == address(this), WRONG_GAME_ADDRESS);
        tvm.rawReserve(SERVICE_FEE, 4);

        if (remainingTiles == 0) {
            status = STATUS_GAME_COMPLETED;
            IGameHost(gameHost).onGameCompleted{value: DEPLOY_VALUE}(getInfo());
        }
        emit OperationCompleted("onAcceptTokensTransfer", ownerAddress, status, now, tilesQty);

        tvm.log(format("Before sending: {}", ownerAddress));

        ownerAddress.transfer({value: 0, flag: 128});
    }

    function packTiles(ColorTile[] tiles) external pure returns (TvmCell){
        return abi.encode(tiles);
    }

    function completeGame() external view internalMsg {
        require(msg.sender == gameHost, INVALID_GAME_HOST);
        require(status == STATUS_GAME_ACTIVE, WRONG_GAME_STATUS);
        calculateRewards();
    }

    function assignReward(address playerAddress) override internal {
        PlayerInfo player = getPlayer(playerAddress);
        player.nft = true;
        players[playerAddress] = player;
        tvm.log(format("NFT for {}", playerAddress));
        IGameHost(gameHost).onWinnerSet(getInfo(), playerAddress);
        emit OperationCompleted("assignWinner", playerAddress, status, now, gameId);
    }

    function claimReward() external {
        require(status == STATUS_GAME_COMPLETED, WRONG_GAME_STATUS);
        if (players.exists(msg.sender)) {
            PlayerInfo player = players[msg.sender];
            if (!player.isReceived) {
                TvmCell payload;
                ITokenWallet(gameWallet).transfer{value: DEPLOY_VALUE}(
                    player.reward,
                    msg.sender,
                    0,
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

    function deployFarmingWallet() external view {
        require(status == STATUS_GAME_ACTIVE, WRONG_GAME_STATUS);
        require(now >= gameStartTime, GAME_NOT_STARTED);
        tvm.rawReserve(0, 4);
        TvmCell initData = tvm.buildStateInit({
            contr: FarmingWallet,
            varInit: {
                game: address(this),
                owner: msg.sender,
                tokenRootAddress: tokenRootAddress
            },
            pubkey: 0,
            code: farmingCode
        });

        new FarmingWallet {
            stateInit: initData,
            value: 0,
            flag: 128
        }();
    }

    function askFarmingSpeed(address walletOwner) external view {
        require(msg.sender == getFarmingAddress(walletOwner), WALLET_DOES_NOT_MATCH_OWNER);
        IFarmingWallet(msg.sender).setFarmingSpeed{value: 0, flag: 64}(farmingSpeed);
    }

//
// Game modifiers
//
    /*
        OP_SET_BLOCK_COLOR Creates a trap which gets the tiles of the player who puts next
    */
    function setBlockColor(uint8[] newBlockColors) internal {
        require(newBlockColors.length == maxColors, WRONG_TILE_COLOR);
        tvm.rawReserve(0, 4);
        blockColors = newBlockColors;
        msg.sender.transfer({value: 0, flag: 128});
    }

    /*
        OP_CHANGE_FARM_SPEED Increases or decreases farming speed
    */
    function setFarmingSpeed(address ownerAddress, uint128 newSpeed) internal view {
        require(newSpeed > 0, FARMING_SPEED_MORE_THAN_ZERO);
        tvm.rawReserve(0, 4);
        IFarmingWallet(getFarmingAddress(ownerAddress)).setFarmingSpeed{value: 0, flag: 128}(newSpeed);
    }

    /*
        Minuses the number of captured tiles
    */
    function setMinusPlayerCaptured(address ownerAddress, uint16 minusCaptured) internal {
        tvm.rawReserve(0, 4);
        PlayerInfo player = getPlayer(ownerAddress);
        if (player.captured > minusCaptured) {
            player.captured -= minusCaptured;
        } else {
            player.captured = 0;
        }
        players[ownerAddress] = player;
        msg.sender.transfer({value: 0, flag: 128});
    }

    /*
        Pluses the number of captured tiles
    */
    function setPlusPlayerCaptured(address ownerAddress, uint16 plusCaptured) internal {
        tvm.rawReserve(0, 4);
        PlayerInfo player = getPlayer(ownerAddress);
        player.captured += plusCaptured;
        players[ownerAddress] = player;
        msg.sender.transfer({value: 0, flag: 128});
    }

    /*
    Updates player colors
    */
    function setMinusPlayerColors(address ownerAddress, uint8 colorNum, uint16 minusValue) internal {
        require(colorNum < maxColors, WRONG_TILE_COLOR);
        tvm.rawReserve(0, 4);
        uint16[] pColors = playerColors[ownerAddress];
        if (pColors[colorNum] > minusValue) {
            pColors[colorNum] -= minusValue;
        } else {
            pColors[colorNum] = 0;
        }
        playerColors[ownerAddress] = pColors;
        msg.sender.transfer({value: 0, flag: 128});
    }

    function runNftAction(TvmCell opData) external view {
        tvm.rawReserve(0, 4);
        IOracle(oracleAddress).verifyNft{callback: onVerifyNft, flag: 128}(msg.sender, opData);
    }

    function prepareCallbackData(address _ownerAddress, uint128 _newSpeed) external pure returns (TvmCell) {
        TvmBuilder builder;
        builder.store(OP_CHANGE_FARM_SPEED);
        builder.store(_ownerAddress);
        builder.store(_newSpeed);
        return builder.toCell();
    }

    function onVerifyNft(bool isNftVerified, TvmCell callbackData) public {
        //TODO: Specify the Oracle's address requirement
        if (!isNftVerified)
            return;
        TvmSlice dataSlice = callbackData.toSlice();
        uint8 opCode = dataSlice.decode(uint8);

        if (opCode == OP_SET_BLOCK_COLOR) {
            uint8[] bColors = dataSlice.decode(uint8[]);
            setBlockColor(bColors);
        } else if (opCode == OP_CHANGE_FARM_SPEED) {
            (address _ownerAddress, uint128 _newSpeed) = dataSlice.decode(address, uint128);
            setFarmingSpeed(_ownerAddress, _newSpeed);
        }
    }


//
//  DRAIN functions
//

    /*
        @notice A game drains itself on completion
    */
    function drain() override internal view {
        tvm.rawReserve(MIN_BALANCE, 0);
        gameHost.transfer({ value: 0, flag: 128 });
    }

    /*
        @notice Force a game to drain itself
    */
    function drainByHost() onlyHost external view {
        tvm.rawReserve(MIN_BALANCE, 0);
        gameHost.transfer({ value: 0, flag: 128 });
    }

    function drainTokens(uint128 value) onlyHost external view {
        TvmCell payload;
        ITokenWallet(gameWallet).transfer{value: DEPLOY_VALUE}(
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

    /*
        @notice Derive farming wallet contract address from owner credentials
        @param owner_address_ Address of a wallet which owns the token wallet
    */
    function getFarmingAddress(address walletOwner) public view returns (address) {
        TvmCell stateInit = tvm.buildStateInit({
            contr: FarmingWallet,
            varInit: {
                game: address(this),
                owner: walletOwner,
                tokenRootAddress: tokenRootAddress
            },
            pubkey: 0,
            code: farmingCode
        });

        return address(tvm.hash(stateInit));
    }

    function getPlayer(address ownerAddress) private view returns (PlayerInfo player) {
        if (players.exists(ownerAddress)) {
            player = players[ownerAddress];
        } else {
            player = PlayerInfo(getWalletAddress(ownerAddress), 0, 0, 0, 0, false, false);
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

        rnd.shuffle();
        uint8 blockColorChance = rnd.next(100);
        bool mustBlockColor = false;

        if (blockColorChance <= blockColorsProbability){
            mustBlockColor = true;
        }

        for (ColorTile tile: tiles) {
            if ((template[tile.f][tile.y][tile.x] == tile.color)
            && (fieldTemp[tile.f][tile.y][tile.x] == 0)
            && (pColors[tile.color - 1] > 0))
            {
                if (mustBlockColor && blockColors[tile.color - 1] == 1) {
                    pColors[tile.color - 1] -= 1;
                    continue;
                }
                fieldTemp[tile.f][tile.y][tile.x] = tile.color;
                pColors[tile.color - 1] -= 1;
                remainingTilesTemp -= 1;
            }
            else {
                isError = true;
                break;
            }
        }
        if (!isError) {
            blockColors = new uint8[](maxColors);
            uint16 tileNum = uint16(tiles.length);
            player.lastPutTime = now;
            player.captured += tileNum;
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
