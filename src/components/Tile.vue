<template>
    <div class="d-inline-block pb-tile" v-on:click="toggleColor()" v-bind:class="getColorClass" >{{
            computedColor
        }}
    </div>
</template>

<script>
// @flow
/* eslint flowtype-errors/show-errors: 1 */

import {SELF_PUT_OFFSET} from "@/AppConst";

const Tile: {} = {
    name: "Tile",
    props: {
        color: Number,
        isPut: Boolean,
        coordinates: Object,
        lastModified: Number
    },
    data: function () {
        return {
            filled: false,
            computedColor: 1
        }
    },
    methods: {
        toggleColor: function () {
            if (!this.isPut) {
                // Incorrect color picked
                if (this.computedColor !== this.$store.state.PlayerInfo.currentColor) {
                    this.$store.commit('Toast/sendToast', {
                        toastName: "wrong-color",
                        data: {colorNumber: this.computedColor}
                    });
                    return;
                }
                // more than 50 tiles put
                if (this.$store.state.Game.tilesToPut.length > 50) {
                    this.$store.commit('Toast/sendToast', {
                        toastName: "50-tiles-put"
                    });
                    return;
                }
                // Player already filled this tile
                if (this.filled) {
                    this.$store.commit('PlayerInfo/updateColorQty', {colorNumber: this.computedColor, qty: 1});
                    this.$store.dispatch('Game/removeTileAction', {color: this.computedColor, ...this.coordinates});
                    this.$store.commit('Game/updateField', {color: 0, ...this.coordinates});
                } else {
                    if (this.$store.state.PlayerInfo.colors[this.computedColor - 1] > 0) {
                        this.$store.commit('PlayerInfo/updateColorQty', {colorNumber: this.computedColor, qty: -1});
                        this.$store.dispatch('Game/addTileAction', {color: this.computedColor, ...this.coordinates});
                        this.$store.commit('Game/updateField', {color: this.computedColor + SELF_PUT_OFFSET, ...this.coordinates});
                    }
                    // Not enough tiles
                    else {
                        this.$store.commit('Toast/sendToast', {
                            toastName: "zero-tiles-left",
                            data: {colorNumber: this.computedColor}
                        });
                        return;
                    }
                }
                this.filled = !this.filled;
                navigator.vibrate(10);
            }
        }
    },
    computed: {
        getColorClass: function () {
            if (this.filled) {
                if (this.computedColor === 5)
                    return "filled-tile filled-tile-light color-" + this.computedColor;
                return "filled-tile color-" + this.computedColor;
            } else {
                return ""
            }
        },
        currentFieldCell: function() {
            return this.$store.state.Game.field[this.coordinates.f.toString()][this.coordinates.y][this.coordinates.x];
        }
    },
    watch: {
        currentFieldCell: function (newValue) {
            if (newValue < SELF_PUT_OFFSET) {
                this.filled = this.isPut;
            }
        }
    },
    mounted() {
        if (this.color < SELF_PUT_OFFSET) {
            this.filled = this.isPut;
            this.computedColor = this.color;
        } else {
            //fill the self-put tile
            this.filled = true;
            this.computedColor = this.color - SELF_PUT_OFFSET;
        }

    }

}
export default Tile;
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
