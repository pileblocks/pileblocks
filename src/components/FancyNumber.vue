<template>
    <div class="d-inline">
    {{ valueInt }}<small>.{{ valueFloat }}</small>
    </div>
</template>

<script>
import BigNumber from "bignumber.js";

export default {
    name: "FancyNumber",
    props: {
        value: Number
    },
    computed: {
        valueInt: function() {
            return new BigNumber(new BigNumber(this.value).toFixed(2).split('.')[0]).toFormat(0)
        },
        valueFloat: function() {
            return new BigNumber(this.value).toFixed(2).split('.')[1]
        }
    }
}
</script>

<style scoped>

</style>
