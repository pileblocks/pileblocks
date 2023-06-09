pragma ton-solidity = 0.58.1;

pragma AbiHeader expire;
pragma AbiHeader time;
pragma AbiHeader pubkey;

import '../interfaces/ICollection.sol';
import '../PBConstants.sol';

struct CallbackParams {
    uint128 value;      // ever value will send to address
    TvmCell payload;    // custom payload will proxying to address
}

interface INft {
    function transfer(address to, address sendGasTo,  mapping(address => CallbackParams) callbacks) external;
}

contract NftCreator is PBConstants {
    uint64 static _nonce;
    address col = address(0);
    uint128 constant MAX_CALL_VALUE = 1 ever;
    uint128 constant MIN_CALL_VALUE = 0.4 ever;

    constructor(address _col) public {
        tvm.accept();
        col = _col;
    }

    function mintNft(string json) external view onlyOwner {
        tvm.accept();
        ICollection(col).mintNft{value: 1 ever}(json);
    }

    function setNftParams(address nftAddress, uint8 _paramType, uint128 _paramIndex, uint128 _paramValue, uint8[] _paramArray, uint8 _applyNumTimes) external view onlyOwner {
        tvm.accept();
        ICollection(col).setNftParams{value: MAX_CALL_VALUE}(nftAddress, _paramType, _paramIndex, _paramValue, _paramArray, _applyNumTimes);
    }

    function transferNft(address nftAddress, address to) external pure onlyOwner {
        tvm.accept();
        INft(nftAddress).transfer{value: MAX_CALL_VALUE}(to, to, emptyMap);
    }

    function setNftJson(address nftAddress, string json) external view onlyOwner {
        tvm.accept();
        ICollection(col).setJson{value: MIN_CALL_VALUE}(nftAddress, json);
    }

}
