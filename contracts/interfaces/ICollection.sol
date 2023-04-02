pragma ton-solidity >= 0.57.0;

import "../structures/PBStructs.sol";

interface ICollection {
    function setMintAddress(address _mintAddress) external;
    function mintNft(string json) external;
    function setJson(address nftAddress, string json) external;
    function setNftParams(address nftAddress, uint8 _paramType, uint128 _paramIndex, uint128 _paramValue, uint8[] _paramArray, uint8 _applyNumTimes) external;
}