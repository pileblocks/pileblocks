import { TonClient } from "@tonclient/core";

import Vue from 'vue'

export const EverX = {
    install: function() {
        const client = new TonClient({
        network: {
            endpoints: [process.env.VUE_APP_EVER_NODE_URL]
        }
        });
        Vue.prototype.everx = client;
    }
}
