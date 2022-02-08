pragma ton-solidity >= 0.47.0;

interface IPBWallet {
    function claimTiles() external responsible returns (address, uint16);
}