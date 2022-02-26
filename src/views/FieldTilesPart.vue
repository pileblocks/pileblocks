<template>
    <div>
        <div class="d-flex mb-2 justify-content-center">
            <b-button size="sm" :to="{ name: 'Home'}"><i class="bi bi-arrow-left"></i></b-button>
            <p class="lead fragment-number mb-0 ml-2">{{ currentFragment }} of 8</p>
        </div>/
        <div v-for="fragment in fragmentNums" :key="fragment">
            <div class="pb-container" v-for="(row, rowindex) in _getFieldFragment(fragment)" :key="genIndex(rowindex)">
                <tile v-for="(col, colindex) in row" :key="colindex" :color="_getColor(fragment, rowindex, colindex)"></tile>
            </div>

        </div>
    </div>
</template>

<script>
import Tile from '@/components/Tile';

export default {
    name: "FieldTilesPart",
    data: function () {
        return {
        }
    },
    methods: {
        genIndex: function () {
            return Math.floor(Math.random() * 100000);
        },
        getColor: function () {
            return Math.floor(Math.random() * 4) + 1;
        },
        _getFieldFragment: function (fragment) {
            return this.$store.state.Game.field[fragment];
        },
        _getColor: function (fragment, row, col) {
            return this.$store.state.Game.field[fragment][row][col];
        }
    },
    components: {
        Tile
    },
    mounted() {
    },
    computed: {
        fragmentNums: function ():Array<number> {
            return this.$route.params.items;
        },
        currentFragment: function ():Array<number> {
            return Math.ceil(this.$route.params.items[1] / 2);
        }
    }
}
</script>

<style scoped>

</style>
