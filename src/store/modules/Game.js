// @flow

import type {TileCoordinatePlusColor, PlayerStats, GameExtraSettings} from "@/AppTypes";
import Vue from "vue";


export const Game: {
    state: {
        totalFieldFragments: number,
        totalReward: number,
        remainingTiles: number,
        isMainScreen: boolean,
        payPerMove: number,
        field: { [string]: Array<Array<number>> },
        template: { [string]: Array<Array<number>> },
        tilesToPut: Array<TileCoordinatePlusColor>,
        standings: Array<PlayerStats>,
        name: string,
        status: number,
        gameStartTime: number,
        extraSettings: ?GameExtraSettings,
        gameId: number,
        columns: number,
        lastGameId: number
    }
} = {
    namespaced: true,
    state: {
        totalFieldFragments: 0,
        totalReward: 0,
        payPerMove: 0,
        remainingTiles: 0,
        isMainScreen: true,
        field: {},
        template: {},
        standings: [],
        tilesToPut: [],
        name: "",
        status: 1,
        gameStartTime: 0,
        extraSettings: null,
        gameId: 0,
        columns: 0,
        lastGameId: 0
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

        updateLastGameId(state, newGameId) {
            state.lastGameId = newGameId;
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

        updateId(state, newId) {
            state.gameId = newId;
        },

        updateInitConfig(state, {payPerMove}) {
            state.payPerMove = payPerMove;
        },

        updateTotalReward(state, {totalReward}) {
            state.totalReward = totalReward;
        },

        updateStatus(state, newStatus) {
            state.status = newStatus
        },

        updateTotalFieldFragments(state, totalFieldFragments) {
            state.totalFieldFragments = totalFieldFragments;
        },

        updateColumns(state, newColumns) {
            state.columns = newColumns;
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

        updateExtraSettings(state, settings: GameExtraSettings) {
            state.extraSettings = settings;
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

            let position = 1;
            for (let player of state.standings) {
                player.position = position;
                position += 1;
            }

            // if (state.status === GAME_STATUS_COMPLETED) {
            //     return;
            // }

            let rewardPercentArray = [45, 25, 15, 10, 5];

            let rewardArray = rewardPercentArray.map((item) => item * state.totalReward/100);

            for (let i = 0; i < Math.min(state.standings.length, 5); i++) {
                state.standings[i].reward = rewardArray[i];
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
                    stars: 0,
                    lastPutTime: Date.now(),
                    isReceived: false,
                    nft: false
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

    },

    getters: {
        getCapturedTiles(state, getters, rootState) {
            const player = state.standings.find((player: PlayerStats) => player.playerAddress === rootState.PlayerInfo.playerAddress);
            return player ? player.captured : 0
        },

        getPosition(state, getters, rootState) {
            const player = state.standings.find((player: PlayerStats) => player.playerAddress === rootState.PlayerInfo.playerAddress);
            return player ? player.position : 0
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
