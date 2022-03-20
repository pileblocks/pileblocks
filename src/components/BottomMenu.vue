<template>
    <div id="bottom-menu">
        <div id="pile-colors" v-if="isBalancePositive && !isGameCompleted">
            <div v-for="item in 5" :key="item">
                <bottom-menu-color :btn-color="item"></bottom-menu-color>
            </div>
        </div>
        <div id="claim-tiles" v-if="isBalancePositive && !isGameCompleted">
            <div v-if="!tilesArePut">
                <b-button size="lg" variant="primary" v-on:click="claimTiles">
                    <span v-show="!isLoading">Claim <small>{{ this.$store.state.PlayerInfo.claimableTiles }}</small></span>
                    <b-spinner v-show="isLoading"></b-spinner>
                </b-button>
            </div>
            <div v-if="tilesArePut && !isMainScreen" class="d-flex flex-column mt-1">
                <b-button size="lg" variant="primary" v-on:click="putTiles">
                    <span v-show="!isLoading">Put <small>{{ this.$store.state.Game.tilesToPut.length }}</small></span>
                    <b-spinner v-show="isLoading"></b-spinner>
                </b-button>
                <b-button size="sm" variant="secondary" class="mt-1" v-on:click="cancelPut">Cancel <i class="bi bi-x-circle"></i></b-button>
            </div>
        </div>
        <div v-if="isGameCompleted" class="claim-reward">
                <b-button size="lg" variant="primary" v-on:click="claimReward" v-show="!isReceived">
                    <span v-show="!isLoading">Get Reward <small>{{ this.$store.getters["Game/getReward"] | fixed }}</small></span>
                    <b-spinner v-show="isLoading"></b-spinner>
                </b-button>
        </div>
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
            isLoading: false
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
        claimTiles: async function() {
            if (this.$store.state.PlayerInfo.claimableTiles === 0) {
                this.$store.commit('Toast/sendToast', {
                    toastName: "zero-claim"
                });
                //return;
            }

            this.isLoading = true;
            try {
                await this.$store.dispatch('Ever/claimTiles');
                await this.$store.dispatch('Ever/reloadGame');
            } catch(e) {
                console.log(e);
            }
            this.isLoading = false;
        },
        putTiles: async function() {

            if (this.$store.state.PlayerInfo.balance < this.$store.state.Game.payPerMove) {
                this.$store.commit('Toast/sendToast', {
                    toastName: "not-enough-pile-to-put",
                    data: {payPerMove: this.$store.state.Game.payPerMove, balance: this.$store.state.PlayerInfo.balance}
                });
                return;
            }

            this.isLoading = true;
            try {
                await this.$store.dispatch('Ever/putTiles');
                await this.$store.dispatch('Ever/reloadGame');
            } catch(e) {
                console.log(e);
            }
            this.isLoading = false;
        },
        claimReward: async function() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('Ever/claimReward');
                await this.$store.dispatch('Ever/reloadGame');
            } catch(e) {
                console.log(e);
            }
            this.isLoading = false;
        }
    },
    computed: {
        tilesArePut: function (): boolean {
            return this.$store.state.Game.tilesToPut.length > 0;
        },
        isMainScreen: function(): boolean {
            return this.$store.state.Game.isMainScreen;
        },
        isBalancePositive: function():boolean {
            return this.$store.state.PlayerInfo.balance > 0;
        },
        isGameCompleted: function():boolean {
            return this.$store.state.Game.status === GAME_STATUS_COMPLETED;
        },
        isReceived: function():boolean {
            return this.$store.getters["Game/isReceivedReward"]
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
