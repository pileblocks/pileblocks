pragma ton-solidity >= 0.47.0;

import "./PBStructs.sol";

interface IPBWallet {
    function claimTiles(address gameAddress) external;
    function putTiles(address genesis, address gameHost, address gameAddress, uint128 tokensNum, ColorTile[] tiles) external;
}