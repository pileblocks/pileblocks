// @flow

import type {TileCoordinatePlusColor, TileCoordinate, PlayerStats} from "../../AppTypes";
import Vue from "vue";


export const Game: {
    state: {
        totalFieldFragments: number,
        totalReward: number,
        totalRewardDynamic: number,
        remainingTiles: number,
        isMainScreen: boolean,
        payPerMove: number,
        field: { [string]: Array<Array<number>> },
        template: { [string]: Array<Array<number>> },
        tilesToPut: Array<TileCoordinate>,
        standings: Array<PlayerStats>,
        name: string
    }
} = {
    namespaced: true,
    state: {
        totalFieldFragments: 0,
        totalReward: 5000,
        payPerMove: 25,
        totalRewardDynamic: 4250,
        remainingTiles: 0,
        isMainScreen: true,
        field: {},
        template: {},
        standings: [],
        tilesToPut: [],
        name: ""
        //   field: {'0': [[4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [4, 4, 4, 4, 1, 1, 3, 3, 1, 1, 1, 3, 3, 3, 1, 3], [4, 4, 4, 1, 1, 1, 3, 1, 3, 1, 1, 3, 1, 3, 1, 1], [4, 1, 1, 1, 1, 1, 5, 3, 1, 1, 5, 3, 3, 3, 1, 1], [4, 1, 1, 1, 1, 1, 3, 1, 3, 1, 3, 1, 1, 3, 1, 1], [4, 1, 1, 1, 1, 1, 3, 1, 3, 1, 3, 1, 1, 3, 1, 3], [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]], '1': [[1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1], [1, 1, 1, 1, 1, 1, 1, 2, 1, 5, 5, 1, 1, 1, 1, 1], [1, 1, 2, 1, 1, 1, 1, 2, 1, 5, 1, 4, 1, 1, 1, 1], [1, 1, 1, 1, 1, 2, 1, 2, 1, 5, 1, 4, 2, 2, 2, 2], [1, 1, 1, 1, 1, 1, 1, 2, 1, 5, 5, 4, 2, 2, 2, 2], [1, 1, 2, 1, 2, 1, 1, 2, 2, 5, 1, 4, 2, 2, 2, 2], [1, 1, 1, 1, 1, 1, 1, 1, 2, 5, 1, 4, 2, 2, 2, 2], [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 5, 5, 2, 2, 2, 2]], '2': [[1, 1, 2, 1, 1, 3, 1, 1, 1, 2, 5, 5, 4, 2, 2, 2], [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 5, 4, 2, 2, 2], [1, 1, 1, 1, 1, 2, 1, 3, 1, 2, 2, 5, 4, 2, 2, 2], [1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 2, 5, 5, 5, 2, 5], [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 5, 4, 5], [1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 5, 5, 5], [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5, 5, 5], [4, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5, 5]], '3': [[4, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 5, 5], [4, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 2, 5, 5], [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 1], [4, 4, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5], [4, 4, 4, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 2, 1, 1], [4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2], [4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1]], '4': [[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 4, 5], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 5, 5, 4, 5], [2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 5], [2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4], [2, 2, 2, 3, 4, 5, 3, 5, 5, 5, 5, 5, 5, 5, 4, 4], [2, 2, 2, 5, 3, 5, 5, 3, 1, 1, 4, 1, 5, 5, 4, 4], [2, 2, 4, 5, 5, 5, 1, 5, 1, 5, 1, 1, 5, 1, 5, 4]], '5': [[2, 2, 2, 5, 5, 5, 5, 4, 3, 4, 5, 5, 5, 1, 4, 5], [2, 2, 2, 5, 5, 4, 5, 4, 4, 5, 5, 5, 4, 1, 5, 4], [2, 2, 4, 4, 5, 3, 5, 5, 4, 3, 5, 3, 4, 5, 4, 5], [2, 2, 5, 4, 4, 4, 4, 5, 3, 4, 4, 5, 4, 3, 3, 5], [2, 3, 5, 2, 1, 1, 1, 1, 3, 5, 5, 5, 3, 5, 5, 4], [2, 4, 5, 1, 1, 1, 1, 1, 1, 2, 5, 5, 5, 4, 4, 5], [2, 4, 2, 1, 1, 1, 1, 1, 1, 3, 4, 5, 4, 4, 4, 5], [2, 5, 1, 1, 1, 1, 1, 1, 1, 4, 5, 4, 5, 5, 4, 4]], '6': [[2, 3, 4, 1, 1, 1, 1, 3, 3, 4, 3, 4, 5, 4, 3, 3], [2, 3, 4, 1, 1, 5, 5, 5, 4, 5, 2, 2, 4, 3, 5, 5], [2, 4, 3, 4, 1, 4, 4, 4, 4, 5, 5, 4, 1, 2, 5, 4], [2, 5, 5, 3, 1, 1, 3, 4, 5, 4, 4, 2, 4, 1, 5, 4], [2, 1, 3, 1, 1, 1, 1, 4, 4, 5, 2, 1, 4, 1, 5, 3], [2, 1, 1, 1, 1, 1, 1, 1, 3, 1, 5, 5, 4, 1, 5, 5], [2, 1, 3, 1, 1, 1, 1, 1, 3, 1, 2, 1, 5, 3, 5, 4], [2, 1, 4, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 4, 4, 4]], '7': [[2, 2, 3, 3, 3, 2, 1, 1, 3, 1, 1, 1, 1, 5, 4, 5], [2, 2, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 3, 4, 4, 5], [2, 2, 1, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 4, 3, 5], [2, 2, 2, 3, 3, 4, 3, 1, 1, 1, 1, 3, 3, 4, 5, 5], [2, 2, 2, 3, 4, 5, 1, 1, 1, 1, 3, 4, 3, 4, 4, 5], [2, 2, 2, 1, 1, 1, 1, 1, 3, 3, 3, 5, 4, 4, 4, 5], [2, 2, 2, 1, 1, 1, 1, 3, 2, 5, 4, 4, 4, 4, 3, 5], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 3, 4, 5, 5]], '8': [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4], [3, 3, 3, 1, 1, 3, 1, 1, 3, 3, 1, 1, 1, 4, 4, 4], [1, 3, 1, 1, 3, 1, 3, 1, 3, 1, 3, 1, 1, 1, 4, 4], [3, 1, 1, 1, 3, 1, 3, 1, 3, 3, 1, 1, 1, 1, 1, 4], [3, 1, 1, 1, 3, 1, 3, 1, 3, 1, 3, 1, 1, 1, 1, 4], [3, 3, 3, 1, 1, 3, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1]], '9': [[1, 1, 2, 1, 1, 1, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 5, 5, 1, 5, 5, 5, 1, 1, 2, 1, 1], [1, 1, 1, 1, 5, 5, 5, 1, 5, 5, 5, 1, 1, 1, 1, 1], [2, 2, 2, 2, 5, 5, 5, 5, 5, 5, 5, 2, 1, 1, 2, 1], [2, 2, 2, 5, 5, 5, 5, 5, 5, 2, 2, 2, 1, 1, 1, 1], [2, 2, 2, 5, 5, 4, 4, 4, 2, 2, 2, 1, 1, 1, 1, 1], [2, 2, 5, 5, 4, 4, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1], [2, 4, 5, 4, 4, 2, 2, 2, 2, 1, 1, 3, 1, 2, 1, 1]], '10': [[2, 5, 5, 4, 5, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1], [5, 5, 4, 4, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3, 1], [5, 5, 4, 2, 2, 2, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1], [5, 4, 5, 2, 2, 1, 1, 3, 1, 1, 1, 2, 1, 1, 1, 1], [5, 5, 2, 2, 3, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1], [5, 4, 2, 2, 1, 1, 3, 1, 1, 2, 1, 1, 1, 2, 1, 1], [4, 4, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4], [4, 2, 2, 1, 1, 1, 1, 3, 1, 1, 1, 2, 1, 1, 1, 4]], '11': [[4, 2, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4], [4, 2, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 4], [2, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4], [5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4], [1, 1, 1, 2, 1, 1, 3, 1, 1, 1, 1, 2, 1, 4, 4, 4], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4], [1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]], '12': [[5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [5, 5, 5, 5, 4, 4, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2], [3, 4, 4, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2], [4, 4, 4, 3, 4, 5, 4, 5, 4, 2, 2, 2, 2, 2, 2, 2], [5, 4, 3, 5, 3, 3, 5, 5, 5, 5, 2, 2, 2, 2, 2, 2], [3, 5, 4, 3, 4, 4, 5, 3, 4, 4, 2, 2, 2, 2, 2, 2]], '13': [[4, 5, 5, 5, 5, 4, 4, 5, 3, 3, 2, 2, 2, 2, 2, 2], [4, 5, 4, 5, 5, 5, 5, 3, 3, 4, 4, 2, 2, 2, 2, 2], [5, 4, 5, 3, 4, 3, 3, 4, 4, 3, 5, 2, 2, 2, 2, 2], [4, 4, 4, 3, 4, 3, 3, 5, 3, 5, 4, 5, 2, 2, 2, 2], [3, 4, 3, 4, 5, 4, 4, 3, 4, 4, 4, 3, 4, 2, 3, 4], [5, 4, 4, 4, 4, 4, 4, 3, 4, 3, 5, 4, 4, 3, 4, 4], [5, 5, 5, 4, 5, 3, 4, 3, 4, 3, 3, 2, 4, 3, 4, 5], [4, 5, 3, 4, 5, 5, 3, 5, 4, 4, 3, 5, 1, 1, 1, 5]], '14': [[5, 4, 4, 5, 4, 4, 5, 4, 4, 4, 4, 5, 5, 5, 5, 5], [3, 4, 5, 3, 4, 5, 3, 3, 3, 3, 3, 3, 3, 4, 4, 2], [4, 4, 5, 4, 5, 3, 4, 3, 3, 4, 4, 5, 5, 5, 5, 2], [4, 5, 5, 4, 5, 5, 3, 5, 3, 3, 5, 5, 4, 4, 3, 3], [5, 3, 3, 4, 5, 5, 3, 5, 3, 4, 5, 3, 3, 2, 2, 2], [2, 4, 4, 3, 4, 3, 4, 5, 3, 5, 3, 3, 5, 2, 2, 2], [4, 5, 5, 3, 5, 4, 4, 3, 4, 4, 3, 5, 2, 2, 2, 2], [1, 4, 3, 1, 3, 4, 4, 5, 5, 5, 2, 3, 2, 2, 2, 2]], '15': [[1, 4, 3, 1, 4, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 2], [1, 4, 3, 1, 5, 5, 4, 3, 5, 2, 2, 2, 2, 2, 2, 2], [1, 4, 3, 1, 4, 5, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2], [1, 4, 3, 1, 5, 3, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2], [4, 5, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2], [5, 5, 5, 5, 4, 5, 5, 3, 4, 4, 3, 4, 2, 2, 2, 2], [5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 3, 1, 2, 2, 2], [5, 5, 2, 5, 5, 5, 5, 5, 4, 2, 1, 1, 5, 2, 2, 2]]}
    },
    mutations: {
        addTile(state, tilePlusColor: TileCoordinatePlusColor) {
            state.tilesToPut.push(tilePlusColor);
        },
        removeTile(state, tilePlusColor: TileCoordinatePlusColor) {
            const removeIndex = state.tilesToPut.findIndex((item: TileCoordinatePlusColor) => {
                return item.color === tilePlusColor.color && item.x === tilePlusColor.x && item.y === tilePlusColor.y && item.f === tilePlusColor.f
            });
            if (removeIndex >= 0) {
                state.tilesToPut.splice(removeIndex, 1)
            }
        },
        putTile(state, coordinates: TileCoordinatePlusColor) {
            Vue.set(state.field[coordinates.f.toString()][coordinates.y], coordinates.x, coordinates.color);
        },

        updateField(state, newField) {
            state.field = newField;
        },

        updateTemplate(state, newTemplate) {
            state.template = newTemplate;
        },

        updateStandings(state, newStandings) {
            state.standings = newStandings;
        },

        updateName(state, newName) {
            state.name = newName;
        },

        updateTotalFieldFragments(state, totalFieldFragments) {
            state.totalFieldFragments = totalFieldFragments;
        },

        updateRemainingTiles(state, remainingTiles) {
            state.remainingTiles = remainingTiles;
        },
        cancelPut(state) {
            state.tilesToPut = [];
        },
        updateIsMainScreen(state, isMainScreen: boolean) {
            state.isMainScreen = isMainScreen;
        },
        calculateRewards(state) {
            state.standings.sort(function (first:PlayerStats, second: PlayerStats) {
                if (first.captured > second.captured || first.captured < second.captured) {
                    return second.captured - first.captured;
                }
                if (first.captured === second.captured) {
                    return first.lastPutTime - second.lastPutTime;
                }
            });
            let numberOfTiles = 0;
            let rewardCoeff = 0;
            if (state.standings.length > 0) {
                numberOfTiles = state.standings.map((player:PlayerStats) => player.captured).reduce((total:number, item:number) => total + item);
                if (numberOfTiles > 1) {
                    rewardCoeff = state.totalRewardDynamic * 2 / (numberOfTiles - 1);
                }
            }

            let lastTile = 0;
            for (let playerStat of state.standings) {
                playerStat.reward = playerStat.captured * (numberOfTiles * 2 - (playerStat.captured + 1 + 2 * lastTile)) * (rewardCoeff / (numberOfTiles * 2));
                lastTile += playerStat.captured;
            }
        }
    },

    actions: {
        addTileAction({ commit, state, rootState }, tilePlusColor: TileCoordinatePlusColor) {
            state.remainingTiles -= 1;
            commit('addTile', tilePlusColor);
            let player = state.standings.find((player: PlayerStats) => player.walletAddress === rootState.PlayerInfo.walletAddress);
            if (!player) {
                const newPlayer:PlayerStats = {
                    playerAddress: rootState.PlayerInfo.playerAddress,
                    walletAddress: rootState.PlayerInfo.walletAddress,
                    captured: 1,
                    reward: 0,
                    isLast: state.remainingTiles === 0,
                    isPrelast: state.remainingTiles === 1,
                    lastPutTime: Date.now()
                }
                state.standings.push(newPlayer);
            }
            else {
                player.captured += 1;
                player.isLast = state.remainingTiles === 0;
                player.isPrelast = state.remainingTiles === 1;
            }
            commit('calculateRewards');
        },
        removeTileAction({ commit, state, rootState }, tilePlusColor: TileCoordinatePlusColor) {
            state.remainingTiles += 1;
            commit('removeTile', tilePlusColor);
            let player = state.standings.find((player: PlayerStats) => player.walletAddress === rootState.PlayerInfo.walletAddress);
            player.captured -= 1;
            commit('calculateRewards');
        },

    },

    getters: {
        getCapturedTiles(state, getters, rootState) {
            const player = state.standings.find((player: PlayerStats) => player.walletAddress === rootState.PlayerInfo.walletAddress);
            return player ? player.captured : 0
        },
        getReward(state, getters, rootState) {
            const player = state.standings.find((player: PlayerStats) => player.walletAddress === rootState.PlayerInfo.walletAddress);
            return player ? player.reward : 0
        },
    }
}