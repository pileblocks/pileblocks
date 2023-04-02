<template>
    <div>

        <div class="notification-div">
            <img src="~@/assets/icon-top-menu-notifications.svg" alt=""/>
            <div class="notification-content">
                <button :class="setAnimationClass" type="button" v-on:click="openNotifications" :disabled="$store.state.Toast.messagesNumber === 0">

                    <img src="~@/assets/icon-envelope.svg" alt="Existing notifications" class="button-icon" v-if="$store.state.Toast.hasNewItems"/>
                    <img src="~@/assets/icon-notifications-read.svg" alt="No notifications" class="button-icon" v-if="!$store.state.Toast.hasNewItems"/>
                    <img src="~@/assets/icon-new-envelope.svg" class="pl-1" alt="New notificatoins" v-if="$store.state.Toast.hasNewItems"/>

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
        </div>

        <b-modal id="show-notifications" hide-footer :title="$t('toastList.popupTitle')">
            <template #modal-header-close>
                <img src="~@/assets/popup-close-button.svg"/>
            </template>

            <div v-for="(message, index) in this.$store.state.Toast.messages.slice().reverse()" :key="index">

                <div v-if="message.payload.toastName === 'wrong-color'">
                    <div class="small">
                        {{ new Date(message.received).toLocaleTimeString() }}
                    </div>
                    <div>
                        {{ $t('toast.anotherColorText1') }}<div :class="_getColorClassByNum(message.payload.data.colorNumber)">{{message.payload.data.colorNumber}}</div> {{ $t('toast.anotherColorText2') }}
                    </div>
                    <hr/>
                </div>

                <div v-if="message.payload.toastName === 'zero-tiles-left'">
                    <div class="small">
                        {{ new Date(message.received).toLocaleTimeString() }}
                    </div>
                    <div>
                        {{ $t('toast.noColorLeftText1') }}<div :class="_getColorClassByNum(message.payload.data.colorNumber)">{{message.payload.data.colorNumber}}</div>{{ $t('toast.noColorLeftText2') }}<br/>
                        <p v-html="$t('toast.noColorLeftText3')"></p>
                        <img src="~@/assets/colors.png"  width="131" height="53" alt=""/>
                        <br/><br/>
                        <p v-html="$t('toast.noColorLeftText4')"></p>
                    </div>
                    <hr/>
                </div>

                <div v-if="message.payload.toastName === '50-tiles-put'">
                    <div class="small">
                        {{ new Date(message.received).toLocaleTimeString() }}
                    </div>
                    <div>
                        <div>{{ $t('toast.tilesLimitReachedTitle') }}
                        </div>
                    </div>
                    <hr/>
                </div>

                <div v-if="message.payload.toastName === 'zero-balance'">
                    <div class="small">
                        {{ new Date(message.received).toLocaleTimeString() }}
                    </div>
                    <div>
                        <p v-html="$t('toast.zeroBalanceText1')"></p>
                    </div>
                    <hr/>
                </div>

                <div v-if="message.payload.toastName === 'zero-claim'">
                    <div class="small">
                        {{ new Date(message.received).toLocaleTimeString() }}
                    </div>
                    <div>
                        <p v-html="$t('toast.noTilesToClaimText1')"></p>
                        <p v-html="$t('toast.noTilesToClaimText2')"></p>
                    </div>
                    <hr/>
                </div>

                <div v-if="message.payload.toastName === 'not-enough-pile-to-put'">
                    <div class="small">
                        {{ new Date(message.received).toLocaleTimeString() }}
                    </div>
                    <div>
                        <p v-html="$t('toast.putBalanceNotEnoughText1', {'balance': message.payload.data.balance, 'payPerMove': message.payload.data.payPerMove})"></p>
                    </div>
                    <hr/>
                </div>

                <div v-if="message.payload.toastName === 'op-in-progress'">
                    <div class="small">
                        {{ new Date(message.received).toLocaleTimeString() }}
                    </div>
                    <div>
                        {{ $t('toast.operationInProgressText1') }}
                    </div>
                    <hr/>
                </div>

                <div v-if="message.payload.toastName === 'message-expired'">
                    <div class="small">
                        {{ new Date(message.received).toLocaleTimeString() }}
                    </div>
                    <div>
                        {{ $t('toast.operationFailedText1') }}
                    </div>
                    <hr/>
                </div>

                <div v-if="message.payload.toastName === 'on-put-tiles'">
                    <div class="small">
                        {{ new Date(message.received).toLocaleTimeString() }}
                    </div>
                    <div>
                        <p v-html="$t('toast.activityDetectedPut', {putValue: message.payload.data.putValue})"></p>
                    </div>
                    <hr/>
                </div>

                <div v-if="message.payload.toastName === 'on-claim-tiles'">
                    <div class="small">
                        {{ new Date(message.received).toLocaleTimeString() }}
                    </div>
                    <div>
                        <p v-html="$t('toast.activityDetectedClaim', {claimValue: message.payload.data.claimValue})"></p>
                    </div>
                    <hr/>
                </div>

                <div v-if="message.payload.toastName === 'star-claimed'">
                    <div class="small">
                        {{ new Date(message.received).toLocaleTimeString() }}
                    </div>
                    <div>
                        <p v-html="$t('toast.starReceivedText1', {pointsGained: message.payload.data.pointsGained})"></p>
                    </div>
                    <hr/>
                </div>

                <div v-if="message.payload.toastName === 'on-nft-applied'">
                    <div class="small">
                        {{ new Date(message.received).toLocaleTimeString() }}
                    </div>
                    <div>
                        <p v-html="$t('toast.nftAppliedText1', {nftType: resolveNftType(message.payload.data.nftType)})"></p>
                    </div>
                    <hr/>
                </div>

            </div>

            <button class="btn btn-menu" type="button" v-on:click="clearNotifications">
                <span  class="span p-2">{{ $t('toastList.clearNotifications') }}</span>
                <span class="btn__border">
                    <span class="btn__border-top"></span>
                    <span class="btn__border-bot"></span>
                </span>
                <span class="btn__inner btn__inner-main">
                    <span class="btn__inner-shadow"></span>
                </span>
            </button>

        </b-modal>
    </div>
