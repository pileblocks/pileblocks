<template>
    <div id="bottom-menu">
        <div id="pile-colors" v-if="isBalancePositive && !isGameCompleted">
            <div v-for="item in 5" :key="item">
                <bottom-menu-color :btn-color="item"></bottom-menu-color>
            </div>
        </div>
        <div id="claim-tiles" v-if="isBalancePositive && !isGameCompleted">
            <div v-if="!tilesArePut">

                <!-- claim -->
                <button class="btn btn-menu mt-2" type="button" v-on:click="claimTiles" v-if="this.$store.state.PlayerInfo.isFarmingActive">

                    <span v-show="!isLoading && this.tempClaimableTiles === 0" class="span p-1">{{ $t('bottomMenu.claim') }}<br/>
                        <small v-if="this.$store.state.PlayerInfo.claimableTiles > 0">{{ this.$store.state.PlayerInfo.claimableTiles }}</small>
                    </span>
                    <span v-show="!isLoading && this.tempClaimableTiles > 0" class="span">{{ $t('bottomMenu.claim') }}<br/>
                        <small :class="setAnimationClass">{{ this.tempClaimableTiles }}</small>
                    </span>
                    <b-spinner small class="span button-spinner" v-show="isLoading"></b-spinner>
                    <span class="btn__border">
                        <span class="btn__border-top"></span>
                        <span class="btn__border-bot"></span>
                    </span>
                    <span class="btn__inner btn__inner-main">
                        <span class="btn__inner-shadow"></span>
                        <span class="btn__inner-rect"></span>
                    </span>
                </button>

                <!-- farming settings -->
                <button class="btn btn-menu" type="button" v-if="this.$store.state.PlayerInfo.isFarmingActive" v-on:click="showFarmingSettings">
                    <img src="~@/assets/icon-farming-settings.svg" alt="Farming Settings"/>
                    <span class="btn__border">
                        <span class="btn__border-top"></span>
                        <span class="btn__border-bot"></span>
                    </span>
                    <span class="btn__inner btn__inner-main">
                        <span class="btn__inner-shadow"></span>
                        <span class="btn__inner-rect"></span>
                    </span>
                </button>

                <!-- join -->
                <button class="btn btn-menu" type="button" v-on:click="joinGame" v-if="!this.$store.state.PlayerInfo.isFarmingActive">
                    <span class="span p-2" v-show="!isLoading">{{ $t('bottomMenu.join') }}</span>
                    <b-spinner small class="span button-spinner" v-show="isLoading"></b-spinner>
                    <span class="btn__border">
                        <span class="btn__border-top"></span>
                        <span class="btn__border-bot"></span>
                    </span>
                    <span class="btn__inner btn__inner-main">
                        <span class="btn__inner-shadow"></span>
                        <span class="btn__inner-rect"></span>
                    </span>
                </button>

            </div>
            <div v-if="tilesArePut && !isMainScreen" class="d-flex flex-column mt-1">

                <!-- put -->
                <button class="btn btn-menu" type="button" v-on:click="putTiles">
                    <span v-show="!isLoading" class="span">{{ $t('bottomMenu.put') }}<small>{{ this.$store.state.Game.tilesToPut.length }}</small></span>
                    <b-spinner small class="span button-spinner" v-show="isLoading"></b-spinner>
                    <span class="btn__border">
                        <span class="btn__border-top"></span>
                        <span class="btn__border-bot"></span>
                    </span>
                    <span class="btn__inner btn__inner-main">
                        <span class="btn__inner-shadow"></span>
                        <span class="btn__inner-rect"></span>
                    </span>
                </button>


				<!-- cancel -->
                <button class="btn btn-menu" type="button" v-on:click="cancelPut" v-show="!isLoading">
                    <span v-show="!isLoading" class="span">{{ $t('bottomMenu.cancel') }}</span>

                    <span class="btn__border">
                        <span class="btn__border-top"></span>
                        <span class="btn__border-bot"></span>
                    </span>
                    <span class="btn__inner btn__inner-danger">
                        <span class="btn__inner-shadow"></span>
                    </span>
                </button>


            </div>
        </div>
        <div v-if="isGameCompleted" class="claim-reward">

                <!-- farming settings -->
                <button class="btn btn-menu" type="button" v-if="this.$store.state.PlayerInfo.isFarmingActive" v-on:click="showFarmingSettings">
                    <img src="~@/assets/icon-farming-settings.svg" alt="Farming Settings"/>
                    <span class="btn__border">
                        <span class="btn__border-top"></span>
                        <span class="btn__border-bot"></span>
                    </span>
                    <span class="btn__inner btn__inner-main">
                        <span class="btn__inner-shadow"></span>
                        <span class="btn__inner-rect"></span>
                    </span>
                </button>

        </div>
        <b-modal id="farming-settings" hide-footer :title="$t('bottomMenu.farmingSettings.title')">
            <template #modal-header-close>
                <img src="~@/assets/popup-close-button.svg"/>
            </template>
            <p>{{ $t('bottomMenu.farmingSettings.p1') }}</p>

            <p>{{ $t('bottomMenu.farmingSettings.p2') }}<b>{{ this.$store.state.PlayerInfo.balance | fixed }}</b> PILE</p>
            <p>{{ $t('bottomMenu.farmingSettings.p3') }}<b>{{ this.$store.state.PlayerInfo.farmingBalance | fixed }}</b> PILE <span class="pr-1" v-on:click="releaseFarming"><i class="bi bi-x-circle-fill btn-reject"></i></span></p>
            <p>{{ $t('bottomMenu.farmingSettings.p4') }}</p>
            <b-input-group size="sm">
                <b-form-input v-model="tokensToAdd" :placeholder="$t('bottomMenu.farmingSettings.placeholderBalance')" size="sm" :state="validateAddBalance()"></b-form-input>
            </b-input-group>

            <b-form-invalid-feedback :state="validateAddBalance()">
                <span>{{ $t('bottomMenu.farmingSettings.error') }}</span>
            </b-form-invalid-feedback>

            <p>{{ $t('bottomMenu.farmingSettings.youGet') }}<br/> <b>{{ farmingEstimation }}</b> {{ $t('bottomMenu.farmingSettings.tileMin') }}</p>
            <div class="d-flex justify-content-end">

                <!--
                <b-button v-on:click="putFarming" :disabled="isNaN(tokensToAdd) || tokensToAdd.length === 0 || tokensToAdd === 0">{{ $t('bottomMenu.farmingSettings.addToFarming') }}</b-button>
                -->
                <button class="btn btn-menu" type="button" v-on:click="putFarming" :disabled="isNaN(tokensToAdd) || tokensToAdd.length === 0 || tokensToAdd === 0">
                    <span class="span p-2">{{ $t('bottomMenu.farmingSettings.addToFarming') }}</span>
                    <span class="btn__border">
                        <span class="btn__border-top"></span>
                        <span class="btn__border-bot"></span>
                    </span>
                    <span class="btn__inner btn__inner-main">
                        <span class="btn__inner-shadow"></span>
                        <span class="btn__inner-rect"></span>
                    </span>
                </button>


            </div>
        </b-modal>
    </div>
