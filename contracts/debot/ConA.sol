pragma ton-solidity >= 0.47.0;

contract ConA {

    function smth() public returns (uint128) {
        uint16 capturedTiles = 101;
        uint16 lastTile = 0;
        uint128 totalReward = 5_000_000_000_000;
        uint128 rewardCoeff = totalReward / 1024;

        return (uint128(capturedTiles + 1) * (2047 * 2 - uint128(capturedTiles + lastTile)) * rewardCoeff) / (2047 * 2);
    }
}
