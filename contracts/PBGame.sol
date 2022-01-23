pragma ton-solidity >= 0.47.0;

import "./PBWallet.sol";
import "./PBConstants.sol";

interface IPBWallet {
    function claimTiles() external responsible returns (address, uint16);
}

contract PBGame is PBConstants {
    // Game field
    uint8[][] public field;

    // PILE token info
    TvmCell static walletCode;
    address static tokenRootAddress;

    // Game params
    uint128 static gameId;
    address public imageOwner;

    struct PlayerInfo {
        address walletAddress;
        uint16 c1;
        uint16 c2;
        uint16 c3;
        uint16 c4;
        uint16 c5;
        uint16 captured;
        bool isLast;
        bool isPrelast;
        uint32 lastPutTime;
    }

    mapping(address => PlayerInfo) public players;

    constructor () public {
		require(tvm.pubkey() != 0, PUBLIC_KEY_MISSING);
		require(tvm.pubkey() == msg.pubkey(), WRONG_PUBLIC_KEY);
        tvm.accept();

        for (uint8 i=0; i < ROW_COUNT; i++) {
            field.push(new uint8[](COL_COUNT));
        }
    }

    /*
        @notice Derive token wallet contract address from owner credentials
        @param owner_address_ Token wallet owner address
    */
    function getWalletAddress(
        address owner_address_
    )
        private
        inline
        view
    returns (
        address
    ) {
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

    /*
        @notice A wallet owner sends this request to the game to
        turn all their tiles into colored tiles
    */

    function claimColoredTiles() external internalMsg view {
        tvm.log(format("Sender: {}", msg.sender));
        tvm.log(format("Value: {:t}", msg.value));

        address walletAddress = getWalletAddress(msg.sender);
        IPBWallet(walletAddress).claimTiles{value: 0, flag: 64, bounce: true, callback: PBGame.onClaimTiles}();
    }

    /*
        @notice An owner calls the wallet's claimTiles method, and the wallet calls back with the number of tiles,
        the game will record these tiles and assign colors
    */
    function onClaimTiles(address ownerAddress, uint16 tilesNum) external internalMsg {
        tvm.log(format("Callback received from wallet: {}", msg.sender));
        require(msg.sender == getWalletAddress(ownerAddress), WALLET_DOES_NOT_MATCH_OWNER);

        PlayerInfo player;

        if (players.exists(ownerAddress)) {
            player = players[ownerAddress];
        } else {
            player = PlayerInfo(msg.sender, 0, 0, 0, 0, 0, 0, false, false, 0);
        }

        uint16[5] coloredTiles = getColoredTiles(tilesNum);

        player.c1 += coloredTiles[0];
        player.c2 += coloredTiles[1];
        player.c3 += coloredTiles[2];
        player.c4 += coloredTiles[3];
        player.c5 += coloredTiles[4];
        player.lastPutTime = now;

        players[ownerAddress] = player;
    }

    function getColoredTiles(uint16 tilesNum) private pure returns(uint16[5] colorArr) {

        uint16 share = (tilesNum * 8) / 10;
        uint16 rest = tilesNum - (share / 5) * 5;

        for (uint8 i=0; i<5; i++) {
            colorArr.push(share / 5);
        }

        for (uint8 i=0; i<4; i++) {
            uint16 rn = rnd.next(rest);
            rnd.shuffle();
            colorArr[i] += rn;
            rest -= rn;
        }
        colorArr[4] += rest;
    }
}