</template>

<script lang="js">
// @flow
import BottomMenuColor from "./BottomMenuColor";
import {GAME_STATUS_COMPLETED} from "@/AppConst";

export default {
    name: "BottomMenu",
    components: {BottomMenuColor},
    data: function() {
        return {
            tokensToAdd: 0,
            tempClaimableTiles: 0,
            setAnimationClass: ""
        }
    },
    methods: {
        setActiveColor: function(newColor:number):void {
            this.$store.commit('PlayerInfo/setCurrentColor', newColor);
        },
        setActive: function(btnColor:number):string {
            return btnColor===this.$store.state.PlayerInfo.currentColor ? "primary" : "secondary";
        },
        cancelPut: async function() {
            await this.$store.dispatch('Ever/reloadGame');
        },
        joinGame: async function() {
            try {
                this.$store.commit('Ever/isOpInProgress', true);
                await this.$store.dispatch('Ever/joinGame');
            } catch(e) {
                this.$store.commit('Ever/isOpInProgress', false);
                this.errorHandler(e);
                console.log(e);
            }

        },
        claimTiles: async function() {
            if (this.$store.state.PlayerInfo.claimableTiles === 0) {
                this.$store.commit('Toast/sendToast', {
                    toastName: "zero-claim"
                });
                return;
            }

            try {
                this.$store.commit('Ever/isOpInProgress', true);
                await this.$store.dispatch('Ever/claimTiles');
            } catch(e) {
                this.$store.commit('Ever/isOpInProgress', false);
                this.errorHandler(e);
                console.log(e);
            }
        },
        putTiles: async function() {

            if (this.$store.state.PlayerInfo.balance < this.$store.state.Game.payPerMove) {
                this.$store.commit('Toast/sendToast', {
                    toastName: "not-enough-pile-to-put",
                    data: {payPerMove: this.$store.state.Game.payPerMove, balance: this.$store.state.PlayerInfo.balance}
                });
                return;
            }

            try {
                this.$store.commit('Ever/isOpInProgress', true);
                await this.$store.dispatch('Ever/putTiles');
            } catch(e) {
                this.$store.commit('Ever/isOpInProgress', false);
                this.errorHandler(e);
                console.log(e);
            }

        },

        putFarming: async function() {
            try {
                this.$store.commit('Ever/isOpInProgress', true);
                await this.$store.dispatch('Ever/putFarmingTiles', this.tokensToAdd * 1e9);
                this.tokensToAdd = 0;
                await this.$store.dispatch('Ever/getLockedInFarming');
                await this.$store.dispatch('Ever/updateFarmingEstimation', {time: 60, balance: (parseInt(this.tokensToAdd) + this.$store.state.PlayerInfo.farmingBalance) * 1e9 });
            } catch(e) {
                this.$store.commit('Ever/isOpInProgress', false);
                this.errorHandler(e);
                console.log(e);
            }
        },

        releaseFarming: async function() {
            try {
                this.$store.commit('Ever/isOpInProgress', true);
                await this.$store.dispatch('Ever/releaseFarmingTiles', {playerAddress: this.$store.state.PlayerInfo.playerAddress,
                    tokensToRelease: this.$store.state.PlayerInfo.farmingBalance * 1e9});
                await this.$store.dispatch('Ever/getLockedInFarming');
                await this.$store.dispatch('Ever/updateFarmingEstimation', {time: 60, balance: (parseInt(this.tokensToAdd) + this.$store.state.PlayerInfo.farmingBalance) * 1e9 });
            } catch(e) {
                this.$store.commit('Ever/isOpInProgress', false);
                this.errorHandler(e);
                console.log(e);
            }
        },

        claimReward: async function() {

            try {
                this.$store.commit('Ever/isOpInProgress', true);
                await this.$store.dispatch('Ever/claimReward');
            } catch(e) {
                this.$store.commit('Ever/isOpInProgress', false);
                this.errorHandler(e);
                console.log(e);
            }
        },
        errorHandler: function (e) {
            if ('code' in e && e.code === 0) {
                this.$store.commit('Toast/sendToast', {
                    toastName: "message-expired"
                });
            }
        },

        validateAddBalance: function () {
            return (parseInt(this.tokensToAdd) >= 0 && parseInt(this.tokensToAdd) + 1 <=  this.$store.state.PlayerInfo.balance);
        },

        showFarmingSettings: function () {
            this.$bvModal.show('farming-settings');
            this.$store.dispatch('Ever/updateFarmingEstimation', {time: 60, balance: (parseInt(this.tokensToAdd) + this.$store.state.PlayerInfo.farmingBalance) * 1e9 });
        }

    },

    watch: {
        claimableTilesWatcher: async function (newReward, oldReward) {

				if (newReward > oldReward + 10) {
					this.tempClaimableTiles = newReward;
					return
				}

                this.setAnimationClass += "font-weight-bold ";
                setTimeout(() => {
                    this.setAnimationClass = "";
                }, 900)

                let sleep = duration => new Promise(resolve => setTimeout(resolve, duration));
                let changeValue = value => new Promise(resolve => {this.tempClaimableTiles = value; resolve(value)});

                let chain = changeValue(oldReward);

                for (let i=oldReward; i<= newReward; i++) {
                    chain = chain.then(()=>changeValue(i)).then(()=>sleep(50))
                }
                await chain;
        },

        tokensToAdd: async function (newValue) {
            if (parseInt(newValue) >= 0 && parseInt(newValue) + this.$store.state.PlayerInfo.farmingBalance > 0) {
                await this.$store.dispatch('Ever/updateFarmingEstimation', {time: 60, balance: (parseInt(this.tokensToAdd) + this.$store.state.PlayerInfo.farmingBalance) * 1e9 });
            }
        },
    },

    computed: {

        claimableTilesWatcher: function(): number {
            return this.$store.state.PlayerInfo.claimableTiles;
        },

        farmingEstimation: function(): number {
            return this.$store.state.PlayerInfo.farmingEstimation;
        },

        farmingBalanceWatcher: function(): number {
            return this.$store.state.PlayerInfo.farmingBalance;
        },

        tilesArePut: function (): boolean {
            return this.$store.state.Game.tilesToPut.length > 0;
        },
        isMainScreen: function(): boolean {
            return this.$store.state.Game.isMainScreen;
        },
        isBalancePositive: function(): boolean {
            return this.$store.state.PlayerInfo.balance > 0;
        },
        isGameCompleted: function(): boolean {
            return this.$store.state.Game.status === GAME_STATUS_COMPLETED;
        },
        isReceived: function(): boolean {
            return this.$store.getters["Game/isReceivedReward"];
        },
        isLoading: function(): boolean {
            return this.$store.state.Ever.operationInProgress;
        },
        isInRoaster: function(): boolean {
            return this.$store.getters["Game/isInRoaster"];
        }
    }
}
</script>

<style scoped>
.claim-reward {
    display: flex;
    grid-row: 1;
    grid-column: 1 / 3;
    align-items: center;
    justify-content: center;
}
</style>
