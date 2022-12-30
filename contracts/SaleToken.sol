pragma ton-solidity >= 0.57.0;

pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./interfaces/ITokenWallet.sol";
import "./interfaces/ITokenRoot.sol";
import "./interfaces/IAcceptTokensTransferCallback.sol";
import "./interfaces/IAcceptTokensMintCallback.sol";

contract SaleToken is IAcceptTokensTransferCallback, IAcceptTokensMintCallback {

    uint64 static _randomNonce;
    uint16 ERROR_NOT_AUTH = 403;
    uint16 WRONG_NOTIFICATION_SENDER = 410;
    uint128 MINIMUM_SEND_VALUE = 1_000_000_000;
    address public wallet;
    address rootAddress;
    uint128 public totalReady;
    uint128 public totalSold;
    uint128 public conversionRate;

    modifier onlyOwner() {
        require(msg.pubkey() != 0 && msg.pubkey() == tvm.pubkey(), ERROR_NOT_AUTH, "Not authorized");
        _;
    }

    constructor (address tokenRootAddress) public {
        rootAddress = tokenRootAddress;
        conversionRate = 5;
        tvm.accept();
        ITokenRoot(tokenRootAddress).deployWallet{value: 0, flag: 128, callback: SaleToken.onDeploy}(
            address(this),
            0.3 ton
        );
        totalSold = 0;
        totalReady = 0;
    }

    function onDeploy(address gWallet) external {
        require(msg.sender == rootAddress, ERROR_NOT_AUTH, "Not authorized");
        wallet = gWallet;
    }

    function setRate(uint128 newRate) onlyOwner external {
        tvm.accept();
        conversionRate = newRate;
    }

    function drain(address receiver) onlyOwner public pure {
        tvm.accept();
        receiver.transfer({ value: 0, flag: 128 });
    }

    function drainTokens(uint128 value, address receiver) onlyOwner public {
        tvm.accept();
        totalReady -= value;
        TvmCell payload;
        ITokenWallet(wallet).transfer{value: 0.5 ton}(
            value,
            receiver,
            0.3 ton,
            address(this),
            false,
            payload
            );
    }

    function onAcceptTokensTransfer(
        address ,
        uint128 amount,
        address ,
        address ,
        address ,
        TvmCell
    ) override external {
        require(msg.sender == wallet, WRONG_NOTIFICATION_SENDER);
        totalReady += amount;
    }

    function onAcceptTokensMint(
        address ,
        uint128 amount,
        address ,
        TvmCell
    ) override external {
        require(msg.sender == wallet, WRONG_NOTIFICATION_SENDER);
        totalReady += amount;
    }

    receive() external {
        uint128 tokensToSend = msg.value * conversionRate;
        if (msg.value < MINIMUM_SEND_VALUE || tokensToSend > totalReady) {
            msg.sender.transfer(0, false, 64);
            return;
        }
        TvmBuilder messageBody;
        TvmCell payload;
        ITokenWallet(wallet).transfer{value: 0.5 ton}(
            tokensToSend,
            msg.sender,
            0.3 ton,
            address(this),
            false,
            payload
            );
        totalReady -= tokensToSend;
        totalSold += tokensToSend;
        messageBody.store(uint32(0), format("Greetings from PileBlocks!\n\nYou've received {:t} PILE tokens.\n\n", tokensToSend));
        msg.sender.transfer(10000, false, 1, messageBody.toCell());
    }

}