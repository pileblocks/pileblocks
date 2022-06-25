<template>
    <div>
        <b-toast id="wrong-color" auto-hide-delay="3000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
            <div>{{ $t('toast.anotherColorTitle') }}
            </div>
          </template>
          {{ $t('toast.anotherColorText1') }}<div :class="_getColorClassByNum(this.correctColorNum)">{{correctColorNum}}</div> {{ $t('toast.anotherColorText2') }}
        </b-toast>

        <b-toast id="zero-tiles-left" auto-hide-delay="5000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
            <div>{{ $t('toast.noColorLeftTitle') }}
            </div>
          </template>
            {{ $t('toast.noColorLeftText1') }}<div :class="_getColorClassByNum(this.correctColorNum)">{{correctColorNum}}</div>{{ $t('toast.noColorLeftText2') }}<br/>
            <p v-html="$t('toast.noColorLeftText3')"></p>
            <img src="~@/assets/colors.png"  width="131" height="53" alt=""/>
            <br/><br/>
            <p v-html="$t('toast.noColorLeftText4')"></p>
        </b-toast>

        <b-toast id="50-tiles-put" auto-hide-delay="3000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
            <div>{{ $t('toast.tilesLimitReachedTitle') }}
            </div>
          </template>
            <p v-html="$t('toast.tilesLimitReachedText1')"></p>

        </b-toast>

        <b-toast id="zero-balance" auto-hide-delay="2000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
            <div>{{ $t('toast.zeroBalanceTitle') }}
            </div>
          </template>

            <p v-html="$t('toast.zeroBalanceText1')"></p>

        </b-toast>

        <b-toast id="zero-claim" auto-hide-delay="60000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
              <div>{{ $t('toast.noTilesToClaimTitle') }}
            </div>
          </template>
            <p v-html="$t('toast.noTilesToClaimText1')"></p>
            <p v-html="$t('toast.noTilesToClaimText2')"></p>
        </b-toast>

        <b-toast id="not-enough-pile-to-put" auto-hide-delay="10000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
              <div>{{ $t('toast.putBalanceNotEnoughTitle') }}
            </div>
          </template>
            <p v-html="$t('toast.putBalanceNotEnoughText1', {'balance': balance, 'payPerMove': payPerMove})"></p>
        </b-toast>

        <b-toast id="op-in-progress" auto-hide-delay="2000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
            <div>{{ $t('toast.operationInProgressTitle') }}
            </div>
          </template>
            {{ $t('toast.operationInProgressText1') }}
        </b-toast>
        <b-toast id="message-expired" auto-hide-delay="20000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
            <div>{{ $t('toast.operationFailedTitle') }}
            </div>
          </template>
            {{ $t('toast.operationFailedText1') }}
        </b-toast>
        <b-toast id="on-claim-tiles" auto-hide-delay="3000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
            <div>{{ $t('toast.activityDetectedTitle') }}
            </div>
          </template>
            <p v-html="$t('toast.activityDetectedClaim', {claimValue: claimValue})"></p>
        </b-toast>
        <b-toast id="on-put-tiles" auto-hide-delay="3000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
            <div>{{ $t('toast.activityDetectedTitle') }}
            </div>
          </template>
            <p v-html="$t('toast.activityDetectedPut', {putValue: putValue})"></p>
        </b-toast>
        <b-toast id="star-claimed" auto-hide-delay="5000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
            <div>{{ $t('toast.starReceivedTitle') }}
            </div>
          </template>
            <p v-html="$t('toast.starReceivedText1', {pointsGained: pointsGained})"></p>
        </b-toast>

    </div>
</template>

<script>
// @flow
const ToastManager: {} = {
    name: "ToastManager",
    data: function() {
        return {
            correctColorNum: 0,
            balance: 0,
            payPerMove: 0,
            claimValue: 0,
            putValue: 0,
            pointsGained: 0
        }
    },
    methods: {
        _getColorClassByNum(colorNum: number):string {
            return `color-span color-${colorNum} d-inline-block text-center fancy-font`
        }
    },
    computed: {
        toastListener() {
                return this.$store.state.Toast.received;
        },
    },
    watch: {
        toastListener: function():void {
            const payload = this.$store.state.Toast.payload;
            switch (payload.toastName) {
                case "wrong-color":
                    this.correctColorNum = payload.data.colorNumber;
                    break;
                case "zero-tiles-left":
                    this.correctColorNum = payload.data.colorNumber;
                    break;
                case "not-enough-pile-to-put":
                    this.balance = payload.data.balance;
                    this.payPerMove = payload.data.payPerMove;
                    break;
                case "on-put-tiles":
                    this.putValue = payload.data.putValue;
                    break;
                case "on-claim-tiles":
                    this.claimValue = payload.data.claimValue;
                    break;
                case "star-claimed":
                    this.pointsGained = payload.data.pointsGained;
                    break;
            }
            this.$bvToast.show(payload.toastName);
        }
    }
}
export default ToastManager;
</script>

<style>
.dark-box {
    background-color: var(--gray-dark) !important;
}
.color-success {
    color: var(--green);
}
</style>
