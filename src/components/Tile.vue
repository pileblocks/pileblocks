<template>
    <div class="d-inline-block pb-tile" v-on:click="toggleColor()" v-bind:class="getColorClass">{{
            computedColor
        }}
    </div>
</template>

<script>
// @flow

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
                //claim / put operation in progress
                if (this.$store.state.Ever.operationInProgress) {
                    this.$store.commit('Toast/sendToast', {
                        toastName: "op-in-progress"
                    });
                    return;
                }

                // Zero balance
                if (this.$store.state.PlayerInfo.balance === 0) {
                    this.$store.commit('Toast/sendToast', {
                        toastName: "zero-balance"
                    });
                    return;
                }

                // Incorrect color picked
                if (this.computedColor !== this.$store.state.PlayerInfo.currentColor) {
                    this.$store.commit('Toast/sendToast', {
                        toastName: "wrong-color",
                        data: {colorNumber: this.computedColor}
                    });
                    return;
                }
                // Player already filled this tile
                if (this.filled) {
                    this.$store.commit('PlayerInfo/updateColorQty', {colorNumber: this.computedColor, qty: 1});
                    this.$store.dispatch('Game/removeTileAction', {color: this.computedColor, ...this.coordinates});
                    this.$store.commit('Game/putTile', {color: 0, ...this.coordinates});
                } else {
                    // more than 50 tiles put, only for not filled
                    if (this.$store.state.Game.tilesToPut.length > 49) {
                        this.$store.commit('Toast/sendToast', {
                            toastName: "50-tiles-put"
                        });
                        return;
                    }
                    if (this.$store.state.PlayerInfo.colors[this.computedColor - 1] > 0) {
                        this.$store.commit('PlayerInfo/updateColorQty', {colorNumber: this.computedColor, qty: -1});
                        this.$store.dispatch('Game/addTileAction', {color: this.computedColor, ...this.coordinates});
                        this.$store.commit('Game/putTile', {color: this.computedColor + SELF_PUT_OFFSET, ...this.coordinates});
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
        currentFieldCell: function () {
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
    width: 21px;
    height: 21px;
    background-color: #F5DE09;
    border: 1px solid #D9C300;
    line-height: 19px;
    text-align: center;
    cursor: pointer;
    user-select: none;
    color: #4F480C;
    font-family: 'Arial';
    font-size: 10pt;
}

.filled-tile {
    color: transparent;
    background-image: url("~@/assets/tile-bg.svg");
    background-repeat: no-repeat;
    background-position: center;
    border: 1px solid var(--secondary);
}

.filled-tile-light {
    background-image: url("~@/assets/tile-bg-light.svg");
}
</style>
