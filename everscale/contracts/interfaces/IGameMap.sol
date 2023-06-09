pragma ton-solidity >= 0.47.0;

interface IGameMap {
    function deployMapFarm(address winnerAddress, uint32 gameId) external;
    function getMapFarmAddress(address playerAddress, uint32 gameId, TvmCell callbackData) external view responsible returns (address, TvmCell);
}