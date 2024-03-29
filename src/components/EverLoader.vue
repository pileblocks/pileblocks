<template>
    <div></div>
</template>

<script lang="js">
// @flow
import {Address, ProviderRpcClient} from "everscale-inpage-provider";
import {PBGameContract} from "@/contract_wrappers/PBGame"
import {
    LOADING_STATUS_EMPTY_GAME_LIST, LOADING_STATUS_GAME_PENDING,
    LOADING_STATUS_NO_PERMISSIONS,
    LOADING_STATUS_PROVIDER_LOADED, LOADING_STATUS_PROVIDER_NOT_LOADED
} from "@/AppConst";
import {TokenRootContract} from "@/contract_wrappers/TokenRoot";
import {FarmingWalletContract} from "@/contract_wrappers/FarmingWallet";
import {EverAPI} from "@/api/ever";
import {GameHostContract} from "@/contract_wrappers/GameHost";
import {GameIndexContract} from "@/contract_wrappers/GameIndex";
import type {GameEvent, OperationCompleted, GameInfo, GameExtraSettings, GameBattle} from "@/AppTypes";
import {_dataToNumbers} from "@/utils";

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
            const tokenRootAddress = new Address(process.env.VUE_APP_TOKEN_ROOT_ADDRESS);
            const tokenRoot = new ever.Contract(TokenRootContract.abi, tokenRootAddress);
            this.$store.commit("Ever/updateTokenRoot", tokenRoot);
        },
        initHost: function (ever) {
            const hostAddress = new Address(process.env.VUE_APP_HOST_ADDRESS);
            const host = new ever.Contract(GameHostContract.abi, hostAddress);
            this.$store.commit("Ever/updateHost", host);
        },
        initGame: async function (ever) {

            let host = this.$store.state.Ever.host;
            let updateLastGameId = parseInt(await EverAPI.host.getCurrentGameId(host)) - 1;
            this.$store.commit("Game/updateLastGameId", updateLastGameId);

            if (host !== null) {
                let currentGameId = 0;
                if (this.$route.name === "Game") {
                    currentGameId =parseInt(this.$route.params.id) + 1;
                } else {
                    currentGameId = await EverAPI.host.getCurrentGameId(host);
                }
                const gameIndexAddress = await EverAPI.host._getIndexAddress(host, currentGameId - 1);

                if (! await EverAPI.isActiveContract(ever, gameIndexAddress)) {
                    return false;
                }

                const gameIndex = new ever.Contract(GameIndexContract.abi, gameIndexAddress);

                const currentGameAddress = await EverAPI.index.getGameAddress(gameIndex);
                console.log(`Game address: ${currentGameAddress}`);
                const game = new ever.Contract(PBGameContract.abi, currentGameAddress);
                this.$store.commit("Ever/updateGame", game);

            }
            return true;
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
                              case "GameBattleEvent":
                                  await this.gameBattleHandler(trEvent.data);
                                  break;
                          }
                      }
                  }
              });

            const farmingContract = new ever.Contract(FarmingWalletContract.abi, this.$store.state.PlayerInfo.farmingAddress);
            subscription
              .transactions(this.$store.state.PlayerInfo.farmingAddress)
              .on(async (data) => {
                  for (const tr of data.transactions) {
                      const transactionEvents = await farmingContract.decodeTransactionEvents({
                          transaction: tr
                      })
                      for (const trEvent:GameEvent of transactionEvents) {
                          switch (trEvent.event) {
                              case "OperationCompleted":
                                  await this.operationCompletedHandler(trEvent.data);
                                  break;
                          }
                      }
                  }
              });

        },

        gameBattleHandler: async function(op: GameBattle) {

            switch (op.name) {
                case "starClaimed":
                    if (op.player.toString() === this.$store.state.PlayerInfo.playerAddress) {
                        this.$store.commit('Toast/sendToast', {
                            toastName: "star-claimed",
                            data: {pointsGained: op.value}
                        });
                    }
                    break;
            }
        },

        operationCompletedHandler: async function (op: OperationCompleted) {
            if (op.player.toString() === this.$store.state.PlayerInfo.playerAddress) {
                await this.$store.dispatch('Ever/reloadGame');
                await this.$store.dispatch('Ever/reloadNft', this.everx);
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
                    case "nftApplied":
                        this.$store.commit('Toast/sendToast', {
                            toastName: "on-nft-applied",
                            data: {nftType: parseInt(op.value)}
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

            function calcLight(r, g, b) {
                return (Math.min(r, g, b) + Math.max(r, g, b)) / (2*255)
            }

            let sheet = document.createElement('style');
            //renderConfig = [0, 0, 0, 0, '16777215', '16050112', '9693951', '12624775', '31942'];
            for (let i = 0; i < 5; i++) {
                let intColor = parseInt(renderConfig[i + 4]);
                let color = intColor.toString(16).padStart(6, '0');
                let r = intColor >> 16 & 255;
                let g = intColor >> 8 & 255;
                let b = intColor >> 0 & 255;
                if (calcLight(r, g, b) > 0.5)
                    sheet.innerHTML += `.color-${i + 1} {background-color: #${color} !important; color: #1e2228} `;
                else
                    sheet.innerHTML += `.color-${i + 1} {background-color: #${color} !important; color: #fefefe} `;
            }
            document.body.appendChild(sheet);
        },

        setGameName: function(gameInfo:GameInfo) {
            this.$store.commit("Game/updateName", gameInfo.gameName);
        },

        setGameId: function(gameInfo:GameInfo) {
            this.$store.commit("Game/updateId", parseInt(gameInfo.gameId));
        },

        setGameInitConfig: function(gameInfo:GameInfo) {
            this.$store.commit("Game/updateInitConfig", {payPerMove: parseInt(gameInfo.renderConfig[2])});
        },
        setRewardPerGame: async function () {
            let totalReward: number = this.$store.state.Game.totalFieldFragments
                * 128
                * this.$store.state.Game.payPerMove
                * this.$store.state.Game.extraSettings.percentOfReward
                / 100
                / 50;
            this.$store.commit("Game/updateTotalReward", {totalReward: totalReward})
        },

        setTotalFieldFragments: function (renderConfig) {
            let totalFragments = parseInt(renderConfig[0]) * parseInt(renderConfig[1]);
            this.$store.commit('Game/updateTotalFieldFragments', totalFragments)
            this.$store.commit('Game/updateColumns', parseInt(renderConfig[1]));
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
        setFarmingWallet: async function () {
            if (this.$store.state.Ever.tokenRoot !== null && this.$store.state.PlayerInfo.playerAddress !== "") {
                const farmingAddress = (await EverAPI.game.getFarmingAddress(this.$store.state.Ever.game, this.$store.state.PlayerInfo.playerAddress)).toString();
                const wallet = new this.$store.state.Ever.api.Contract(FarmingWalletContract.abi, farmingAddress);
                this.$store.commit("PlayerInfo/updateFarmingAddress", farmingAddress);
                this.$store.commit("PlayerInfo/updateFarmingContract", wallet);
            }
        },

        setGameStartTime: function(gameInfo:GameInfo) {
            this.$store.commit("Game/updateGameStartTime", parseInt(gameInfo.gameStartTime));
            return parseInt(gameInfo.gameStartTime);
        },

        setExtraSettings: async function () {
            let settings: GameExtraSettings = await EverAPI.game.getGameExtraSettings(this.$store.state.Ever.game);
            this.$store.commit("Game/updateExtraSettings", settings);
        },

    },

    async mounted() {
        const ever = new ProviderRpcClient({ });
        if (await this.initProvider(ever) in [LOADING_STATUS_PROVIDER_NOT_LOADED, LOADING_STATUS_NO_PERMISSIONS]) {
            this.$store.commit('Ever/toggleLoading', false);
            return;
        }
        this.initTokenRoot(ever);
        this.initHost(ever);
        if (!await this.initGame(ever)) {
            this.$store.commit('Ever/updateLoadingStatus', LOADING_STATUS_EMPTY_GAME_LIST);
            this.$store.commit('Ever/toggleLoading', false);
            return;
        }

        const gameInfo = await EverAPI.game.getGameInfo(this.$store.state.Ever.game);

        this.setGameId(gameInfo);

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
        await this.setExtraSettings();

        await this.setRewardPerGame();
        await this.setPlayerAddress();
        await this.setPlayerWallet();
        await this.setFarmingWallet();
        await this.$store.dispatch('Ever/checkFarmingWalletActive');

        await this.initSubscription(ever);

        let sleep = duration => new Promise(resolve => setTimeout(resolve, duration))
        let poll = (promiseFn, duration) => promiseFn().then(
             sleep(duration).then(() => poll(promiseFn, duration)))

        poll(() => new Promise( () => {
            if (this.$store.state.PlayerInfo.isFarmingActive && !this.$store.state.Ever.operationInProgress && this.$store.state.PlayerInfo.farmingBalance > 0) {
                this.$store.dispatch('Ever/setClaimTiles');
            }
            if (this.$store.state.PlayerInfo.farmingBalance === 0) {
                this.$store.commit('PlayerInfo/updateClaimableTiles', 0);
            }

        }), 5000)

        await this.$store.dispatch('Ever/reloadGame');
        this.$store.commit('Ever/toggleLoading', false);
    }

}
</script>

<style scoped>

</style>
