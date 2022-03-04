// @flow
export const PlayerInfo: {
    state: {
        colors: Array<number>
    }
} = {
    namespaced: true,
    state: {
        colors: [1011, 1011, 911, 678, 891]
    },
    mutations: {
        updateColors(state, newColors) {
            state.colors = newColors;
        }
    },

    actions: {},

    getters: {}
};
