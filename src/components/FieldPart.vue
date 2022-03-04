<template>
    <router-link :to="{ name: 'FieldTilesPart', params: {items: this.fragmentNumbers} }" class="d-inline-flex">
        <canvas ref="fieldImage" width="80" v-bind:height="fragmentsCount * 80" class="field-part"></canvas>
    </router-link>
</template>

<script>
// @flow
const FieldPart: {} = {
    name: "FieldPart",
    data: function () {
        return {
            field: null
        }
    },
    props: {
        fragmentNumbers: Array,
        fragmentsCount: Number
    },
    methods: {
        getColorByNumber(n: number): string {

            function _getColorByName(name: string): string {
                return window.getComputedStyle(document.getElementById(name), null).getPropertyValue("background-color");
            }

            switch (n) {
                case 1:
                    return _getColorByName("color-1");
                case 2:
                    return _getColorByName("color-2");
                case 3:
                    return _getColorByName("color-3");
                //return '#be1119';
                case 4:
                    return _getColorByName("color-4");
                case 5:
                    return _getColorByName("color-5");
            }
            return ""
        }
    },
    mounted: function () {
        this.template = this.$store.state.Game.template;
        let ctx = this.$refs.fieldImage.getContext("2d");
        let y = 0;
        for (const part of this.fragmentNumbers) {
            for (const i of this.template[part]) {
                for (const x in i) {
                    ctx.fillStyle = this.getColorByNumber(i[x]);
                    ctx.fillRect(5 * parseInt(x), 5 * y, 5, 5);
                }
                y += 1;
            }
        }
    }
}
export default FieldPart;
</script>

<style scoped>
.field-part {
    border-width: 1px;
    border-color: var(--primary);
    border-style: solid;
}
</style>
