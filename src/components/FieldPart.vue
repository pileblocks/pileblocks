<template>
        <router-link :to="{ name: 'FieldTilesPart', params: {items: this.fragmentNumbers} }" class="d-inline-flex">
            <canvas ref="fieldImage" width="80" v-bind:height="fragmentsCount * 80" style="border: 1px solid var(--primary);"></canvas>
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
            switch (n) {
                case 1:
                    return '#fefefe';
                case 2:
                    return '#aab0bc';
                case 3:
                    return '#60697b';
                case 4:
                    return '#2f353a';
                case 5:
                    return '#1e2228';
            }
            return ""
        }
    },
    mounted: function () {
        this.field = this.$store.state.Game.field;
        let ctx = this.$refs.fieldImage.getContext("2d");
        let y = 0;
        for (const part of this.fragmentNumbers) {
            for (const i of this.field[part]) {
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

</style>
