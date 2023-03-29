pragma ton-solidity >= 0.47.0;

import "../structures/PBStructs.sol";

interface IOracle {
    function verifyNftSender(address msgSender, uint256 id, TvmCell callbackData) external view responsible returns (bool, TvmCell);
}