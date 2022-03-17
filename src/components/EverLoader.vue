<template>

</template>

<script>
import {Address, ProviderRpcClient} from "everscale-inpage-provider";
import {PBGameContract} from "@/contract_wrappers/PBGame"
import {HOST_ADDRESS, TOKEN_ROOT_ADDRESS} from "@/AppConst";
import {TokenRootContract} from "@/contract_wrappers/TokenRoot";
import {EverAPI} from "@/api/ever";
import {GameHostContract} from "@/contract_wrappers/GameHost";
import {GameIndexContract} from "@/contract_wrappers/GameIndex";
import type {GameInfo} from "../AppTypes";
import {_dataToNumbers} from "../utils";
//import {EverscaleStandaloneClient} from "everscale-standalone-client";

export default {
    name: "EverLoader",
    data: function () {
        return {}
    },
    methods: {
        initProvider: async function (ever): Promise<boolean> {
            let extensionWorks: boolean = false;
            extensionWorks = await EverAPI.isWorking(ever);

            if (extensionWorks) {
                await ever.ensureInitialized();
                this.$store.commit("Ever/updateApi", ever);
                try {
                    await EverAPI.initWallet(ever);
                } catch (e) {
                    extensionWorks = false;
                }
            }
            this.$store.commit("Ever/updateExtensionWorks", extensionWorks);
            return extensionWorks
        },
        initTokenRoot: function (ever) {
            const tokenRootAddress = new Address(TOKEN_ROOT_ADDRESS);
            const tokenRoot = new ever.Contract(TokenRootContract.abi, tokenRootAddress);
            this.$store.commit("Ever/updateTokenRoot", tokenRoot);
        },
        initHost: function (ever) {
            const hostAddress = new Address(HOST_ADDRESS);
            const host = new ever.Contract(GameHostContract.abi, hostAddress);
            this.$store.commit("Ever/updateHost", host);
        },
        initGame: async function (ever) {
            let host = this.$store.state.Ever.host;
            if (host !== null) {
                const currentGameId = await EverAPI.host.getCurrentGameId(host);
                const gameIndexAddress = await EverAPI.host._getIndexAddress(host, currentGameId - 1);
                const gameIndex = new ever.Contract(GameIndexContract.abi, gameIndexAddress);
                const currentGameAddress = await EverAPI.index.getGameAddress(gameIndex);
                const game = new ever.Contract(PBGameContract.abi, currentGameAddress);
                this.$store.commit("Ever/updateGame", game);
            }

        },
        setTemplate: async function () {
            let rawTemplate: Array<[number, Array<Array<number>>]> = await EverAPI.game.getTemplate(this.$store.state.Ever.game);
            let newTemplate = {};
            _dataToNumbers(rawTemplate, newTemplate);
            this.$store.commit("Game/updateTemplate", newTemplate);
        },
        setGameColors: function (renderConfig) {
            let sheet = document.createElement('style');
            for (let i = 0; i < 5; i++) {
                let color = parseInt(renderConfig[i + 4]).toString(16);
                if (i === 0)
                    sheet.innerHTML += `.color-${i + 1} {background-color: #${color} !important; color: #1e2228} `;
                else
                    sheet.innerHTML += `.color-${i + 1} {background-color: #${color} !important; color: #fefefe} `;
            }
            document.body.appendChild(sheet);
        },
        setTotalFieldFragments: function (renderConfig) {
            let totalFragments = parseInt(renderConfig[0]) * parseInt(renderConfig[1]);
            this.$store.commit('Game/updateTotalFieldFragments', totalFragments)
        },
        setRemainingTiles: function (gameInfo:GameInfo) {
            this.$store.commit("Game/updateRemainingTiles", gameInfo.remainingTiles)
        },
        setPlayerAddress: async function () {
            const playerAddress = await EverAPI.initWallet(this.$store.state.Ever.api);
            this.$store.commit("PlayerInfo/updatePlayerAddress", playerAddress);
        },
        setPlayerWallet: async function () {
            if (this.$store.state.Ever.tokenRoot !== null && this.$store.state.PlayerInfo.playerAddress !== "") {
                const wallet = await EverAPI.tokenRoot.getWallet(this.$store.state.Ever.tokenRoot, this.$store.state.PlayerInfo.playerAddress);
                this.$store.commit("PlayerInfo/updateWalletAddress", wallet);
            }
        }

    },

    async mounted() {
        const ever = new ProviderRpcClient({
            // fallback: () =>
            //     EverscaleStandaloneClient.create({
            //         connection: 'local',
            //     }),
        });

        if (!await this.initProvider(ever)) {
            this.$store.commit('Ever/toggleLoading', false);
            return
        }
        this.initTokenRoot(ever);
        this.initHost(ever);
        await this.initGame(ever);

        const gameInfo = await EverAPI.game.getGameInfo(this.$store.state.Ever.game);
        //renderSettings [VERT_FRAGMENTS, HORIZ_FRAGMENTS, TOKENS_PER_PUT, MAX_COLORS, 0xfefefe, 0xaab0bc, 0x60697b, 0x2f353a, 0x1e2228]
        await this.setTemplate();
        this.setGameColors(gameInfo.renderConfig);
        this.setTotalFieldFragments(gameInfo.renderConfig);
        this.setRemainingTiles(gameInfo);
        await this.setPlayerAddress();
        await this.setPlayerWallet();
        await this.$store.dispatch('Ever/reloadGame');
        this.$store.commit('Ever/toggleLoading', false);
    }

}
</script>

<style scoped>

</style>
