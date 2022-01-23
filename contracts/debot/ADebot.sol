pragma ton-solidity >= 0.43.0;
pragma AbiHeader expire;
pragma AbiHeader time;
pragma AbiHeader pubkey;

import "./imports/Debot.sol";
import "./imports/Terminal.sol";
import "./imports/UserInfo.sol";

interface SafeAccount {
   function sendTransaction(address dest, uint128 value, bool bounce, uint8 flags, TvmCell payload) external;
}

interface IPBWallet {
    function claimTiles(address gameAddress) external;
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
        address GAME_ADDRESS = address.makeAddrStd(0, 0x352e6dfd27e80fca1e39a17251f86d30fb3e0624f6252b97bc307c4cdcac5361);
        address WALLET_ADDRESS = address.makeAddrStd(0, 0xf86b76ac1da6ae1295a90e12a8ab13cc1546b531639572a6d4f133e4d22ac610);

        uint32 id = 1;
        TvmCell body = tvm.encodeBody(IPBWallet.claimTiles, GAME_ADDRESS);

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
        (WALLET_ADDRESS, 1000000000, false, 3, body);
    }
}
