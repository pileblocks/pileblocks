pragma ton-solidity >= 0.57.0;

interface IGameQueue {
    function releaseTokens(uint128 amount) external;
    function claimTiles(address genesis) external;
    function getNextGame() external responsible returns (address);
}
