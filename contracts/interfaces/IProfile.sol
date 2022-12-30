pragma ton-solidity >= 0.47.0;

interface IProfile {
    function receiveCrystals(uint32 gameId) external view;
}