<template>
    <div>
        <div class="d-flex mb-2 justify-content-center mt-2 mb-2">
            <b-button size="sm" :to="{ name: 'Home'}"><i class="bi bi-arrow-left"></i></b-button>
            <p class="lead fragment-number mb-0 ml-2" v-on:click="updateFlag">{{ currentFragment() }} of {{totalFragments}}</p>
        </div>

        <div v-for="fragment in this.items" :key="fragment">
            <div class="pb-container" v-for="(row, rowindex) in _getFieldFragment(fragment)"
                 :key="genIndex(fragment, rowindex, 0)">
                <div v-for="(col, colindex) in row" :key="genIndex(fragment, rowindex, colindex)"
                      class="d-inline">
                    <tile :color="_getColor(fragment, rowindex, colindex)"
                          :isPut="_checkIfPut(fragment, rowindex, colindex)" :coordinates="{f: fragment, x:colindex, y:rowindex}"></tile>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* @flow */
import Tile from "../components/Tile";
import {SELF_PUT_OFFSET} from "@/AppConst";

const FieldTilesPart = {
    name: "FieldTilesPart",
    data: function (): {} {
        return {
            lastModified: 0
        }
    },
    props: {
        items: Array //Array<number>
    },
    methods: {
        genIndex: function (fragment: number, row: number, col: number): number {
            return fragment * 1000 + row * 100 + col;
        },
        updateFlag: function () {
            this.items = [0, 2];
        },
        _getFieldFragment: function (fragment: number): Array<Array<number>> {
            return this.$store.state.Game.field[fragment.toString()];
        },
        _getColor: function (fragment: number, row: number, col: number): number {
            if (this.$store.state.Game.field[fragment.toString()][row][col] > SELF_PUT_OFFSET) {
                return this.$store.state.Game.field[fragment.toString()][row][col];
            }
            return this.$store.state.Game.template[fragment.toString()][row][col];
        },
        currentFragment: function (): number {
            return Math.ceil(this.items[1] / 2);
        },
        _checkIfPut(fragment: number, row: number, col: number): boolean {
            return this.$store.state.Game.field[fragment.toString()][row][col] !== 0 && this.$store.state.Game.field[fragment.toString()][row][col] < SELF_PUT_OFFSET;
        }
    },
    components: {
        Tile
    },
    mounted() {
        this.$store.commit('Game/updateIsMainScreen', false);
    },
    computed: {
        totalFragments: function(): number {
            return this.$store.state.Game.totalFieldFragments / 2;
        }
    }
}
export default FieldTilesPart;
</script>

<style scoped>
.fragment-number {
    color: #fefefe;
}

.pb-container {
    line-height: 0.7em;
}
</style>
