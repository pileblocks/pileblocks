pragma ton-solidity >= 0.47.0;

struct ColorTile {
    uint8 x;
    uint8 y;
    uint8 color;
}


struct PlayerInfo {
    address walletAddress;
    uint16[] tiles; // tiles[0] = color 1, tiles[1] = color 2, etc.
    uint16 captured;
    bool isLast;
    bool isPrelast;
    uint32 lastPutTime;
}

struct GameInfo {
    address tokenRootAddress;
    uint64 created;
    address imageOwner;
    uint32 gameId;
    address gameWallet;
    uint32 remainingTiles;
    address gameHost;
}

interface IPBGame {
    function onClaimTiles(address ownerAddress, uint16 tilesNum) external;
    function onPutTiles(address ownerAddress, ColorTile[] tiles, uint128 tokensNum, uint128 balance) external;
}
