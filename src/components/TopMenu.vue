<template xmlns="http://www.w3.org/1999/html">
    <div>
        <div id="top-menu-logo">
            <b-modal id="standings-table" hide-footer title="Standings">
                <b-container fluid class="p-0">
                    <b-row>
                        <b-col class="font-weight-bold" cols="3">Place</b-col>
                        <b-col class="font-weight-bold" cols="3">Wallet</b-col>
                        <b-col class="font-weight-bold" cols="3">Captured</b-col>
                        <b-col class="font-weight-bold" cols="3">Reward</b-col>
                    </b-row>

                    <b-row v-for="(player, index) in $store.state.Game.standings" :key="player.playerAddress"
                           :class="{active: isCurrentPlayer(player.playerAddress)}">
                        <b-col class="text-center">{{ index + 1 }}</b-col>
                        <b-col class="text-left">{{ player.playerAddress | short }}</b-col>
                        <b-col>{{ player.captured }}</b-col>
                        <b-col>{{ player.reward | fixed }}</b-col>
                    </b-row>
                    <b-row>
                        <b-col class="mt-2">
                            <p class="small"><b>Note: </b>The rewards for the last (10%) and pre-last (5%) tiles are
                                excluded from the calculation considering the dynamic nature of this appraisal.</p>
                        </b-col>
                    </b-row>
                </b-container>
            </b-modal>

            <img src="/assets/logo.svg" alt="PileBlocks" class="logo-img"/>
        </div>
        <div id="top-menu-player-info">
            <p class="mb-0"><span class="text-faded">Balance: </span>
                <fancy-number :value='this.$store.getters["PlayerInfo/getBalance"]'/>
                <i class="bi bi-cart-check-fill color-primary pl-1"></i>
            </p>
            <div class="mb-0 d-inline-block"><span class="text-faded pr-1">Your Reward: </span>
                <div class="d-inline-block position-absolute">
                    <fancy-number :value='this.$store.getters["Game/getReward"]'/>
                    (<span
                    :class="rewardProcentClass()">{{ rewardProcent }}%</span>)
                    <div :class="setAnimationClass">{{ animatedReward }}</div>
                </div>
            </div>
        </div>
        <div id="top-menu-game-stats">
            <b-button size="sm" variant="primary" v-on:click="$bvModal.show('standings-table')"><i
                class="bi bi-person-lines-fill"></i>
                {{ $store.state.Game.standings.length }}
            </b-button>
        </div>
        <div id="top-menu-game-reload">
            <b-button size="sm" variant="primary">
                <i class="bi bi-arrow-clockwise" v-show="!isLoading" v-on:click="reloadGame"></i>
                <b-spinner v-show="isLoading" small></b-spinner>
            </b-button>
        </div>
    </div>
</template>

<script>
import BigNumber from "bignumber.js";
import FancyNumber from "./FancyNumber";

export default {
    name: "TopMenu",
    components: {FancyNumber},
    data: function () {
        return {
            animatedReward: "",
            setAnimationClass: "reward-base ",
            isLoading: false
        }
    },
    methods: {
        animateReward: function (isRaising: boolean) {
            this.animatedReward = new BigNumber(this.$store.getters["Game/getReward"]).toFixed(2);
            this.setAnimationClass += "reward-animation ";
            if (isRaising) {
                this.setAnimationClass += "reward-raise ";
            } else {
                this.setAnimationClass += "reward-decline ";
            }

            setTimeout(() => {
                this.setAnimationClass = "reward-base ";
                this.animatedReward = "";
            }, 900)
        },
        isCurrentPlayer: function (playerAddress: string): boolean {
            return playerAddress === this.$store.state.PlayerInfo.playerAddress
        },
        rewardProcentClass: function () {
            const rewardProcent: number = parseFloat(this.rewardProcent);
            switch (true) {
                case (rewardProcent < 5):
                    return "low-procent"
                case (rewardProcent < 10):
                    return "medium-procent"
            }
            return "high-procent"
        },
        reloadGame: async function () {
            this.isLoading = true;
            await this.$store.dispatch('Ever/reloadGame');
            this.isLoading = false;
        }

    },
    watch: {
        rewardChange: function (newReward, oldReward) {
            if (oldReward !== 0) {
                this.animateReward(newReward > oldReward);
            }

        }
    },
    computed: {
        rewardChange: function () {
            return this.$store.getters["Game/getReward"];
        },
        rewardProcent: function () {
            return new BigNumber(this.$store.getters["Game/getReward"] * 100 / this.$store.state.Game.totalRewardDynamic).toFixed(1);
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



@keyframes text-enlarge {
    0% {
        font-size: 16px;
        opacity: 1;
        left: 0;
        top: 0;
    }
    100% {
        font-size: 48px;
        opacity: 0;
        top: -30px;
        left: -10px;
    }
}

.reward-animation {
    animation-name: text-enlarge;
    animation-duration: 1s;
}

.reward-base {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
}

.reward-raise {
    color: var(--green);
}

.reward-decline {
    color: var(--danger);
}

.active {
    background-color: var(--primary);
}

.high-procent {
    color: var(--green);
}

.low-procent {
    color: var(--danger);
}

.medium-procent {
    color: var(--orange);
}
</style>
