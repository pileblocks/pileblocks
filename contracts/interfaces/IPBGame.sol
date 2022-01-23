pragma ton-solidity >= 0.47.0;

interface IPBGame {
    function onClaimTiles(address ownerAddress, uint16 tilesNum) external;
}
