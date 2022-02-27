<template>
    <div>
        <div class="d-flex mb-2 justify-content-center">
            <b-button size="sm" :to="{ name: 'Home'}"><i class="bi bi-arrow-left"></i></b-button>
            <p class="lead fragment-number mb-0 ml-2">{{ currentFragment() }} of 8</p>
        </div>/
        <div v-for="fragment in this.items" :key="fragment">
            <div class="pb-container" v-for="(row, rowindex) in _getFieldFragment(fragment)" :key="genIndex(fragment, rowindex, 0)">
                <div v-for="(col, colindex) in row" :key="genIndex(fragment, rowindex, colindex)" v-on:click.capture="parentClick" class="d-inline">
                    <tile :color="_getColor(fragment, rowindex, colindex)"></tile>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
// @flow
import Tile from "../components/Tile";

const FieldTilesPart = {
    name: "FieldTilesPart",
    data: function (): {} {
        return {
        }
    },
    props: {
      items: Array
    },
    methods: {
        genIndex: function (fragment:number, row:number, col:number):number {
            return fragment * 1000 + row * 100 + col;
        },
        _getFieldFragment: function (fragment: number):Array<Array<number>> {
            return this.$store.state.Game.field[fragment.toString()];
        },
        _getColor: function (fragment: number, row: number , col: number):number {
            return this.$store.state.Game.field[fragment.toString()][row][col];
        },
        parentClick: function (event: Object) {
          console.log("Parent click");
          event.stopPropagation();
        },
        currentFragment: function ():number {
            return Math.ceil(this.items[1] / 2);
        }
    },
    components: {
        Tile
    },
    mounted() {
    }
}
export default FieldTilesPart;
</script>

<style scoped>

</style>
