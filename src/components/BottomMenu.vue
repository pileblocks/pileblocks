<template>
    <div id="bottom-menu" class="mt-2">
        <div id="pile-colors">
            <div v-for="item in 5" :key="item">
                <bottom-menu-color :btn-color="item"/>
            </div>
        </div>
        <div id="claim-tiles">
            <div v-if="isMainScreen">
                <b-button size="lg" variant="primary">Claim <small>1011</small></b-button>
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
    methods: {
        setActiveColor: function(newColor:number):void {
            this.$store.commit('PlayerInfo/setCurrentColor', newColor);
        },
        setActive: function(btnColor:number):string {
            return btnColor===this.$store.state.PlayerInfo.currentColor ? "primary" : "secondary";
        },
        cancelPut: function() {
            this.$store.commit('Game/cancelPut');
            this.$store.commit('PlayerInfo/updateColors');
            this.$store.commit('Game/updateStandings');
            this.$store.commit('Game/calculateRewards');
            //TODO: update the remaining tiles
        }
    },
    computed: {
        tilesArePut: function (): boolean {
            return this.$store.state.Game.tilesToPut.length > 0
        },
        isMainScreen: function(): boolean {
            return this.$store.state.Game.isMainScreen;
        }
    }
}
</script>

<style scoped>
</style>