</template>

<script>
import {
    OP_CHANGE_FARM_SPEED,
    OP_MINUS_CAPTURED_TILES,
    OP_MINUS_COLORS,
    OP_PLUS_CAPTURED_TILES,
    OP_SET_BLOCK_COLOR
} from "@/AppConst";

export default {
    name: "ToastList",
    data() {
        return {
            setAnimationClassDefault: "btn btn-menu",
            setAnimationClass: "btn btn-menu"
        }
    },
    methods: {
        _getColorClassByNum(colorNum: number):string {
            return `color-span color-${colorNum} d-inline-block text-center height-16`
        },
        openNotifications: function () {
            this.$store.commit('Toast/readAll');
            this.$bvModal.show('show-notifications');
        },
        clearNotifications: function () {
            this.$store.commit('Toast/clearAll');
        },
        resolveNftType: function(nftType: number) {
            switch (nftType) {

                case OP_SET_BLOCK_COLOR:
                    return this.$t('toast.nftType.trap')

                case OP_CHANGE_FARM_SPEED:
                    return this.$t('toast.nftType.farmSpeed')

                case OP_MINUS_CAPTURED_TILES:
                case OP_PLUS_CAPTURED_TILES:
                    return this.$t('toast.nftType.points')
                case OP_MINUS_COLORS:
                    return this.$t('toast.nftType.colorTiles')
            }
        }
    },
    computed: {
        newItems: function() {
            return this.$store.state.Toast.messages
        }
    },
    watch: {
        newItems: function():void {
            this.setAnimationClass = this.setAnimationClassDefault + " color-change-2x"
            setTimeout(() => {
                this.setAnimationClass = this.setAnimationClassDefault;
            }, 2000)
        }
    }
}
</script>

<style scoped>
.button-envelope {
    line-height: 0.5em !important;
}
.dark-box {
    background-color: var(--gray-dark) !important;
}
.color-success {
    color: var(--green);
}
.notification-div {
    position: absolute;
    top: 55px;
    left: calc(50% - 62px);
}

.color-change-2x {
	-webkit-animation: color-change-2x 2s linear 2 alternate both;
	animation: color-change-2x 2s linear 2 alternate both;
    animation-iteration-count: infinite;
}
@-webkit-keyframes color-change-2x {
  0% {
    background: var(--primary);
  }
  50% {
    background: var(--secondary);
  }
  100% {
    background: var(--primary);
  }
}
@keyframes color-change-2x {
  0% {
    background: var(--primary);
  }
  50% {
    background: var(--secondary);
  }
  100% {
    background: var(--primary);
  }
}
.notification-content {
    position: absolute;
    top: 0px;
    left: 32px;
}
.height-16 {
    line-height: 16px;
}
</style>
