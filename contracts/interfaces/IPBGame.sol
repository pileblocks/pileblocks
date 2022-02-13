pragma ton-solidity >= 0.47.0;

struct ColorTile {
    uint8 f;
    uint8 x;
    uint8 y;
    uint8 color;
}


struct PlayerInfo {
    address walletAddress;
    uint16 captured;
    bool isLast;
    bool isPrelast;
    uint64 lastPutTime;
}

struct GameInfo {
    address tokenRootAddress;
    uint64 created;
    address imageOwner;
    uint32 gameId;
    address gameWallet;
    uint32 remainingTiles;
    address gameHost;
    uint24[] renderConfig;
    uint8 status;
}

interface IPBGame {
    function onClaimTiles(address ownerAddress, uint16 tilesNum) external;
    function onPutTiles(address ownerAddress, ColorTile[] tiles, uint128 tokensNum) external;
    function setGameStatus(uint8 newStatus) external;
    function completeGame(uint128 _totalReward) external;
}
