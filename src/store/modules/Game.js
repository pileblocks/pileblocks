// @flow

import type {TileCoordinatePlusColor, PlayerStats} from "@/AppTypes";
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
        tilesToPut: Array<TileCoordinatePlusColor>,
        standings: Array<PlayerStats>,
        name: string,
        cachedReward: number,
        status: number,
        gameStartTime: number
    }
} = {
    namespaced: true,
    state: {
        totalFieldFragments: 0,
        totalReward: 0,
        payPerMove: 0,
        totalRewardDynamic: 0,
        remainingTiles: 0,
        isMainScreen: true,
        field: {},
        template: {},
        standings: [],
        tilesToPut: [],
        name: "",
        cachedReward: 0,
        status: 1,
        gameStartTime: 0
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

        updateGameStartTime(state, newStartTime) {
            state.gameStartTime = newStartTime;
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

        updateInitConfig(state, {payPerMove}) {
            state.payPerMove = payPerMove;
        },

        updateTotalReward(state, {totalReward, totalRewardDynamic}) {
            state.totalReward = totalReward;
            state.totalRewardDynamic = totalRewardDynamic;
        },

        updateStatus(state, newStatus) {
            state.status = newStatus
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
            // if (state.status === GAME_STATUS_COMPLETED) {
            //     return;
            // }
            let numberOfTiles = 0;
            let rewardCoeff = 0;
            if (state.standings.length > 0) {
                numberOfTiles = state.standings.map((player:PlayerStats) => player.captured).reduce((total:number, item:number) => total + item);
                if (numberOfTiles > 1) {
                    rewardCoeff = state.totalRewardDynamic * 2 / (numberOfTiles - 1);
                }
            }

            let lastTile = 0;
            const lastTileReward = state.totalReward / 10;
            const prelastTileReward = state.totalReward / 20;
            for (let playerStat of state.standings) {

                playerStat.reward = 0;

                if (playerStat.isLast) {
                    playerStat.reward += lastTileReward;
                }
                if (playerStat.isPrelast) {
                    playerStat.reward += prelastTileReward;
                }

                playerStat.reward += playerStat.captured * (numberOfTiles * 2 - (playerStat.captured + 1 + 2 * lastTile)) * (rewardCoeff / (numberOfTiles * 2));
                lastTile += playerStat.captured;
            }
        }
    },

    actions: {
        addTileAction({ commit, state, rootState }, tilePlusColor: TileCoordinatePlusColor) {
            state.remainingTiles -= 1;
            commit('addTile', tilePlusColor);
            let player = state.standings.find((player: PlayerStats) => player.playerAddress === rootState.PlayerInfo.playerAddress);
            if (!player) {
                const newPlayer:PlayerStats = {
                    playerAddress: rootState.PlayerInfo.playerAddress,
                    walletAddress: rootState.PlayerInfo.walletAddress,
                    captured: 1,
                    reward: 0,
                    isLast: false,
                    isPrelast: false,
                    lastPutTime: Date.now(),
                    isReceived: false
                }
                state.standings.push(newPlayer);
            }
            else {
                player.captured += 1;
            }
            commit('calculateRewards');
        },
        removeTileAction({ commit, state, rootState }, tilePlusColor: TileCoordinatePlusColor) {
            state.remainingTiles += 1;
            commit('removeTile', tilePlusColor);
            let player = state.standings.find((player: PlayerStats) => player.playerAddress === rootState.PlayerInfo.playerAddress);
            player.captured -= 1;
            commit('calculateRewards');
        },

        updateRewardCache({state, rootState}) {
            for (let playerStat of state.standings) {
                if (playerStat.playerAddress === rootState.PlayerInfo.playerAddress) {
                    state.cachedReward = playerStat.reward;
                }
            }
        }

    },

    getters: {
        getCapturedTiles(state, getters, rootState) {
            const player = state.standings.find((player: PlayerStats) => player.playerAddress === rootState.PlayerInfo.playerAddress);
            return player ? player.captured : 0
        },
        getReward(state, getters, rootState) {
            const player = state.standings.find((player: PlayerStats) => player.playerAddress === rootState.PlayerInfo.playerAddress);
            return player ? player.reward : 0
        },
        isReceivedReward(state, getters, rootState):boolean {
            const player = state.standings.find((player: PlayerStats) => player.playerAddress === rootState.PlayerInfo.playerAddress);
            return player ? player.isReceived : false
        },
        isInRoaster(state, getters, rootState):boolean {
            return state.standings.find((player: PlayerStats) => player.playerAddress === rootState.PlayerInfo.playerAddress) !== undefined;
        }
    }
}
