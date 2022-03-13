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

export type PlayerStats = {
    playerAddress: string,
    walletAddress: string,
    captured: number,
    isLast: boolean,
    isPrelast: boolean,
    lastPutTime: number,
    reward: number
}
