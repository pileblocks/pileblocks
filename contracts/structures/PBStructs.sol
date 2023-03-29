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
    uint16 stars;
    uint64 lastPutTime;
    uint128 reward;
    bool isReceived;
    bool nft;
}

struct GameExtraSettings {
    uint128 farmingSpeed;
    uint8 blockColorsProbability;
}

struct GameInfo {
    address tokenRootAddress;
    uint64 created;
    address imageOwner;
    uint32 gameId;
    address gameWallet;
    uint16 remainingTiles;
    address gameHost;
    uint24[] renderConfig;
    uint8 status;
    string gameName;
    uint64 gameStartTime;
}

struct MapFarmInfo {
    address playerAddress;
    address mapFarmAddress;
    uint8 mineralNumber;
    uint128 farmingSpeed;
    uint128 usedSupply;
    uint128 maxSupply;
}
