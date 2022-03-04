<template>
    <div class="d-inline-block pb-tile" v-on:click="toggleColor()" v-bind:class="getColorClass">{{ color }}</div>
</template>

<script>
export default {
    name: "Tile",
    props: {
        color: Number,
        isPut: Boolean
    },
    data: function () {
        return {
            filled: false
        }
    },
    methods: {
        toggleColor: function () {
            if (!this.isPut) {
                this.filled = !this.filled;
                navigator.vibrate(10);
                console.log("Changed!");
            }

        }
    },
    computed: {
        getColorClass: function () {
            if (this.filled) {
                if (this.$props.color === 5)
                    return "filled-tile filled-tile-light color-" + this.$props.color;
                return "filled-tile color-" + this.$props.color;
            } else {
                return ""
            }
        }
    },
    mounted() {
        this.filled = this.isPut;
    }

}
</script>

<style scoped>
.pb-tile {
    width: 19px;
    height: 19px;
    background-color: rgb(254, 208, 73);
    margin: 1px;
    padding-top: 3px;
    text-align: center;
    cursor: pointer;
    user-select: none;
}

.filled-tile {
    color: transparent;
    background-image: url("~@/assets/tile-bg.svg");
    background-repeat: repeat;
    background-position: center;
}

.filled-tile-light {
    background-image: url("~@/assets/tile-bg-light.svg");
}
</style>
