// @flow

export type TileCoordinate = {
    f: number,
    x: number,
    y: number
}

export type TileCoordinatePlusColor = {
    f: number,
    x: number,
    y: number,
    color: number
}

export type ToastWrongColor = {
    colorNumber: number
}

export type ToastZeroTilesLeft = {
    colorNumber: number
}

export type Contract = {
    methods: Object
}

export type PlayerAddress = {
    toString: () => string,
    _address: string
}

export type PlayerStats = {
    playerAddress: string,
    walletAddress: string,
    captured: number,
    lastPutTime: number,
    reward: number,
    isReceived: boolean,
    stars: number,
    nft: boolean
}

export type GameInfo = {
    tokenRootAddress: string,
    created: string,
    imageOwner: string,
    gameId: string,
    gameWallet: string,
    remainingTiles: string,
    gameHost: string,
    renderConfig: string[],
    status: string,
    gameName: string,
    gameStartTime: string
}
//renderConfig [VERT_FRAGMENTS, HORIZ_FRAGMENTS, TOKENS_PER_PUT, MAX_COLORS, 0xfefefe, 0xaab0bc, 0x60697b, 0x2f353a, 0x1e2228]

export type RawPlayerStats = {
    captured: string,
    stars: string,
    lastPutTime: string,
    walletAddress: any,
    reward: string,
    isReceived: boolean,
    nft: boolean
}

export type GameExtraSettings = {
    maxStars: number,
    scorePerStar: number,
    currentStars: number,
    percentOfReward: any
}

export type RewardsCalculated = {
    timestamp: string
}

export type OperationCompleted = {
    timestamp: string,
    gameStatus: string,
    name: string,
    player: {_address: string, toString(): string},
    value: string
}

export type GameBattle = {
    timestamp: string,
    name: string,
    player: {_address: string, toString(): string},
    value: string
}

export type GameEvent = {
    event: string,
    data: RewardsCalculated | OperationCompleted
}

export type NotificationMessage = {
    toastName: string,
    data: ToastWrongColor|ToastZeroTilesLeft
}

export type NotificationObj = {
    received: number,
    payload: NotificationMessage
}

export type NftJson = {
    type: string,
    id: number,
    name: string,
    description: string,
    preview: {source: string, mimetype: string},
    files: [{source: string, mimetype: string}],
    attributes: [{trait_type: string, value: string}],
    external_url: string,
    nftAddress: string
}
