// @flow
import {type ToastWrongColor, type ToastZeroTilesLeft} from "../../appTypes";

export const Toast: {
    state: {
        received: number,
        payload: {toastName: string, data: ToastWrongColor|ToastZeroTilesLeft}
    }
} = {
    namespaced: true,
    state: {
        received: 0,
        payload: {}
    },
    mutations: {
        sendToast(state, payload) {
            state.received =  Date.now();
            state.payload = payload;
        }
    },

    actions: {},

    getters: {}
};
