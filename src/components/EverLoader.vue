<template>
    <div></div>
</template>

<script lang="js">
// @flow
import {Address, ProviderRpcClient} from "everscale-inpage-provider";
import {PBGameContract} from "@/contract_wrappers/PBGame"
import {
    HOST_ADDRESS, LOADING_STATUS_GAME_PENDING,
    LOADING_STATUS_NO_PERMISSIONS,
    LOADING_STATUS_PROVIDER_LOADED, LOADING_STATUS_PROVIDER_NOT_LOADED,
    TOKEN_ROOT_ADDRESS
} from "@/AppConst";
import {TokenRootContract} from "@/contract_wrappers/TokenRoot";
import {EverAPI} from "@/api/ever";
import {GameHostContract} from "@/contract_wrappers/GameHost";
import {GameIndexContract} from "@/contract_wrappers/GameIndex";
import type {GameEvent, OperationCompleted, GameInfo} from "@/AppTypes";
import {_dataToNumbers} from "@/utils";
//import {EverscaleStandaloneClient} from "everscale-standalone-client";

export default {
    name: "EverLoader",
    data: function () {
        return {}
    },
    methods: {
        initProvider: async function (ever): Promise<number> {

            let loadingStatus: number = await EverAPI.isWorking(ever);

            if (loadingStatus === LOADING_STATUS_PROVIDER_LOADED) {
                await ever.ensureInitialized();
                this.$store.commit("Ever/updateApi", ever);
                try {
                    await EverAPI.initWallet(ever);
                } catch (e) {
                    loadingStatus = LOADING_STATUS_NO_PERMISSIONS;
                }
            }
            this.$store.commit("Ever/updateLoadingStatus", loadingStatus);
            return loadingStatus
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
                let currentGameId = 0;
                if (this.$route.name === "Game") {
                    currentGameId =parseInt(this.$route.params.id) + 1;
                } else {
                    currentGameId = await EverAPI.host.getCurrentGameId(host);
                    if (!await EverAPI.host.isNextGameEmpty(host)) {
                        currentGameId -= 1;
                    }
                }
                const gameIndexAddress = await EverAPI.host._getIndexAddress(host, currentGameId - 1);
                const gameIndex = new ever.Contract(GameIndexContract.abi, gameIndexAddress);
                const currentGameAddress = await EverAPI.index.getGameAddress(gameIndex);
                console.log(`Game address: ${currentGameAddress}`);
                const game = new ever.Contract(PBGameContract.abi, currentGameAddress);
                this.$store.commit("Ever/updateGame", game);

            }

        },
        initSubscription: async function(ever) {
            const subscription = new ever.Subscriber();

            subscription
              .transactions(this.$store.state.Ever.game.address)
              .on(async (data) => {
                  for (const tr of data.transactions) {
                      const transactionEvents = await this.$store.state.Ever.game.decodeTransactionEvents({
                          transaction: tr
                      })
                      for (const trEvent:GameEvent of transactionEvents) {
                          switch (trEvent.event) {
                              case "OperationCompleted":
                                  await this.operationCompletedHandler(trEvent.data);
                                  break;
                              case "RewardsCalculated":
                                  await this.rewardsCalculatedHandler();
                                  break;
                          }
                      }
                  }
              });
        },

        operationCompletedHandler: async function (op: OperationCompleted) {
            if (op.player.toString() === this.$store.state.PlayerInfo.playerAddress) {
                await this.$store.dispatch('Ever/reloadGame');
                this.$store.commit('Ever/isOpInProgress', false);
            } else {
                switch (op.name) {
                    case "onClaimTiles":
                        this.$store.commit('Toast/sendToast', {
                            toastName: "on-claim-tiles",
                            data: {claimValue: op.value}
                        });
                        break;
                    case "onAcceptTokensTransfer":
                        this.$store.commit('Toast/sendToast', {
                            toastName: "on-put-tiles",
                            data: {putValue: op.value}
                        });
                        break;
                }
            }
        },

        rewardsCalculatedHandler: async function () {
            await this.$store.dispatch('Ever/reloadGame');
            this.$store.commit('Ever/isOpInProgress', false);
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
                let color = parseInt(renderConfig[i + 4]).toString(16).padStart(6, '0');
                if (i === 0)
                    sheet.innerHTML += `.color-${i + 1} {background-color: #${color} !important; color: #1e2228} `;
                else
                    sheet.innerHTML += `.color-${i + 1} {background-color: #${color} !important; color: #fefefe} `;
            }
            document.body.appendChild(sheet);
        },
        setGameName: function(gameInfo:GameInfo) {
            this.$store.commit("Game/updateName", gameInfo.gameName);
        },
        setGameInitConfig: function(gameInfo:GameInfo) {
            this.$store.commit("Game/updateInitConfig", {payPerMove: parseInt(gameInfo.renderConfig[2])});
        },
        setRewardPerGame: async function () {
            let totalReward: number = await EverAPI.host.getRewardPerGame(this.$store.state.Ever.host);
            let totalRewardDynamic: number = totalReward * 85 / 100;
            this.$store.commit("Game/updateTotalReward", {totalReward: totalReward, totalRewardDynamic: totalRewardDynamic})
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
        },
        setGameStartTime: function(gameInfo:GameInfo) {
            this.$store.commit("Game/updateGameStartTime", parseInt(gameInfo.gameStartTime));
            return parseInt(gameInfo.gameStartTime);
        }

    },

    async mounted() {
        const ever = new ProviderRpcClient({
            // fallback: () =>
            //     EverscaleStandaloneClient.create({
            //         connection: 'local',
            //     }),
        });

        if (await this.initProvider(ever) in [LOADING_STATUS_PROVIDER_NOT_LOADED, LOADING_STATUS_NO_PERMISSIONS]) {
            this.$store.commit('Ever/toggleLoading', false);
            return;
        }
        this.initTokenRoot(ever);
        this.initHost(ever);
        await this.initGame(ever);
        await this.initSubscription(ever);

        const gameInfo = await EverAPI.game.getGameInfo(this.$store.state.Ever.game);

        if (this.setGameStartTime(gameInfo) > new Date().getTime() / 1000) {
            this.$store.commit('Ever/updateLoadingStatus', LOADING_STATUS_GAME_PENDING);
            this.$store.commit('Ever/toggleLoading', false);
            return;
        }

        //renderSettings [VERT_FRAGMENTS, HORIZ_FRAGMENTS, TOKENS_PER_PUT, MAX_COLORS, 0xfefefe, 0xaab0bc, 0x60697b, 0x2f353a, 0x1e2228]
        await this.setTemplate();
        this.setGameColors(gameInfo.renderConfig);
        this.setTotalFieldFragments(gameInfo.renderConfig);
        this.setRemainingTiles(gameInfo);
        this.setGameName(gameInfo);
        this.setGameInitConfig(gameInfo);
        await this.setRewardPerGame();
        await this.setPlayerAddress();
        await this.setPlayerWallet();
        await this.$store.dispatch('Ever/reloadGame');
        this.$store.commit('Ever/toggleLoading', false);
    }

}
</script>

<style scoped>

</style>
