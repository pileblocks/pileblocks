pragma ton-solidity >= 0.57.0;

pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./interfaces/ITokenRoot.sol";
import "./interfaces/ITransferableOwnership.sol";
import "./PBConstants.sol";

contract Genesis is PBConstants {

    uint64 static _randomNonce;

    modifier onlyOwner() {
        require(tvm.pubkey() == msg.pubkey(), WRONG_PUBLIC_KEY);
        _;
    }

    function mint(address tokenRoot, uint128 amount, address recipient) external onlyOwner {
        tvm.accept();
        TvmCell payload;
        ITokenRoot(tokenRoot).mint{value: 0.5 ton}(amount, recipient, 0.3 ton, address(this), false, payload);
    }

    function drain(address receiver) onlyOwner public pure {
        tvm.accept();
        receiver.transfer({ value: 0, flag: 128 });
    }

    function transferOwner(
        address tokenRoot,
        address newOwner
    ) onlyOwner external view
    {
        tvm.accept();
        ITransferableOwnership(tokenRoot).transferOwnership(
            newOwner,
            address(this),
            emptyMap
        );
    }

    function giveHomage() external pure internalMsg {
    }

}