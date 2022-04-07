<template>
    <div>
        <b-toast id="wrong-color" auto-hide-delay="3000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
            <div>Choose Another Color!
            </div>
          </template>
          Please choose color <div :class="_getColorClassByNum(this.correctColorNum)">{{correctColorNum}}</div> from the bottom menu.
        </b-toast>

        <b-toast id="zero-tiles-left" auto-hide-delay="5000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
            <div>Use Another Color!
            </div>
          </template>
            Unfortunately, <b>0 tiles</b> of color <div :class="_getColorClassByNum(this.correctColorNum)">{{correctColorNum}}</div> left.<br/>
            Please <b>choose</b> another color from the bottom menu<br/><br/>
            <img src="~@/assets/colors.png"  width="131" height="53" alt=""/>
            <br/>
            or <b>CLAIM</b> more tiles.
        </b-toast>

        <b-toast id="50-tiles-put" auto-hide-delay="3000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
            <div>Tiles Limit Reached!
            </div>
          </template>
            You have already reached the limit of <b>50 tiles</b>, please submit them before putting more tiles.
        </b-toast>

        <b-toast id="zero-balance" auto-hide-delay="2000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
            <div>Your Balance is 0 PILE!
            </div>
          </template>
            Your balance is <b>0 PILE</b>. Please top-up your balance by clicking the <span class="dark-box p-1"><i class="bi bi-cart-check-fill color-primary"></i></span> icon.
        </b-toast>

        <b-toast id="zero-claim" auto-hide-delay="10000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
              <div>You have <b>0 tiles</b> to claim!
            </div>
          </template>
            <p>Please wait for 15 minutes or so to get the first color tiles.</p>
            <p><b>NOTE:</b>The more you wait, the <b>more</b> you receive!</p>
        </b-toast>

        <b-toast id="not-enough-pile-to-put" auto-hide-delay="10000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
              <div>Your PILE balance is not enough to put!
            </div>
          </template>
            <p>Currently you have <i>{{balance}} PILE</i>, and the put operation costs <b>{{payPerMove}} PILE</b>.</p>
            <p>Please top-up your balance!</p>
        </b-toast>

        <b-toast id="op-in-progress" auto-hide-delay="2000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
            <div>Operation in Progress!
            </div>
          </template>
            Please wait until the app completes the claim or put operation.
        </b-toast>
        <b-toast id="message-expired" auto-hide-delay="20000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
            <div>Operation Didn't Succeed!
            </div>
          </template>
            The operation could not be completed, please try again.
        </b-toast>
        <b-toast id="on-claim-tiles" auto-hide-delay="3000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
            <div>👾 Activity Detected!
            </div>
          </template>
            Somebody has just claimed <b>{{claimValue}} tiles</b>.
        </b-toast>
        <b-toast id="on-put-tiles" auto-hide-delay="3000" variant="secondary" solid toaster="b-toaster-top-center">
          <template #toast-title>
            <div>👾 Activity Detected!
            </div>
          </template>
            Somebody has just put <b>{{putValue}} tiles</b>.
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
            putValue: 0
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
            }
            this.$bvToast.show(payload.toastName);
        }
    }
}
export default ToastManager;
</script>

<style scoped>
.dark-box {
    background-color: var(--gray-dark);
}
</style>
