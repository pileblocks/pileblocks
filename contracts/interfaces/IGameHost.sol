pragma ton-solidity >= 0.47.0;

import "IPBGame.sol";

interface IGameHost {
    function onGameCompleted(GameInfo gameInfo) external;
}
