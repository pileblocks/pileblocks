// @flow

import {EverAPI} from "@/api/ever";
import {_dataToNumbers} from "@/utils"
import type {PlayerStats, RawPlayerStats, Contract} from "@/AppTypes";
import {TokenWalletContract} from "@/contract_wrappers/TokenWallet";
import {Address} from "everscale-inpage-provider";
import {GENESIS_ADDRESS} from "@/AppConst";
import type {GameInfo} from "@/AppTypes";
import type {PlayerAddress} from "@/AppTypes";

export const Ever: {
    state: {
        api: Object,
        isLoading: boolean,
        tokenRoot: Contract | null,
        host: Contract | null,
        game: Contract | null,
        loadingStatus: number,
        operationInProgress: boolean
    }
} = {
    namespaced: true,
    state: {
        api: null,
        isLoading: true,
        loadingStatus: 0,
        operationInProgress: false,
        tokenRoot: null,
        host: null,
        game: null,
        calc: null
    },
    mutations: {
        updateApi(state, newApi) {
            state.api = newApi;
        },
        toggleLoading(state, isLoading: boolean) {
            state.isLoading = isLoading;
        },
        updateLoadingStatus(state, newStatus: number) {
            state.loadingStatus = newStatus;
        },
        isOpInProgress(state, newOpStatus: boolean) {
            state.operationInProgress = newOpStatus
        },
        updateTokenRoot(state, tokenRoot) {
            state.tokenRoot = tokenRoot;
        },
        updateHost(state, host) {
            state.host = host;
        },
        updateGame(state, game) {
            state.game = game;
        },
        updateCalc(state, calc) {
            state.calc = calc;
        }
    },

    actions: {
        async setField({commit, rootState}) {
            let rawField: Array<[number, Array<Array<number>>]> = await EverAPI.game.getField(rootState.Ever.game);
            let newField = {};
            _dataToNumbers(rawField, newField);
            commit("Game/updateField", newField, {root: true});
        },
        async setStandings({commit, rootState}) {
            let standings: Array<PlayerStats> = [];
            let rawPlayers: Array<Array<RawPlayerStats>> = await EverAPI.game.getPlayers(rootState.Ever.game);
            for (const player of rawPlayers) {
                let tmpPlayer: PlayerStats = {};
                tmpPlayer.playerAddress = player[0].toString();
                tmpPlayer.captured = parseInt(player[1].captured);
                tmpPlayer.isLast = player[1].isLast;
                tmpPlayer.reward = rootState.Game.cachedReward;

                // We cannot use it right away since the reward calculation is asynchronous, so we would need another status to just collect
                // the result of the blockchain calculation. Thankfully, the client-side calc works good as well.
                // if (tmpPlayer.playerAddress === rootState.PlayerInfo.playerAddress && rootState.Game.status !== GAME_STATUS_COMPLETED) {
                //     tmpPlayer.reward = rootState.Game.cachedReward;
                // } else {
                //     tmpPlayer.reward = new BigNumber(player[1].reward).dividedBy(1e9).toNumber();
                // }
                tmpPlayer.isPrelast = player[1].isPrelast;
                tmpPlayer.lastPutTime = parseInt(player[1].lastPutTime);
                tmpPlayer.walletAddress = player[1].walletAddress.toString();
                tmpPlayer.isReceived = player[1].isReceived;
                standings.push(tmpPlayer);
            }
            commit("Game/updateStandings", standings, {root: true});

        },
        async isWalletDeployed({rootState}): Promise<boolean> {
            let ever = rootState.Ever.api;
            let state: Object = await EverAPI.wallet.getState(ever, rootState.PlayerInfo.walletAddress);
            return JSON.stringify(state) !== "{}";
        },

        async setWalletBalance({commit, rootState, dispatch}) {
            let ever = rootState.Ever.api;
            let isDeployed: boolean = await dispatch('isWalletDeployed');
            if (!isDeployed) {
                commit("PlayerInfo/updateBalance", 0, {root: true});
                return;
            }
            const walletAddress = new Address(rootState.PlayerInfo.walletAddress);
            const wallet = new ever.Contract(TokenWalletContract.abi, walletAddress);
            commit("PlayerInfo/updateBalance", await EverAPI.wallet.getBalance(wallet), {root: true});
        },

        async setRemainingTiles({commit, rootState}) {
            const gameInfo = await EverAPI.game.getGameInfo(rootState.Ever.game);
            commit("Game/updateRemainingTiles", parseInt(gameInfo.remainingTiles), {root: true})
        },

        async setClaimTiles({commit, dispatch, rootState}) {
            let ever = rootState.Ever.api;
            let isDeployed: boolean = await dispatch('isWalletDeployed');
            if (isDeployed) {
                const walletAddress = new Address(rootState.PlayerInfo.walletAddress);
                const wallet = new ever.Contract(TokenWalletContract.abi, walletAddress);
                commit("PlayerInfo/updateClaimableTiles", await EverAPI.wallet.getTiles(wallet), {root: true});
            }
        },

        async reloadGame({dispatch, commit}) {
            commit('Game/cancelPut', null, {root: true});
            await dispatch('updateGameStatus');
            await dispatch('setStandings');
            await dispatch('setRemainingTiles');
            await dispatch('setWalletBalance');
            await dispatch('setClaimTiles');
            await dispatch('updateColors');
            commit('Game/calculateRewards', null, {root: true});
            await dispatch('Game/updateRewardCache', null, {root: true});
            await dispatch('setField');
        },

        async claimTiles({state, rootState}) {
            const ever = rootState.Ever.api;
            const walletAddress = new Address(rootState.PlayerInfo.walletAddress);
            const wallet = new ever.Contract(TokenWalletContract.abi, walletAddress);
            await EverAPI.wallet.claimTiles(wallet, rootState.PlayerInfo.playerAddress, state.game.address.toString(), GENESIS_ADDRESS);
        },

        async putTiles({state, rootState}) {
            const ever = rootState.Ever.api;
            const walletAddress = new Address(rootState.PlayerInfo.walletAddress);
            const wallet = new ever.Contract(TokenWalletContract.abi, walletAddress);

            const tilesPayload = await EverAPI.game.packTiles(state.game, rootState.Game.tilesToPut);
            await EverAPI.wallet.putTiles(wallet,
                rootState.Game.payPerMove * 1e9,
                state.game.address.toString(),
                rootState.PlayerInfo.playerAddress,
                tilesPayload
            );
        },

        async updateColors({commit, rootState}) {
            const game = rootState.Ever.game;
            const playerColors: Array<[PlayerAddress, number[]]> = await EverAPI.game.getColors(game);
            const colors = playerColors.find((item: [PlayerAddress, number[]]) => item[0].toString() === rootState.PlayerInfo.playerAddress);
            if (colors !== undefined) {
                commit('PlayerInfo/updateColors', colors[1].map((item) => parseInt(item)), {root: true});
            }
        },

        async updateGameStatus({commit, state}) {
            const gameInfo: GameInfo = await EverAPI.game.getGameInfo(state.game);
            commit("Game/updateStatus", parseInt(gameInfo.status), {root: true})
        },

        async claimReward({state, rootState}) {
            await EverAPI.game.claimReward(state.game, rootState.PlayerInfo.playerAddress);

        },
    },

    getters: {
        calcFarming: function (state, getters, rootState) {
            return async function (time, balance) {
                    return await EverAPI.calc.calcFarming(rootState.Ever.calc, time, balance);
            }
        }
    }
};
