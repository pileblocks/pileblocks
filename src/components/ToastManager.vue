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
            Please <b>choose</b> another color from the bottom menu<br/>
            <video autoplay="true" width="118" height="53">
                <source src="/assets/video/zero_tiles_left.mp4" type="video/mp4">
                <source src="/assets/video/zero_tiles_left.webm" type="video/webm">
                <source src="/assets/video/zero_tiles_left.ogv" type="video/ogg">
            </video>
            <br/>
            or <b>CLAIM</b> more tiles.
        </b-toast>
    </div>
</template>

<script>
// @flow
const ToastManager: {} = {
    name: "ToastManager",
    data: function() {
        return {
            correctColorNum: 0
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
            }
            this.$bvToast.show(payload.toastName);
        }
    }
}
export default ToastManager;
</script>

<style scoped>

</style>
