<template>
    <div class="d-flex justify-content-end align-items-center position-relative">
        <b-button size="sm" variant="primary" :class="setAnimationClass" :disabled="$store.state.Toast.messagesNumber === 0" v-on:click="openNotifications">
            <i class="bi bi-envelope" v-if="$store.state.Toast.hasNewItems"></i>
            <i class="bi bi-check-circle" v-if="!$store.state.Toast.hasNewItems"></i>
            <span v-if="$store.state.Toast.hasNewItems">❗</span>
        </b-button>

        <b-modal id="show-notifications" hide-footer :title="$t('toastList.popupTitle')">
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

            </div>
            <b-button size="sm" variant="secondary" v-on:click="clearNotifications">Clear All</b-button>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "ToastList",
    data() {
        return {
            setAnimationClassDefault: "mt-1 mr-1 button-envelope notification-div",
            setAnimationClass: "mt-1 mr-1 button-envelope notification-div"
        }
    },
    methods: {
        _getColorClassByNum(colorNum: number):string {
            return `color-span color-${colorNum} d-inline-block text-center fancy-font`
        },
        openNotifications: function () {
            this.$store.commit('Toast/readAll');
            this.$bvModal.show('show-notifications');
        },
        clearNotifications: function () {
            this.$store.commit('Toast/clearAll');
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
    top: 0px;
    right: 0px;
}

.color-change-2x {
	-webkit-animation: color-change-2x 2s linear 2 alternate both;
	animation: color-change-2x 2s linear 2 alternate both;
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

</style>
