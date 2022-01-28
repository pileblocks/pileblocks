pragma ton-solidity >= 0.47.0;

import "./PBWallet.sol";
import "./PBConstants.sol";
import "./interfaces/IRootTokenContract.sol";
import "./interfaces/ITONTokenWallet.sol";

interface IPBWallet {
    function claimTiles() external responsible returns (address, uint16);
}

contract PBGame is PBConstants {
    // Game field
    uint8[][] public field;
    uint8[][] public template;
    address public gameWallet;

    // PILE token info
    TvmCell static walletCode;
    address static tokenRootAddress;

    // Game params
    uint128 static gameId;
    address public imageOwner;
    // TODO: Receive from GameHost on create
    uint128 constant TOKENS_PER_PUT = 50_000_000_000;
    uint128 constant REWARD_AMOUNT = 4049_000_000_000;
    uint32 remainingTiles;

    struct PlayerInfo {
        address walletAddress;
        uint16[] tiles; // tiles[0] = 1 color, tiles[1] = 2 color etc.
        uint16 captured;
        bool isLast;
        bool isPrelast;
        uint32 lastPutTime;
    }

    mapping(address => PlayerInfo) public players;

    constructor (uint8[][] tmp) public {
		require(tvm.pubkey() != 0, PUBLIC_KEY_MISSING);
		require(tvm.pubkey() == msg.pubkey(), WRONG_PUBLIC_KEY);
        tvm.accept();

        require(tmp.length == ROW_COUNT, WRONG_NUM_ROWS);
        for (uint8 i=0; i < ROW_COUNT; i++) {
            require(tmp[i].length == COL_COUNT, WRONG_NUM_COLS);
            for (uint8 j=0; j < COL_COUNT; j++) {
                require(tmp[i][j] <= MAX_COLORS && tmp[i][j] > 0, WRONG_TILE_COLOR);
            }
        }

        template = tmp;

        for (uint8 i=0; i < ROW_COUNT; i++) {
            field.push(new uint8[](COL_COUNT));
        }

        IRootTokenContract(tokenRootAddress).deployEmptyWallet{value: 0, flag: 128}(
            0.3 ton,
            0,
            address(this),
            address(this)
        );

        gameWallet = getWalletAddress(address(this));
        remainingTiles = ROW_COUNT * COL_COUNT;
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
        for (ColorTile tile: tiles) {
            if ((template[tile.x][tile.y] == tile.color)
            && (field[tile.x][tile.y] == 0)
            && (player.tiles[tile.color - 1] > 0))
            {
                field[tile.x][tile.y] = tile.color;
                player.tiles[tile.color - 1] -= 1;
                player.captured += 1;
                player.lastPutTime = now;
                remainingTiles -= 1;
                if (remainingTiles == 1) {
                    player.isPrelast = true;
                }
                if (remainingTiles == 0) {
                    player.isLast = true;
                }
            }
            else {
                isError = true;
                break;
            }
        }
        return (isError, player);
    }

}
