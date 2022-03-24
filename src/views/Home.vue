<template>
    <div id="field-parts-wrapper">
        <div class="stat-block text-left field-stats mt-1 mb-1">
            <p class="mb-0" v-on:click="updateStandings"><small>YOU CAPTURED:</small> {{ $store.getters["Game/getCapturedTiles"] }}
            </p>
            <p class="mb-0"><small>REMAINING:</small> {{ $store.state.Game.remainingTiles }}</p>
            <p class="mb-0"><small>TOTAL REWARD:</small> {{ $store.state.Game.totalReward }}</p>
        </div>
        <div class="d-flex flex-row justify-content-center">
            <div v-for="index in 2" :key="index" class="d-grid">
                <field-part v-for="item in getPartsArray(totalFieldFragments, index)" :fragmentNumbers="item"
                            :fragmentsCount="1" :key="_genKey(item)"></field-part>
            </div>
        </div>
        <p class="season-slogan fancy-font">{{ this.$store.state.Game.name }}</p>
    </div>
</template>

<script>
// @flow

import FieldPart from "../components/FieldPart";

const Home: {} = {
    name: "FieldParts",
    data: function () {
        return {
            totalFieldFragments: 0
        }
    },
    methods: {
        _genKey: function (item: Array<number>): string {
            return item.join("/");
        },
        updateStandings: function () {
            this.$store.commit('Game/calculateRewards');
        },
        getPartsArray: function (numberOfFragments: number, part: number): Array<Array<number>> {
            let fragments: Array<number> = Array.from(Array(numberOfFragments).keys());
            let fragmentPairs: Array<Array<number>> = [[]];
            for (let i = 0; i < numberOfFragments - 1; i += 2) {
                fragmentPairs.push([fragments[i], fragments[i + 1]]);
            }
            if (part === 1) {
                fragmentPairs = fragmentPairs.filter((item) => item[0] < fragments.length / 2);
            } else {
                fragmentPairs = fragmentPairs.filter((item) => item[0] >= fragments.length / 2);
            }
            return fragmentPairs;

        }
    },
    components: {
        FieldPart
    },
    mounted: function () {
        this.totalFieldFragments = this.$store.state.Game.totalFieldFragments;
        this.$store.commit('Game/updateIsMainScreen', true);
    }
}
export default Home;
</script>

<style scoped>
#field-parts-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    justify-content: space-evenly;
}

@media (min-width: 576px) {
    #field-parts-wrapper {
        /*justify-content: flex-start;*/
    }
}

.d-grid {
    display: grid;
}
.season-slogan {
 color: white;
}
</style>
