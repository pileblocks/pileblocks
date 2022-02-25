<template>
<!-- <div class="d-flex mb-2 justify-content-center">
   <b-button size="sm"><i class="bi bi-arrow-left"></i></b-button>
   <p class="lead fragment-number mb-0 ml-2">1 of 16</p>
 </div>
 <div class="pb-container" v-for="(item, index) in items" :key="genIndex(index)">
   <tile v-for="(item, index) in items" :key="index" :color="getColor()"></tile>
 </div>
 -->
</template>

<script>
export default {
    name: "FieldTilesPart",
    methods: {
        genIndex: function () {
            return Math.floor(Math.random() * 100000);
        },
        getColor: function () {
            return Math.floor(Math.random() * 4) + 1;
        }
    },
}
</script>

<style scoped>

</style>
