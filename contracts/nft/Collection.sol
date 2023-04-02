pragma ton-solidity = 0.58.1;

pragma AbiHeader expire;
pragma AbiHeader time;
pragma AbiHeader pubkey;

import '@itgold/everscale-tip/contracts/TIP4_2/TIP4_2Collection.sol';
import '@itgold/everscale-tip/contracts/TIP4_3/TIP4_3Collection.sol';
import '@itgold/everscale-tip/contracts/access/OwnableExternal.sol';
import './ITokenBurned.sol';
import './Nft.sol';

interface INft {
    function setParams(uint8 _paramType,uint128 _paramIndex, uint128 _paramValue, uint8[] _paramArray, uint8 _applyNumTimes) external;
    function setJson(string json) external;
}

contract Collection is TIP4_2Collection, TIP4_3Collection, OwnableExternal, ITokenBurned {

    /**
    * Errors
    **/
    uint8 constant sender_is_not_owner = 101;
    uint8 constant value_is_less_than_required = 102;


    /// _remainOnNft - the number of crystals that will remain after the entire mint 
    /// process is completed on the Nft contract
    uint128 _remainOnNft = 0.3 ever;

    uint128 _lastTokenId;

    uint128 _mintingFee;

    uint64 static _nonce;

    // Limit minting to a certain address
    address public mintAddress = address(0xe512476d3b2e2635cc2cc55ae478b55ea57f86b8d3bdf540d5f3298e39a9c7c9);

    constructor(
        TvmCell codeNft, 
        TvmCell codeIndex,
        TvmCell codeIndexBasis,
        uint256 ownerPubkey,
        string json,
        uint128 mintingFee
    ) OwnableExternal(
        ownerPubkey
    ) TIP4_1Collection (
        codeNft
    ) TIP4_2Collection (
        json
    ) TIP4_3Collection (
        codeIndex,
        codeIndexBasis
    ) public {
        tvm.accept();
        _mintingFee = mintingFee;
    }

    function mintNft(string json) external virtual {
        require(msg.sender == mintAddress, sender_is_not_owner);
        require(msg.value > _remainOnNft + _mintingFee + (2 * _indexDeployValue), value_is_less_than_required);
        tvm.rawReserve(_mintingFee, 4);

        uint256 id = _lastTokenId;
        _totalSupply++;
        _lastTokenId++;

        TvmCell codeNft = _buildNftCode(address(this));
        TvmCell stateNft = _buildNftState(codeNft, id);
        address nftAddr = new Nft{
            stateInit: stateNft,
            value: 0,
            flag: 128
        }(
            msg.sender,
            msg.sender,
            msg.sender,
            _remainOnNft,
            json,
            _indexDeployValue,
            _indexDestroyValue,
            _codeIndex
        ); 

        emit NftCreated(
            id, 
            nftAddr,
            msg.sender,
            msg.sender, 
            msg.sender
        );
    
    }

    function withdraw(address dest, uint128 value) external pure onlyOwner {
        tvm.accept();
        dest.transfer(value, true);
    }

    function onTokenBurned(uint256 id, address owner, address manager) external override {
        require(msg.sender == _resolveNft(id));
        tvm.accept();
        emit NftBurned(id, msg.sender, owner, manager);
        _totalSupply--;
    }

    function setRemainOnNft(uint128 remainOnNft) external virtual onlyOwner {
        _remainOnNft = remainOnNft;
    } 

    function setMintingFee(uint128 mintingFee) external virtual onlyOwner {
        _mintingFee = mintingFee;
    }

    function mintingFee() external view responsible returns(uint128) {
        return {value: 0, flag: 64, bounce: false}(_mintingFee);
    }

    function _buildNftState(
        TvmCell code,
        uint256 id
    ) internal virtual override(TIP4_2Collection, TIP4_3Collection) pure returns (TvmCell) {
        return tvm.buildStateInit({
            contr: Nft,
            varInit: {_id: id},
            code: code
        });
    }

    function setNftParams(address nftAddress, uint8 _paramType, uint128 _paramIndex, uint128 _paramValue, uint8[] _paramArray, uint8 _applyNumTimes) external {
        require(msg.sender == mintAddress, sender_is_not_owner);
        tvm.rawReserve(0, 4);
        Nft(nftAddress).setParams{value: 0, flag: 128}(_paramType, _paramIndex, _paramValue, _paramArray, _applyNumTimes);
    }

    function setMintAddress(address _mintAddress) external onlyOwner {
        tvm.accept();
        mintAddress = _mintAddress;
    }

    function setJson(address nftAddress, string json) external {
        require(msg.sender == mintAddress, sender_is_not_owner);
        tvm.rawReserve(0, 4);
        Nft(nftAddress).setJson{value: 0, flag: 128}(json);
    }

    function nftOwnerCodeHash(
        address _nftOwner
    ) public view returns (string codeHash) {
        TvmBuilder salt;
        salt.store("nft");
        salt.store(address(this));
        salt.store(_nftOwner);
        TvmCell codeIndexWithSalt = tvm.setCodeSalt(_codeIndex, salt.toCell());
        return format("{:064x}", tvm.hash(codeIndexWithSalt));
    }

}
