<template>
    <div id="bottom-menu">
        <div id="pile-colors" v-show="isBalancePositive">
            <div v-for="item in 5" :key="item">
                <bottom-menu-color :btn-color="item"/>
            </div>
        </div>
        <div id="claim-tiles" v-show="isBalancePositive">
            <div v-if="!tilesArePut">
                <b-button size="lg" variant="primary" v-on:click="claimTiles">
                    <span v-show="!isLoading">Claim <small>{{ this.$store.state.PlayerInfo.claimableTiles }}</small></span>
                    <b-spinner v-show="isLoading"></b-spinner>
                </b-button>
            </div>
            <div v-if="tilesArePut && !isMainScreen" class="d-flex flex-column mt-1">
                <b-button size="lg" variant="primary">Put <small>{{ this.$store.state.Game.tilesToPut.length }}</small></b-button>
                <b-button size="sm" variant="secondary" class="mt-1" v-on:click="cancelPut">Cancel <i class="bi bi-x-circle"></i></b-button>
            </div>
        </div>
    </div>
</template>

<script>
// @flow
import BottomMenuColor from "./BottomMenuColor";
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
            this.isLoading = true;
            try {
                await this.$store.dispatch('Ever/claimTiles');
                await this.$store.dispatch('Ever/reloadGame');
            } catch(e) {
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
        }
    }
}
</script>

<style scoped>
</style>
