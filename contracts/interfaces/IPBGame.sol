pragma ton-solidity >= 0.47.0;

struct ColorTile {
    uint8 x;
    uint8 y;
    uint8 color;
}

interface IPBGame {
    function onClaimTiles(address ownerAddress, uint16 tilesNum) external;
    function onPutTiles(address ownerAddress, ColorTile[] tiles, uint128 tokensNum, uint128 balance) external;
}
