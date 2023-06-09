pragma ton-solidity >= 0.47.0;

interface IProfile {
    function receiveCrystals(uint32 gameId, uint8 mineralNumber, uint128 mineralValue) external view;
    function p2pAccept(address _playerAddress, uint8 mineralNum, uint128 mineralValue) external;
}