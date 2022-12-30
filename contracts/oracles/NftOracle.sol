pragma ton-solidity >= 0.58.1;
import "OracleModifiersAndStructs.sol";

contract FakeNft {
    uint256 static _id;
}

abstract contract NftOracle is OracleModifiersAndStructs {
    TvmCell public nftCode;
    address public collection;

    function setNftCode(TvmCell newCode) external onlyOwner {
        tvm.accept();
        nftCode = newCode;
    }

    function setCollection(address _collection) external onlyOwner {
        tvm.accept();
        collection = _collection;
    }

    function _buildNftCode() internal virtual view returns (TvmCell) {
        TvmBuilder salt;
        salt.store(collection);
        return tvm.setCodeSalt(nftCode, salt.toCell());
    }

    function verifyNftSender(uint256 id, TvmCell callbackData) external view responsible returns (address, TvmCell) {
        TvmCell data = tvm.buildDataInit({
            contr: FakeNft,
            varInit: {_id: id}
        });
        TvmCell saltCode= _buildNftCode();
        uint codeHash = tvm.hash(saltCode);
        uint dataHash = tvm.hash(data);
        uint16 codeDepth = saltCode.depth();
        uint16 dataDepth = data.depth();
        uint256 hash = tvm.stateInitHash(codeHash, dataHash, codeDepth, dataDepth);
        return (address.makeAddrStd(address(this).wid, hash), callbackData);
    }
}