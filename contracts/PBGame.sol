pragma ton-solidity >= 0.47.0;

import "./PBWallet.sol";
import "./PBConstants.sol";
import "./interfaces/IRootTokenContract.sol";
import "./interfaces/ITONTokenWallet.sol";

interface IPBWallet {
    function claimTiles() external responsible returns (address, uint16);
}

interface IGameHost {
    function onGameCompleted(address tokenRootAddress, uint64 created, address imageOwner, uint64 gameId) external;
}

contract PBGame is PBConstants {
    // Game field
    uint8[][] public field;
    uint8[][] public template;

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

    // TODO: Receive from GameHost on create
    uint128 constant TOKENS_PER_PUT = 50_000_000_000;

    function getInfo() external externalMsg view returns (GameInfo) {
        return GameInfo(
                    tokenRootAddress,
                    created,
                    imageOwner,
                    gameId,
                    gameWallet,
                    remainingTiles,
                    gameHost
               );
    }

    mapping(address => PlayerInfo) public players;
    mapping(uint8 => uint8[][]) public newfield;

    constructor (address _gameHost, uint8[][] tmp) public {
        require(msg.sender == _gameHost, INVALID_GAME_HOST);
        optional(TvmCell) optSalt = tvm.codeSalt(tvm.code());
        require(optSalt.hasValue(), FAILED_FETCH_GAME_ID);
        gameId = optSalt
            .get()
            .toSlice()
            .decode(uint32);
        gameHost = _gameHost;

        //require(tmp.length == ROW_COUNT, WRONG_NUM_ROWS);
        //TODO: Change the way the data is filled-in
        //template = tmp;
        //Idea: create a mapping of 16x8 pieces
        tvm.setGasLimit(2_000_000_000);
        for (uint8 n=0; n < 16; n++) {
            uint8[][] fieldPiece;
            for (uint8 i=0; i < ROW_COUNT; i++) {
                fieldPiece.push(new uint8[](COL_COUNT));
            }
            newfield[n] = fieldPiece;
            tvm.log(format("n: {}", n));
        }

        gameWallet = getWalletAddress(address(this));
        tvm.log(format("Game wallet: {}", gameWallet));
        remainingTiles = ROW_COUNT * COL_COUNT;

        IRootTokenContract(tokenRootAddress).deployEmptyWallet{value: 0.5 ton, flag: 0}(
            0.3 ton,
            0,
            address(this),
            address(this)
        );
    }

    /*
        @notice A wallet owner sends this request to turn all their tiles into colored tiles.
        @dev If the PILE wallet does not exist, the EVERs will be bounced back to the game.
    */
    function claimColoredTiles() external internalMsg view {
        address walletAddress = getWalletAddress(msg.sender);
        IPBWallet(walletAddress).claimTiles{value: 0, flag: 64, bounce: true, callback: PBGame.onClaimTiles}();
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

        PlayerInfo player = getPlayer(ownerAddress);
        uint16[] coloredTiles = getColoredTiles(tilesNum);

        for (uint16 i=0; i < MAX_COLORS; i++) {
             player.tiles[i] = math.min(coloredTiles[i] + player.tiles[i], 1024);
        }
        player.lastPutTime = now;
        players[ownerAddress] = player;
    }

    /*
        @notice An owner calls the wallet's putTiles method, and the wallet calls back onPutTiles of a game
        with the data necessary to put the tiles.
        @param ownerAddress - address of an owner of a token wallet
        @param tiles - the array of tiles to put
        @param tokensNum - the allocated amount of tokens a game can receive
        @param balance - the balance of the sending token wallet
    */
    function onPutTiles(address ownerAddress, ColorTile[] tiles, uint128 tokensNum, uint128 balance) external {
        require(msg.sender == getWalletAddress(ownerAddress), WALLET_DOES_NOT_MATCH_OWNER);
        require(msg.value > MIN_PUT_AMOUNT, NOT_ENOUGH_TOKENS_TO_PUT_TILE);
        require(tokensNum == TOKENS_PER_PUT, INVALID_TOKENS_PER_PUT);
        require(balance >= TOKENS_PER_PUT, TOKEN_BALANCE_LOW);
        // Reserve a fee per put
        tvm.rawReserve(address(this).balance - msg.value + SERVICE_FEE, 2);
        //tvm.log(format("onPutTiles, tokensNum: {:t}", tokensNum));
        PlayerInfo player = getPlayer(ownerAddress);
        bool isError = false;

        (isError, player) = addTilesToField(tiles, player);
        if (!isError) {
            players[ownerAddress] = player;
        }
        if (remainingTiles == 0) {
        //TODO: Notify the GameHost about the game completion
        }
        TvmCell payload;
        ITONTokenWallet(gameWallet).transferFrom{value: 0, flag: 128}(
            msg.sender,
            gameWallet,
            tokensNum,
            0,
            ownerAddress,
            false,
            payload
        );

    }

//
//        Internal service functions
//

    /*
        @notice Derive token wallet contract address from owner credentials
        @param owner_address_ Address of a wallet which owns the token wallet
    */
    function getWalletAddress(address owner_address_) private inline view returns (address) {
        TvmCell stateInit = tvm.buildStateInit({
            contr: PBWallet,
            varInit: {
                root_address: tokenRootAddress,
                code: walletCode,
                wallet_public_key: 0,
                owner_address: owner_address_
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
            player = PlayerInfo(msg.sender, new uint16[](MAX_COLORS), 0, false, false, 0);
        }
    }

    /*
        @notice Calculates the number of tiles of each color to be claimed by a player in exchange for their tiles.
        @param tilesNum - the number of tiles a player wants to transform to colored tiles
    */
    function getColoredTiles(uint16 tilesNum) private pure returns(uint16[] colorArr) {

        uint16 share = (tilesNum * 8) / 10;
        uint16 rest = tilesNum - (share / MAX_COLORS) * MAX_COLORS;

        for (uint8 i=0; i < MAX_COLORS; i++) {
            colorArr.push(share / MAX_COLORS);
        }

        for (uint8 i=0; i < (MAX_COLORS - 1); i++) {
            uint16 rn = rnd.next(rest);
            rnd.shuffle();
            colorArr[i] += rn;
            rest -= rn;
        }
        colorArr[4] += rest;
    }

    function addTilesToField (ColorTile[] tiles, PlayerInfo player) private returns (bool, PlayerInfo) {
        bool isError = false;
        uint8[][] fieldTemp;
        uint32 remainingTilesTemp;

        fieldTemp = field;
        remainingTilesTemp = remainingTiles;

        for (ColorTile tile: tiles) {
            if ((template[tile.y][tile.x] == tile.color)
            && (field[tile.y][tile.x] == 0)
            && (player.tiles[tile.color - 1] > 0))
            {
                fieldTemp[tile.y][tile.x] = tile.color;
                player.tiles[tile.color - 1] -= 1;
                player.captured += 1;
                player.lastPutTime = now;
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
            field = fieldTemp;
            remainingTiles = remainingTilesTemp;
        }
        return (isError, player);
    }

    function addTilesToFieldTest(ColorTile[] tiles) public returns (bool, PlayerInfo) {
        tvm.accept();
        uint16[] colTiles = [uint16(10),uint16(10),uint16(10),uint16(10),uint16(10)];
        PlayerInfo player = PlayerInfo(address(0), colTiles, 0, false, false, 0);
        return addTilesToField (tiles, player);
    }

}
