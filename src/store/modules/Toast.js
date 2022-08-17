// @flow
import {type NotificationMessage, type NotificationObj} from "../../AppTypes";

export const Toast: {
    state: {
        messages: Array<NotificationObj>,
        messagesNumber: number
    }
} = {
    namespaced: true,
    state: {
        messages: [],
        messagesNumber: 0,
        hasNewItems: false
    },
    mutations: {
        sendToast(state, payload: NotificationMessage) {
            state.messages.push({received: Date.now(), payload: payload});
            state.messagesNumber += 1;
            state.hasNewItems = true;
            if (state.messagesNumber > 5) {
                state.messages.splice(0, 1);
                state.messagesNumber -= 1;
            }
        },
        readAll(state) {
            state.hasNewItems = false;
        },
        clearAll(state) {
            state.messages = [];
            state.messagesNumber = 0;
        }
    },

    actions: {},

    getters: {}
};
