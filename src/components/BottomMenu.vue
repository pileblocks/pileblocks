<template>
    <div id="bottom-menu">
        <div id="pile-colors" v-if="isBalancePositive && !isGameCompleted">
            <div v-for="item in 5" :key="item">
                <bottom-menu-color :btn-color="item"></bottom-menu-color>
            </div>
        </div>
        <div id="claim-tiles" v-if="isBalancePositive && !isGameCompleted">
            <div v-if="!tilesArePut">
                <b-button size="sm" variant="secondary" class="mr-2 color-primary" v-if="this.$store.state.PlayerInfo.isFarmingActive" v-on:click="$bvModal.show('farming-settings')">
                    <i class="bi bi-gear-fill"></i>
                </b-button>
                <b-button size=md variant="primary" v-on:click="claimTiles" v-if="this.$store.state.PlayerInfo.isFarmingActive">

                    <span v-show="!isLoading && this.tempClaimableTiles === 0">Claim<br/>
                        <small v-if="this.$store.state.PlayerInfo.claimableTiles > 0">{{ this.$store.state.PlayerInfo.claimableTiles }}</small>
                    </span>
                    <span v-show="!isLoading && this.tempClaimableTiles > 0">Claim<br/>
                        <small :class="setAnimationClass">{{ this.tempClaimableTiles }}</small>
                    </span>
                    <b-spinner v-show="isLoading"></b-spinner>
                </b-button>
                <b-button size="lg" variant="primary" v-on:click="joinGame" v-if="!this.$store.state.PlayerInfo.isFarmingActive">
                    <span v-show="!isLoading">Join</span>
                    <b-spinner v-show="isLoading"></b-spinner>
                </b-button>
            </div>
            <div v-if="tilesArePut && !isMainScreen" class="d-flex flex-column mt-1">
                <b-button size="lg" variant="primary" v-on:click="putTiles">
                    <span v-show="!isLoading">Put <small>{{ this.$store.state.Game.tilesToPut.length }}</small></span>
                    <b-spinner v-show="isLoading"></b-spinner>
                </b-button>
                <b-button size="sm" variant="secondary" class="mt-1" v-on:click="cancelPut" v-show="!isLoading">Cancel <i class="bi bi-x-circle"></i></b-button>
            </div>
        </div>
        <div v-if="isGameCompleted" class="claim-reward">

                <b-button size="sm" variant="secondary" class="mr-2 color-primary" v-if="this.$store.state.PlayerInfo.isFarmingActive" v-on:click="$bvModal.show('farming-settings')">
                    <i class="bi bi-gear-fill"></i>
                </b-button>

                <b-button size="lg" variant="primary" v-on:click="claimReward" v-show="!isReceived & isInRoaster">
                    <span v-show="!isLoading">Get Reward <small>{{ this.$store.getters["Game/getReward"] | fixed }}</small></span>
                    <b-spinner v-show="isLoading"></b-spinner>
                </b-button>
        </div>
        <b-modal id="farming-settings" hide-footer title="Farming Settings">
            <p>Add PILE from your balance to farming. In return, you will start receiving tiles. The more PILE you lock, the more tiles you receive. You can always release tokens from farming by clicking the (x) icon.</p>

            <p>Current balance: <b>{{ this.$store.state.PlayerInfo.balance | fixed }}</b> PILE</p>
            <p>In farming: <b>{{ this.$store.state.PlayerInfo.farmingBalance | fixed }}</b> PILE <span class="pr-1" v-on:click="releaseFarming"><i class="bi bi-x-circle-fill"></i></span></p>
            <p>Add this amount of PILE to farming:</p>
            <b-input-group size="sm">
                <b-form-input v-model="tokensToAdd" placeholder="Your balance" size="sm" :state="validateAddBalance()"></b-form-input>
            </b-input-group>

            <b-form-invalid-feedback :state="validateAddBalance()">
            The farming value should be less than your balance value.
            </b-form-invalid-feedback>

            <p>Then you'll farm approximately:<br/> <b>{{ calcFarming() }}</b> tiles/minute.</p>
            <div class="d-flex justify-content-end">
            <b-button v-on:click="putFarming" :disabled="isNaN(tokensToAdd) || tokensToAdd.length === 0 || tokensToAdd === 0">Add to Farming</b-button>
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
                await this.$store.dispatch('Ever/updateFarmingEstimation', {time: 60, balance: (parseInt(this.tokensToAdd) + this.$store.state.PlayerInfo.farmingBalance) * 1e9 })
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
            return (parseInt(this.tokensToAdd) >= 0 && parseInt(this.tokensToAdd) <=  this.$store.state.PlayerInfo.balance);
        },

        calcFarming: function() {
            if (parseInt(this.tokensToAdd) + this.$store.state.PlayerInfo.farmingBalance > 0) {
                this.$store.dispatch('Ever/updateFarmingEstimation', {time: 60, balance: (parseInt(this.tokensToAdd) + this.$store.state.PlayerInfo.farmingBalance) * 1e9 });
                return this.$store.state.PlayerInfo.farmingEstimation;
            }
            return 0;
        }

    },

    watch: {
        claimableTilesWatcher: async function (newReward, oldReward) {
                this.setAnimationClass += "font-weight-bold ";
                setTimeout(() => {
                    this.setAnimationClass = "";
                }, 900)

                let sleep = duration => new Promise(resolve => setTimeout(resolve, duration));
                let changeValue = value => new Promise(resolve => {this.tempClaimableTiles = value; resolve(value)});

                let chain = changeValue(oldReward);

                for (let i=oldReward; i< newReward; i++) {
                    chain = chain.then(()=>changeValue(i)).then(()=>sleep(50))
                }
                await chain;
        }
    },

    computed: {

        claimableTilesWatcher: function(): number {
            return this.$store.state.PlayerInfo.claimableTiles;
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
