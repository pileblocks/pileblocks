// @flow
import Vue from 'vue';
import {colors} from "@/store/modules/consts";
export const PlayerInfo: {
    state: {
        walletAddress: string,
        colors: Array<number>,
        currentColor: number
    }
} = {
    namespaced: true,
    state: {
        playerAddress: "0:aaaa9dae49ed47b44d71bc89d282f2765230395f5f127849c33a20da52611578",
        walletAddress: "0:aaaa9dae49ed47b44d71bc89d282f2765230395f5f127849c33a20da52611577",
        colors: JSON.parse(JSON.stringify(colors)),
        currentColor: 1
    },
    mutations: {
        updateColors(state) {
            state.colors = JSON.parse(JSON.stringify(colors));
        },
        updateWalletAddress(state, newWalletAddress) {
            state.walletAddress = newWalletAddress;
        },
        setCurrentColor(state, newColor:number) {
            state.currentColor = newColor;
        },
        updateColorQty(state, {colorNumber, qty}) {
            if (state.colors[colorNumber - 1] >= -qty) {
                Vue.set(state.colors, colorNumber - 1, state.colors[colorNumber - 1] + qty);
            }
        }
    },

    actions: {},

    getters: {}
};
