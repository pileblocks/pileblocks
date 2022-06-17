// @flow
import Vue from 'vue';
import type {Contract} from "@/AppTypes";
export const PlayerInfo: {
    state: {
        walletAddress: string,
        colors: Array<number>,
        currentColor: number,
        balance: number,
        claimableTiles: number,
        farmingContract: ?Contract,
        farmingAddress: ?string,
        isFarmingActive: boolean,
        farmingBalance: number,
        farmingEstimation: number
    }
} = {
    namespaced: true,
    state: {
        playerAddress: "",
        walletAddress: "",
        colors: [0, 0, 0, 0, 0],
        currentColor: 1,
        balance: 0,
        claimableTiles: 0,
        farmingAddress: null,
        farmingContract: null,
        isFarmingActive: false,
        tokensToAdd: 0,
        farmingEstimation: 0
    },
    mutations: {

        updateFarmingContract(state, newContract) {
            state.farmingContract = newContract;
        },

        updateColors(state, newColors) {
            state.colors = newColors;
        },
        updateWalletAddress(state, newWalletAddress) {
            state.walletAddress = newWalletAddress;
        },
        updateFarmingAddress(state, newFarmingAddress) {
            state.farmingAddress = newFarmingAddress;
        },
        updateFarmingActive(state, isFarmingActive) {
            state.isFarmingActive = isFarmingActive;
        },
        updatePlayerAddress(state, newPlayerAddress) {
            state.playerAddress = newPlayerAddress;
        },
        setCurrentColor(state, newColor:number) {
            state.currentColor = newColor;
        },
        updateColorQty(state, {colorNumber, qty}) {
            if (state.colors[colorNumber - 1] >= -qty) {
                Vue.set(state.colors, colorNumber - 1, state.colors[colorNumber - 1] + qty);
            }
        },
        updateBalance(state, newBalance) {
            state.balance = newBalance;
        },
        updateClaimableTiles(state, newTiles) {
            state.claimableTiles = newTiles;
        },
        updateLockedInFarming(state, farmingBalance) {
            state.farmingBalance = farmingBalance;
        },
        updateFarmingEstimation(state, newEstimation) {
            state.farmingEstimation = newEstimation;
        }
    },

    actions: {},

    getters: {
        getBalance(state) {
            return state.balance;
        }
    }
};
