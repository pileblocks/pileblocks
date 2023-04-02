import Vue from 'vue'
import Vuex from 'vuex'
import {Game} from "@/store/modules/Game";
import {PlayerInfo} from "@/store/modules/PlayerInfo";
import {Toast} from "@/store/modules/Toast";
import {Ever} from "@/store/modules/Ever";
import {Nft} from "@/store/modules/Nft";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        Game, PlayerInfo, Toast, Ever, Nft
    }
})
