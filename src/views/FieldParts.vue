<template>
    <fragment>
        <div id="field-parts-wrapper">
            <div class="stat-block text-left field-stats">
                <p class="mb-0"><small>YOU CAPTURED:</small> 344</p>
                <p class="mb-0"><small>REMAINING:</small> 1284</p>
                <p class="mb-0"><small>TOTAL REWARD:</small> 5000</p>
            </div>
            <div class="d-flex flex-row justify-content-center">
                <!--
                <field-part :fragmentNumbers="[0,1,2,3]" :fragmentsCount="2"></field-part>
                -->

                <div v-for="index in 2" :key="index" class="d-grid">
                    <field-part v-for="item in getPartsArray(totalFieldFragments, index)" :fragmentNumbers="item" :fragmentsCount="1" :key="_genKey(item)"></field-part>
                </div>

            </div>
        </div>
    </fragment>
</template>

<script>
// @flow

import FieldPart from "../components/FieldPart";

const FieldParts: {} = {
    name: "FieldParts",
    data: function () {
        return {
            totalFieldFragments: 0
        }
    },
    methods: {
        _genKey(item:Array<number>):string {
            return item.join("/");
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
    }
}
export default FieldParts;
</script>

<style scoped>
#field-parts-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;
}

@media (min-width: 576px) {
    #field-parts-wrapper {
        justify-content: flex-start;
    }
}

.d-grid {
    display: grid;
}
</style>
