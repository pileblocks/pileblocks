pragma ton-solidity >= 0.57.0;

pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./abstract/TokenWalletBurnableByRootBase.sol";
import "./abstract/TokenWalletBurnableBase.sol";
import "./abstract/TokenWalletDestroyableBase.sol";

import "./libraries/TokenErrors.sol";
import "./libraries/TokenGas.sol";
import "./libraries/TokenMsgFlag.sol";
import "./interfaces/IVersioned.sol";
import "./interfaces/IPBGame.sol";
import "./interfaces/ITokenWallet.sol";


/*
    @title Fungible token wallet contract
*/
contract TokenWallet is
    TokenWalletBurnableBase,
    TokenWalletBurnableByRootBase,
    TokenWalletDestroyableBase
{

    /*
        @notice Creates new token wallet
        @dev All the parameters are specified as initial data
    */
    constructor() public {
        require(tvm.pubkey() == 0, TokenErrors.NON_ZERO_PUBLIC_KEY);
        require(owner_.value != 0, TokenErrors.WRONG_WALLET_OWNER);
    }

    function supportsInterface(bytes4 interfaceID) override external view responsible returns (bool) {
        return { value: 0, flag: TokenMsgFlag.REMAINING_GAS, bounce: false } (
            interfaceID == bytes4(0x3204ec29) ||    // SID
            interfaceID == bytes4(0x4f479fa3) ||    // TIP3TokenWallet
            interfaceID == bytes4(0x2a4ac43e) ||    // TokenWallet
            interfaceID == bytes4(0x562548ad) ||    // BurnableTokenWallet
            interfaceID == bytes4(0x0c2ff20d) ||    // BurnableByRootTokenWallet
            interfaceID == bytes4(0x0f0258aa)       // Destroyable
        );
    }

    function _targetBalance() override internal pure returns (uint128) {
        return TokenGas.TARGET_WALLET_BALANCE;
    }

    function _buildWalletInitData(address walletOwner) override internal view returns (TvmCell) {
        return tvm.buildStateInit({
            contr: TokenWallet,
            varInit: {
                root_: root_,
                owner_: walletOwner
            },
            pubkey: 0,
            code: tvm.code()
        });
    }

    function _deployWallet(TvmCell initData, uint128 deployWalletValue, address)
        override
        internal
        view
        returns (address)
    {
        address wallet = new TokenWallet {
            stateInit: initData,
            value: deployWalletValue,
            wid: address(this).wid,
            flag: TokenMsgFlag.SENDER_PAYS_FEES
        }();
        return wallet;
    }

    /*
        @dev The owner wallet sends the request to claim tiles, and the wallet sends them to a game
    */
    function claimTiles(address gameAddress) external onlyOwner {
        uint16 existingTiles = showTiles();
        tilesNum = 0;
        tilesChangeTime = now;
        IPBGame(gameAddress).onClaimTiles{value: 0, flag: 64}(owner_, existingTiles);
    }
    /*
        @dev The owner wallet sends the request to put tiles, and the wallet sends the data to a game
    */
    function putTiles(address gameHost, address gameAddress, uint128 tokensNum, ColorTile[] tiles) external onlyOwner {
        require(balance_ >= tokensNum, TokenErrors.NOT_ENOUGH_BALANCE);
        TvmCell payload;
        ITokenWallet(address(this)).transfer{value: 0.3 ton}(
            tokensNum,
            gameHost,
            0,
            address(this),
            false,
            payload
        );
        IPBGame(gameAddress).onPutTiles{value: 0, flag: 64}(owner_, tiles, tokensNum);
    }

}
