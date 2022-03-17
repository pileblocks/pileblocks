// @flow
import Vue from 'vue';
export const PlayerInfo: {
    state: {
        walletAddress: string,
        colors: Array<number>,
        currentColor: number,
        balance: number,
        claimableTiles: number
    }
} = {
    namespaced: true,
    state: {
        playerAddress: "",
        walletAddress: "",
        colors: [0, 0, 0, 0, 0],
        currentColor: 1,
        balance: 0,
        claimableTiles: 0
    },
    mutations: {
        updateColors(state, newColors) {
            state.colors = newColors;
        },
        updateWalletAddress(state, newWalletAddress) {
            state.walletAddress = newWalletAddress;
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
        }
    },

    actions: {},

    getters: {
        getBalance(state) {
            return state.balance;
        }
    }
};
