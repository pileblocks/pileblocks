// @flow
import {type NftJson} from "../../AppTypes";

export const Nft: {
    state: {
        nfts: Array<NftJson>,
    }
} = {
    namespaced: true,
    state: {
        nfts: [],
    },
    mutations: {
        updateNfts(state, newNftsArray: Array<NftJson>) {
            state.nfts = newNftsArray;
        }
    },

    actions: {},

    getters: {}
};
