pragma ton-solidity = 0.58.1;

pragma AbiHeader expire;
pragma AbiHeader time;
pragma AbiHeader pubkey;


import '@itgold/everscale-tip/contracts/TIP4_1/TIP4_1Nft.sol';
import '@itgold/everscale-tip/contracts/TIP4_2/TIP4_2Nft.sol';
import '@itgold/everscale-tip/contracts/TIP4_3/TIP4_3Nft.sol';
import './ITokenBurned.sol';
import "../PBConstants.sol";
import "../interfaces/IPBGame.sol";

contract Nft is TIP4_1Nft, TIP4_2Nft, TIP4_3Nft, PBConstants {

    uint8 paramType;
    uint128 paramIndex;
    uint128 paramValue;
    uint8[] paramArray;
    uint8 applyNumTimes;

    constructor(
        address owner,
        address gameManager,
        address sendGasTo,
        uint128 remainOnNft,
        string json,
        uint128 indexDeployValue,
        uint128 indexDestroyValue,
        TvmCell codeIndex
    ) TIP4_1Nft(
        owner,
        sendGasTo,
        remainOnNft
    ) TIP4_2Nft (
        json
    ) TIP4_3Nft (
        indexDeployValue,
        indexDestroyValue,
        codeIndex
    )
    public {
        tvm.accept();
        paramArray = new uint8[](5);
    }

    /// See interfaces/ITIP4_2JSON_Metadata.sol
    function getJson() external view override responsible returns (string json) {
        return {value: 0, flag: 64, bounce: false} _json;
    }

    function setParams(uint8 _paramType,uint128 _paramIndex, uint128 _paramValue, uint8[] _paramArray, uint8 _applyNumTimes) external {
        require(msg.sender == _collection, sender_is_not_collection);
        tvm.rawReserve(0, 4);
        paramType = _paramType;
        paramIndex = _paramIndex;
        paramValue = _paramValue;
        paramArray = _paramArray;
        applyNumTimes = _applyNumTimes;
        msg.sender.transfer({value: 0, flag: 128});
    }

    function setJson (string json) external {
        require(msg.sender == _collection, sender_is_not_collection);
        tvm.rawReserve(0, 4);
        _json = json;
        msg.sender.transfer({value: 0, flag: 128});
    }

    function getParams() external view returns(uint8 _paramType,uint128 _paramIndex, uint128 _paramValue, uint8[] _paramArray){
        return (paramType, paramIndex, paramValue, paramArray);
    }

    function getOpData(address targetPlayerAddress) external view returns (TvmCell) {
        TvmBuilder opData;
        opData.store(paramType);
        opData.store(_owner);

        if (paramType == OP_CHANGE_FARM_SPEED) {
            opData.store(targetPlayerAddress);
            opData.store(paramValue);
        }
        else if (paramType == OP_SET_BLOCK_COLOR) {
            opData.store(paramArray);
        }
        else if (paramType == OP_MINUS_CAPTURED_TILES) {
            opData.store(targetPlayerAddress);
            opData.store(paramValue);
        }
        else if (paramType == OP_PLUS_CAPTURED_TILES) {
            opData.store(targetPlayerAddress);
            opData.store(paramValue);
        }
        else if (paramType == OP_MINUS_COLORS) {
            opData.store(targetPlayerAddress);
            opData.store(paramIndex);
            opData.store(paramValue);
        }
        return opData.toCell();
    }

    function _beforeTransfer(
        address to, 
        address sendGasTo, 
        mapping(address => CallbackParams) callbacks
    ) internal virtual override(TIP4_1Nft, TIP4_3Nft) {
        TIP4_3Nft._beforeTransfer(to, sendGasTo, callbacks);
    }   

    function _afterTransfer(
        address to, 
        address sendGasTo, 
        mapping(address => CallbackParams) callbacks
    ) internal virtual override(TIP4_1Nft, TIP4_3Nft) {
        TIP4_3Nft._afterTransfer(to, sendGasTo, callbacks);
    }   

    function _beforeChangeOwner(
        address oldOwner, 
        address newOwner,
        address sendGasTo, 
        mapping(address => CallbackParams) callbacks
    ) internal virtual override(TIP4_1Nft, TIP4_3Nft) {
        TIP4_3Nft._beforeChangeOwner(oldOwner, newOwner, sendGasTo, callbacks);
    }   

    function _afterChangeOwner(
        address oldOwner, 
        address newOwner,
        address sendGasTo, 
        mapping(address => CallbackParams) callbacks
    ) internal virtual override(TIP4_1Nft, TIP4_3Nft) {
        TIP4_3Nft._afterChangeOwner(oldOwner, newOwner, sendGasTo, callbacks);
    }

    function burn(address dest) external virtual onlyManager {
        tvm.accept();
        ITokenBurned(_collection).onTokenBurned(_id, _owner, _manager);
        selfdestruct(dest);
    }

    function applyNft(address _gameAddress, TvmCell _opData) external onlyManager {
        require(msg.value >= 10 * MIN_MESSAGE, WRONG_AMOUNT);
        tvm.rawReserve(0, 4);
        applyNumTimes -= 1;
        IPBGame(_gameAddress).runNftAction{value: msg.value - 2 * MIN_MESSAGE}(_id, _opData);
        if (applyNumTimes == 0) {
            ITokenBurned(_collection).onTokenBurned{value: MIN_MESSAGE}(_id, _owner, _manager);
            selfdestruct(_manager);
        }
    }

}