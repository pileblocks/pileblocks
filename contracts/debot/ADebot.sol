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


contract ADebot is Debot {
    bytes mIcon;

    address constant WALLET=address.makeAddrStd(0, 0xe6fa82115b834d6a74810c6774aa32408abbcc72dfb20d4ca61750097f22b969);

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
        address GAME_ADDRESS = address.makeAddrStd(0, 0xa9530374f82ebc8ddb09fb52ed87cb6d448b8d3e1bc042482bbacffd9f38bfcb);
        address WALLET_ADDRESS = address.makeAddrStd(0, 0x14be872d82276b2f6d929e4a88e356482266a61ad827a5daed27689e2437bb61);

        uint32 id = 1;
        TvmCell body = tvm.encodeBody(IPBWallet.putTiles, GAME_ADDRESS, uint128(50000000000), [ColorTile(1,2,3)]);

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
        (WALLET_ADDRESS, 1500000000, false, 3, body);
    }
}
