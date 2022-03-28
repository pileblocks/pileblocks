pragma ton-solidity >= 0.47.0;

import "./PBStructs.sol";

interface IPBGame {
    function onClaimTiles(address ownerAddress, uint16 tilesNum) external;
    function setGameStatus(uint8 newStatus) external;
    function completeGame(uint128 _totalReward) external;
    function saveImageFragment(uint8 fragmentNum, uint8[][] tiles) external;
    function setImageForReview() external;
    function drainByHost() external view;
    function drainTokens(uint128 value) external view;
}
