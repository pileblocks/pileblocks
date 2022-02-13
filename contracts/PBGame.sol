pragma ton-solidity >= 0.47.0;

import "./interfaces/ITokenRoot.sol";
import "./interfaces/ITokenWallet.sol";
import "./interfaces/IGameHost.sol";
import "./interfaces/IPBWallet.sol";

import "./TokenWallet.sol";
import "./PBConstants.sol";
import "./RewardCalculatorShouldering.sol";

contract PBGame is PBConstants, RewardCalculatorShouldering {

    // PILE token info
    TvmCell static walletCode;
    address static tokenRootAddress;

    // Game params
    uint64 static created;
    address static imageOwner;

    address gameWallet;
    uint32 remainingTiles;
    uint32 gameId;
    address gameHost;
    uint8 status;

    // Game render params
    uint8 vertFragments;
    uint8 horizFragments;
    uint8 maxColors;
    uint24[] renderSettings;
    uint128 tokensPerPut;

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

    constructor (uint24[] _renderSettings) public {

        optional(TvmCell) optSalt = tvm.codeSalt(tvm.code());
        require(optSalt.hasValue(), FAILED_FETCH_GAME_ID);
        (gameId, gameHost) = optSalt
            .get()
            .toSlice()
            .decode(uint32, address);

        require(msg.sender == gameHost, INVALID_GAME_HOST);

        //renderSettings [VERT_FRAGMENTS, HORIZ_FRAGMENTS, TOKENS_PER_PUT, MAX_COLORS, 0xfefefe, 0xaab0bc, 0x60697b, 0x2f353a, 0x1e2228]
        renderSettings = _renderSettings;
        vertFragments = uint8(renderSettings[0]);
        horizFragments = uint8(renderSettings[1]);
        tokensPerPut = uint128(renderSettings[2]) * uint128(1e9);
        maxColors = uint8(renderSettings[3]);

        status = STATUS_GAME_DRAFT;
        uint32 numFragments = vertFragments * horizFragments;
        for (uint8 n=0; n < numFragments; n++) {
            uint8[][] fieldPiece;
            for (uint8 i=0; i < ROW_COUNT; i++) {
                fieldPiece.push(new uint8[](COL_COUNT));
            }
            field[n] = fieldPiece;
        }

        gameWallet = getWalletAddress(address(this));
        tvm.log(format("Game wallet: {}", gameWallet));
        remainingTiles = uint32(ROW_COUNT) * uint32(COL_COUNT) * uint32(numFragments);

        ITokenRoot(tokenRootAddress).deployWallet{value: 0, flag: 128, callback: PBGame.onDeploy}(
            address(this),
            0.3 ton
        );
    }

    function onDeploy(address gWallet) external {
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

        uint16[] pColors = playerColors[ownerAddress];
        if (pColors.empty()) {
            pColors = new uint16[](maxColors);
        }
        uint16[] coloredTiles = getColoredTiles(tilesNum);

        for (uint16 i=0; i < maxColors; i++) {
             pColors[i] = math.min(coloredTiles[i] + pColors[i], 1024);
        }
        playerColors[ownerAddress] = pColors;
    }

    /*
        @notice An owner calls the wallet's putTiles method, and the wallet calls back onPutTiles of a game
        with the data necessary to put the tiles.
        @param ownerAddress - address of an owner of a token wallet
        @param tiles - the array of tiles to put
        @param tokensNum - the allocated amount of tokens a game can receive
        @param balance - the balance of the sending token wallet
    */
    function onPutTiles(address ownerAddress, ColorTile[] tiles, uint128 tokensNum) external {
        require(status == STATUS_GAME_ACTIVE, WRONG_GAME_STATUS);
        require(msg.sender == getWalletAddress(ownerAddress), WALLET_DOES_NOT_MATCH_OWNER);
        require(msg.value > MIN_PUT_AMOUNT, NOT_ENOUGH_TOKENS_TO_PUT_TILE);
        require(tokensNum == tokensPerPut, INVALID_TOKENS_PER_PUT);
        require(tiles.length <= MAX_PUT_PER_TURN, MAX_TILES_EXCEEDED);
        // Reserve a fee per put
        tvm.rawReserve(address(this).balance - msg.value + SERVICE_FEE, 2);
        PlayerInfo player = getPlayer(ownerAddress);
        bool isError = false;

        isError = addTilesToField(tiles, ownerAddress);

        if (remainingTiles == 0) {
            status = STATUS_GAME_COMPLETED;
            IGameHost(gameHost).onGameCompleted{value: 0.3 ton}(getInfo());
        }
    }

    function completeGame(uint128 totalReward) external internalMsg {
        require(msg.sender == gameHost, INVALID_GAME_HOST);
        //TODO: Implement money sharing with players
        //calculateRewards(totalReward);
    }

//
//        Service functions
//

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
            player = PlayerInfo(msg.sender, 0, false, false, 0);
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
        uint32 remainingTilesTemp;

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
                    status
        );
    }

    function addFakePlayer(address playerAddress, address playerWallet) external onlyOwner {
        //TODO: Remove this in prod!
        tvm.accept();
        uint16[] colTiles = [uint16(1000),uint16(1000),uint16(1000),uint16(1000),uint16(1000)];
        playerColors[playerAddress] = colTiles;
        players[playerAddress] = PlayerInfo(playerWallet, 0, false, false, 0);
    }

    function saveImageFragmentTest(uint8 fragmentNum, uint8[][] tiles) external onlyOwner {
        //TODO: Remove this in prod!
        require(status == STATUS_GAME_DRAFT, WRONG_GAME_STATUS);
        require(fragmentNum < uint8(vertFragments * horizFragments), WRONG_FRAGMENT_COUNT);
        require(tiles.length == ROW_COUNT, WRONG_NUM_ROWS);
        tvm.accept();
        for (uint8 i=0; i < ROW_COUNT; i++) {
            require(tiles[i].length == COL_COUNT, WRONG_NUM_COLS);
            for (uint8 j=0; j < COL_COUNT; j++) {
                require(tiles[i][j] > 0 && tiles[i][j] <= maxColors, WRONG_TILE_COLOR);
            }
        }
        template[fragmentNum] = tiles;
    }

    function sendReward(address playerAddress, uint128 rewardValue) override internal {
        tvm.log(format("Calculate reward for {} is {:t}", playerAddress, rewardValue));


    }
}
