pragma ton-solidity >= 0.47.0;

import "../structures/PBStructs.sol";

interface IOracle {
    function verifyNft(address nftAddress, TvmCell opData) external responsible returns (bool isNftVerified, TvmCell callbackData);
}