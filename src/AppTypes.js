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
    methods: function
}

export type PlayerAddress = {
    toString: function,
    _address: string
}

export type PlayerStats = {
    playerAddress: string,
    walletAddress: string,
    captured: number,
    isLast: boolean,
    isPrelast: boolean,
    lastPutTime: number,
    reward: number
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
    status: string
}

export type RawPlayerStats = {
    captured: string,
    isLast: boolean,
    isPrelast: boolean,
    lastPutTime: string,
    walletAddress: Address
}

