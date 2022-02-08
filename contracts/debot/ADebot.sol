pragma ton-solidity >= 0.43.0;
pragma AbiHeader expire;
pragma AbiHeader time;
pragma AbiHeader pubkey;

import "./imports/Debot.sol";
import "./imports/Terminal.sol";
import "./imports/UserInfo.sol";
import "../interfaces/IPBGame.sol";

interface SafeAccount {
   function sendTransaction(address dest, uint128 value, bool bounce, uint8 flags, TvmCell payload) external;
}

interface IPBWallet {
    function claimTiles(address gameAddress) external;
    function putTiles(address gameAddress, uint128 tokensNum, ColorTile[] tiles) external;
}

interface IGameHost {
    function deployGame(address imageOwner, uint24[] _renderSettings) external returns (address);
}

contract ADebot is Debot {
    bytes mIcon;

    function getRequiredInterfaces() public view override returns (uint256[] interfaces) {
        return [ Terminal.ID, UserInfo.ID ];
    }

    function setIcon(bytes icon) public {
        require(msg.pubkey() == tvm.pubkey(), 100);
        tvm.accept();
        mIcon = icon;
    }

    function getDebotInfo() public functionID(0xDEB) override view returns(
        string name, string version, string publisher, string key, string author,
        address support, string hello, string language, string dabi, bytes icon
    ) {
        name = "Simple Debot";
        version = "1.0";
        publisher = "Norton";
        key = "asdasd";
        author = "Norton";
        support = address.makeAddrStd(0, 0x66e01d6df5a8d7677d9ab2daf7f258f1e2a7fe73da5320300395f99e01dc3b5f);
        language = "en";
        dabi = m_debotAbi.get();
        icon = mIcon;
    }

    function start() public override {
        address OWNER_ADDRESS = address.makeAddrStd(0, 0xe6fa82115b834d6a74810c6774aa32408abbcc72dfb20d4ca61750097f22b969);
        address GAME_ADDRESS = address.makeAddrStd(0, 0x8238fb0335a38ee0925462600720fa738101ea6fd32579d04f9aa4e62bb985f3);
        address WALLET_ADDRESS = address.makeAddrStd(0, 0x448dfc48b8bac5e7543911b460fb69b5349582b145b2396485e7c877c8a65bf2);
        //address GAME_HOST_ADDRESS = address.makeAddrStd(0, 0xa08f5459fb6c2d84b3f0ab7273537c7a217d7c3a4b6448a9b81b09f33c261c07);

        uint32 id = 1;



        ColorTile[] tiles = [ColorTile(0,0,6,1),ColorTile(0,1,6,1),ColorTile(0,2,6,1),ColorTile(0,3,6,1),ColorTile(0,4,6,1),ColorTile(0,5,6,1),ColorTile(0,6,6,1),ColorTile(0,7,6,1),ColorTile(0,8,6,1),ColorTile(0,9,6,1),ColorTile(0,10,6,1),ColorTile(0,11,6,1),ColorTile(0,12,6,1),ColorTile(0,13,6,1),ColorTile(0,14,6,1),ColorTile(0,15,6,1),ColorTile(0,0,7,1),ColorTile(0,1,7,1),ColorTile(0,2,7,1),ColorTile(0,3,7,1),ColorTile(0,4,7,1),ColorTile(0,5,7,1),ColorTile(0,6,7,1),ColorTile(0,7,7,1),ColorTile(0,8,7,1),ColorTile(0,9,7,1),ColorTile(0,10,7,1),ColorTile(0,11,7,1),ColorTile(0,12,7,1),ColorTile(0,13,7,1),ColorTile(0,14,7,1),ColorTile(0,15,7,1)];
        //ColorTile[] tiles = [ColorTile(11,1,0,1),ColorTile(11,1,1,1)];
        TvmCell body = tvm.encodeBody(IPBWallet.putTiles, GAME_ADDRESS, uint128(30000000000), tiles);
        //TvmCell body = tvm.encodeBody(IPBWallet.claimTiles, GAME_ADDRESS);
        //TvmCell body = tvm.encodeBody(IGameHost.deployGame, OWNER_ADDRESS, [2,1,5,16711422,11186364,6318459,3093818,1974824]);

        optional(uint256) pubkey = 0;
        SafeAccount(OWNER_ADDRESS).sendTransaction{
            abiVer: 2,
            extMsg: true,
            sign: true,
            pubkey: pubkey,
            time: uint64(now),
            expire: 0,
            callbackId: 0,
            onErrorId: 0
        }
        (WALLET_ADDRESS, 3000000000, false, 3, body);
    }
}
