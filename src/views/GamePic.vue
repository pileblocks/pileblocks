<template>
<div class="d-flex justify-content-center mt-2">
    <div>
    <div v-for="f in FIRST_FRAGMENT" :key="genKey(f, 0, 0)" class="d-flex flex-column">
        <div v-for="y in Y" :key="genKey(f, y, 0)" class="d-flex">
            <div v-for="x in X" :class="getClassByElement(x, y, f)" :key="genKey(f, y, x)">
            </div>
        </div>
    </div>
    </div>
    <div>
    <div v-for="f in SECOND_FRAGMENT" :key="genKey(f, 0, 0)" class="d-flex flex-column">
        <div v-for="y in Y" :key="genKey(f, y, 0)" class="d-flex">
            <div v-for="x in X" :class="getClassByElement(x, y, f)" :key="genKey(f, y, x)">
            </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>
export default {
    name: "GamePic",
    data: function () {
        return {
            FIRST_FRAGMENT: [],
            SECOND_FRAGMENT: [],
            X: [],
            Y: []
        }
    },
    mounted() {

        function getRange(start:number, qty: number) {
            let arr  = [];
            for (let i=start; i< start + qty; i++) {
                arr.push(i);
            }
            return arr
        }
        let hFragments = this.$store.state.Game.totalFieldFragments / this.$store.state.Game.columns;
        this.FIRST_FRAGMENT = getRange(0, hFragments);
        this.SECOND_FRAGMENT = getRange(this.$store.state.Game.totalFieldFragments - hFragments, this.$store.state.Game.totalFieldFragments - hFragments);
        this.X = getRange(0, 16);
        this.Y = getRange(0, 8);
    },
    methods: {
        getClassByElement: function(x, y, f) {
            if (this.$store.state.Game.template[f][y][x] < 5) {
                return `filled-tile pb-tile color-${this.$store.state.Game.template[f][y][x]}`;
            }
            return `filled-tile-light pb-tile color-${this.$store.state.Game.template[f][y][x]}`;
        },
        genKey: function (x, y, z) {
            return parseInt(x) * 1000 + parseInt(y) * 100 + parseInt(z);
        }
    }
}
</script>

<style scoped>
.pb-tile {
    width: 21px;
    height: 21px;
    background-color: rgb(254, 208, 73);
    border: 1px solid var(--secondary);
    line-height: 19px;
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
