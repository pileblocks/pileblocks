<template>
    <div>
        <div id="top-menu-logo">
            <b-modal id="standings-table" hide-footer :title="$t('topMenu.standings.title')">
                <b-container fluid class="p-0 mb-4">
                    <b-row>
                        <b-col class="font-weight-bold text-right">{{ $t('topMenu.standings.place') }}</b-col>
                        <b-col class="font-weight-bold text-center">{{ $t('topMenu.standings.wallet') }}</b-col>
                        <b-col class="font-weight-bold text-center">{{ $t('topMenu.standings.points') }}</b-col>
                        <b-col class="font-weight-bold" v-if="$store.state.Game.totalReward > 0">{{ $t('topMenu.standings.reward') }}</b-col>
                    </b-row>

                    <b-row v-for="(player, index) in $store.state.Game.standings" :key="player.playerAddress"
                           :class="{active: isCurrentPlayer(player.playerAddress)}">
                        <b-col class="text-right"><span class="nft" v-if="player.nft">nft</span> {{ index + 1 }}
                        </b-col>
                        <b-col class="text-center">{{ player.playerAddress | short }}</b-col>
                        <b-col class="text-center p-0">{{ player.captured }}
                            <span v-if="player.stars > 0">
                                ({{player.stars}}<i class="bi bi-star-fill small" ></i>)
                            </span>
                        </b-col>
                        <b-col class="text-center" v-if="$store.state.Game.totalReward > 0">{{ player.reward | fixed }}</b-col>
                    </b-row>
                </b-container>
            </b-modal>

            <b-modal id="sale-token" hide-footer :title="$t('topMenu.getTokens.title')">
                <p>{{ $t('topMenu.getTokens.p1') }}<br/></p>
                <b-input-group>
                    <b-form-input :value="saleTokenAddress"
                               v-on:focus="$event.target.select()"
                               ref="tsAddress"
                               readonly>
                    </b-form-input>
                    <template #append>
                        <b-button variant="primary" v-on:click="copyAddress">Copy</b-button>
                    </template>
                </b-input-group>
                <p class="mt-3">{{ $t('topMenu.getTokens.p2') }}<b>{{ $store.state.PlayerInfo.playerAddress | short }}</b><br/>{{ $t('topMenu.getTokens.p3') }}</p>
                <p class="mt-1">{{ $t('topMenu.getTokens.p4') }}<a href="https://youtu.be/1ZBE9qspn7k" target="_blank">https://youtu.be/1ZBE9qspn7k</a>.</p>
            </b-modal>

            <img src="~@/assets/logo.svg" alt="PileBlocks" class="logo-img"/>
        </div>
        <div id="top-menu-player-info">
            <p class="mb-0"><span class="text-faded">{{ $t('topMenu.balance') }}</span>
                <fancy-number :value='this.$store.getters["PlayerInfo/getBalance"]'/>
                <i class="bi bi-cart-check-fill color-success pl-1" v-on:click="$bvModal.show('sale-token')"></i>
            </p>
            <div class="reward-grid">
                <div class="reward-label"><span class="text-faded pr-1">{{ $t('topMenu.yourPlace') }}</span></div>
                <div class="reward-value">
                    <div class="d-inline-block position-absolute">
                        <div>{{playerPosition}}
                            <span v-if="playerPosition === 1"><i class="bi bi-trophy-fill first-place"></i></span>
                            <span v-if="playerPosition === 2"><i class="bi bi-trophy-fill second-place"></i></span>
                            <span v-if="playerPosition === 3"><i class="bi bi-trophy-fill third-place"></i></span>
                        </div>
                        <div :class="setAnimationClass">{{ animatedReward }}</div>
                    </div>
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
            <b-button size="sm" variant="primary" :disabled="isOpInProgress" v-on:click="reloadGame">
                <i class="bi bi-arrow-clockwise" v-show="!isLoading"></i>
                <b-spinner v-show="isLoading" small></b-spinner>
            </b-button>
        </div>
        <div id="top-menu-game-lang" class="d-flex flex-column">
            <img src="~@/assets/gb_flag.svg" width="30" height="30" alt="" v-on:click="changeLocale('en')" v-if="$i18n.locale !== 'en'"/>
            <img src="~@/assets/kr_flag.svg" width="30" height="30" alt="" v-on:click="changeLocale('kr')" v-if="$i18n.locale !== 'kr'"/>
        </div>
    </div>
</template>

<script lang="js">
// @flow
import BigNumber from "bignumber.js";
import FancyNumber from "./FancyNumber";
import {TOKEN_ROOT_ADDRESS} from "@/AppConst";
import {GAME_STATUS_COMPLETED} from "@/AppConst";

export default {
    name: "TopMenu",
    components: {FancyNumber},
    data: function () {
        return {
            animatedReward: "",
            setAnimationClass: "reward-base ",
            isLoading: false,
            saleTokenAddress: TOKEN_ROOT_ADDRESS,
            farmingTime: 0,
            farmingBalance: 0,
            farmingResult: 0
        }
    },
    methods: {
        animateReward: function (isRaising: boolean) {

            this.animatedReward = new BigNumber(this.$store.getters["Game/getPosition"]).toFixed(0);
            this.setAnimationClass += "reward-animation ";
            if (!isRaising) {
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

        reloadGame: async function () {
            this.isLoading = true;
            await this.$store.dispatch('Ever/reloadGame');
            this.isLoading = false;
        },

        copyAddress: function() {
            this.$refs.tsAddress.focus();
            document.execCommand('copy');
        },

        changeLocale: function (lang: string) {
            this.$i18n.locale = lang;
        }

    },
    watch: {
        playerPosition: function (newReward, oldReward) {
            if (oldReward !== 0) {
                this.animateReward(newReward > oldReward);
            }

        }
    },
    computed: {

        playerPosition: function () {
            return this.$store.getters["Game/getPosition"];
        },

        gameActive: function () {
            return this.$store.state.Game.status !== GAME_STATUS_COMPLETED;
        },
        isOpInProgress: function(): boolean {
            return this.$store.state.Ever.operationInProgress;
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
.gold-star {
    color: var(--gray-dark)
}
.reward-grid {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 4.2em 1fr;
}

.reward-label {
    grid-column: 1;
    grid-row: 1;
}

.reward-value {
    grid-column: 2;
    grid-row: 1;
}

.first-place {
    color: var(--primary) !important;
}

.second-place {
    color: var(--light) !important;
}

.third-place {
    color: var(--cyan) !important;
}

.color-success {
    color: var(--green);
}

.nft {
    background-color: #282846;
    border-radius: 5px;
    color: white;
    padding-left: 4px;
    padding-right: 4px;
    font-variant: small-caps;
}
</style>
