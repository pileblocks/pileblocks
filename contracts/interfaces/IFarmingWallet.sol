pragma ton-solidity >= 0.47.0;

import "./PBStructs.sol";

interface IFarmingWallet {
    function releaseTokens(uint128 amount) external;
    function claimTiles(address genesis) external;
}
