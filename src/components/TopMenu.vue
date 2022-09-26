<template>
    <div>
        <div id="top-menu-player-info">

            <div class="btn balance-menu">
                <div class="d-flex flex-column">
                    <div class="span"><img src="~@/assets/coin-logo.svg" alt="PileBlocks Token Logo" class="coin-logo"/>
                        <fancy-number :value='this.$store.getters["PlayerInfo/getBalance"]'/>
                    </div>
                    <span class="span text-left small-text">{{ $t('topMenu.yourPlace') }}{{playerPosition}}</span>
                </div>
                <span class="btn__border">
                    <span class="btn__border-top"></span>
                    <span class="btn__border-bot"></span>
                </span>
                <span class="btn__inner-menu">
                </span>
                <img class="balance-info-popup" src="~@/assets/balance-information-popup.svg" alt=""/>
            </div>
        </div>
        <div id="top-menu-game-stats">

            <button class="btn btn-menu" type="button" v-on:click="$bvModal.show('standings-table')">
                <div>
                    <img src="~@/assets/icon-standings.svg" alt="Reload" class="button-icon"/>
                    <span class="span pl-1">{{ $store.state.Game.standings.length }}</span>
                </div>

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
        <div id="top-menu-game-reload">

            <button class="btn btn-menu" type="button" :disabled="isOpInProgress" v-on:click="reloadGame">
                <img src="~@/assets/icon-reload.svg" alt="Reload" class="button-icon" v-show="!isLoading"/>
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
        <div id="top-menu-game-lang">
            <button class="btn btn-menu" type="button">
                <img src="~@/assets/gb_flag.svg" class="button-icon" alt="" v-on:click="changeLocale('en')" v-if="$i18n.locale !== 'en'"/>
                <img src="~@/assets/kr_flag.svg" class="button-icon" alt="" v-on:click="changeLocale('kr')" v-if="$i18n.locale !== 'kr'"/>

                <span class="btn__border">
                    <span class="btn__border-top"></span>
                    <span class="btn__border-bot"></span>
                </span>
                <span class="btn__inner btn__inner-main">
                    <span class="btn__inner-shadow"></span>
                    <span class="btn__inner-rect"></span>
                </span>
            </button>

            <b-modal id="standings-table" hide-footer :title="$t('topMenu.standings.title')">
                <template #modal-header-close>
                    <img src="~@/assets/popup-close-button.svg"/>
                </template>
                <b-container fluid class="p-0 mb-4">
                    <b-row>
                        <b-col class="font-weight-bold text-right">{{ $t('topMenu.standings.place') }}</b-col>
                        <b-col class="font-weight-bold text-center">{{ $t('topMenu.standings.wallet') }}</b-col>
                        <b-col class="font-weight-bold text-center">{{ $t('topMenu.standings.points') }}</b-col>
                        <b-col class="font-weight-bold" v-if="$store.state.Game.totalReward > 0">{{ $t('topMenu.standings.reward') }}</b-col>
                    </b-row>

                    <b-row v-for="(player, index) in $store.state.Game.standings" :key="player.playerAddress"
                           :class="{active: isCurrentPlayer(player.playerAddress)}">
                        <b-col class="text-right"><span class="nft" v-if="player.nft"><a :href="'https://everscan.io/accounts/'+player.playerAddress" target="_blank">win</a></span> {{ index + 1 }}
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
                <template #modal-header-close>
                    <img src="~@/assets/popup-close-button.svg"/>
                </template>
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
        </div>
        <toast-list/>
    </div>
</template>

<script lang="js">
// @flow
import BigNumber from "bignumber.js";
import FancyNumber from "./FancyNumber";
import {TOKEN_ROOT_ADDRESS} from "@/AppConst";
import {GAME_STATUS_COMPLETED} from "@/AppConst";
import ToastList from "@/components/ToastList";

export default {
    name: "TopMenu",
    components: {
        FancyNumber, ToastList
    },
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
    color: var(--primary);
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
.coin-logo {
    height: 20px;
    width: 20px;
    padding-right: 3px;
}

.balance-info-popup {
    position: absolute;
    bottom: 0px;
    right: 0px;
    height: 20px;
}
.balance-menu {
    min-width: 7em;
}
</style>
