pragma ton-solidity >= 0.47.0;

import "../structures/PBStructs.sol";

interface IPBGame {
    function onClaimTiles(address ownerAddress, uint16 tilesNum) external;
    function onClaimTilesFarming(address ownerAddress, uint16 tilesNum) external;
    function setGameStatus(uint8 newStatus) external;
    function completeGame() external;
    function saveImageFragment(uint8 fragmentNum, uint8[][] tiles) external;
    function setImageForReview() external;
    function drainByHost() external view;
    function drainTokens(uint128 value) external view;
    function deployFarmingWallet() external view;
    function notifyBalanceChange(address ownerAddress, uint128 tokenBalance) external;
    function setGameExtraSettings(uint128[] _gameExtraSettings) external;
    function setGameId(uint32 _gameId) external;
    function askFarmingSpeed(address ownerAddress) external;
}
