pragma ton-solidity >= 0.47.0;

contract FarmingCalculator {
    uint64 static _randomNonce;

    function log_2(uint128 x) public pure returns (uint128) {
        //TODO: Move to a library
        require(x >= 1);
        uint128 n = 0;
        if (x >= 2**128) { x >>= 128; n += 128; }
        if (x >= 2**64) { x >>= 64; n += 64; }
        if (x >= 2**32) { x >>= 32; n += 32; }
        if (x >= 2**16) { x >>= 16; n += 16; }
        if (x >= 2**8) { x >>= 8; n += 8; }
        if (x >= 2**4) { x >>= 4; n += 4; }
        if (x >= 2**2) { x >>= 2; n += 2; }
        if (x >= 2**1) { /* x >>= 1; */ n += 1; }
        return uint128(n);
    }

    function calcFarming(uint128 time, uint128 tokenBalance) external pure returns (uint128 farmValue) {
        return (time * log_2(1 + math.divr(tokenBalance, 1e9)) / (time + 7200)) * 19 * log_2(1 + time / 900);
    }
}
