<template>
        <div>
            <div id="top-menu-logo">
                <div id="color-1" class="color-1"></div>
                <div id="color-2" class="color-2"></div>
                <div id="color-3" class="color-3"></div>
                <div id="color-4" class="color-4"></div>
                <div id="color-5" class="color-5"></div>
                <img src="/assets/logo.svg" alt="PileBlocks" class="logo-img"/>
            </div>
            <div id="top-menu-player-info">
                <p class="mb-0"><span class="text-faded">Balance:</span> 1120<small>.75</small></p>
                <p class="mb-0"><span class="text-faded">Your Reward:</span> {{rewardInt}}<small>.{{rewardFloat}}</small> (<span class="high-procent">38.5%</span>)</p>
            </div>
            <div id="top-menu-game-stats">
                <b-button size="sm" variant="primary"><i class="bi bi-person-lines-fill"></i> 12</b-button>
            </div>
            <div id="top-menu-game-reload">
                <b-button size="sm" variant="primary"><i class="bi bi-arrow-clockwise"></i></b-button>
            </div>
        </div>
</template>

<script>
import BigNumber from "bignumber.js";
export default {
    name: "TopMenu",
    computed: {
        reward: function() {
            return this.$store.getters["Game/getReward"];
        },
        rewardInt: function () {
            return new BigNumber(new BigNumber(this.$store.getters["Game/getReward"]).toFixed(2).split('.')[0]).toFormat(0)
        },
        rewardFloat: function () {
            return new BigNumber(this.$store.getters["Game/getReward"]).toFixed(2).split('.')[1]
        }
    },
    mounted() {
      this.$store.commit('Game/calculateRewards');
    }
}
</script>

<style scoped>
.text-faded {
    color: #aab0bc;
}
</style>
