pragma ton-solidity >= 0.47.0;

import "./PBStructs.sol";

interface IPBWallet {
    function claimTiles(address gameAddress, address genesisAddress) external;
}