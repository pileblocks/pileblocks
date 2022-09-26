<template>
    <div class="d-flex justify-content-center align-items-end">

        <button class="btn btn-nav" type="button" :disabled="this.$store.state.Game.gameId <= 2" v-on:click="loadPrevGame">
            <img src="~@/assets/icon-nav-prev.svg" class="button-icon" alt="" />
            <span class="btn__inner btn__inner-nav">
                <span class="btn__inner-shadow"></span>
                <span class="btn__inner-rect"></span>
            </span>
        </button>

        <p class="season-slogan fancy-font branded-main-text pl-5 pr-5">GAME {{ this.$store.state.Game.gameId }}: {{ this.$store.state.Game.name }}</p>

        <button class="btn btn-nav" type="button" :disabled="this.$store.state.Game.gameId >= this.$store.state.Game.lastGameId" v-on:click="loadNextGame">
            <img src="~@/assets/icon-nav-next.svg" class="button-icon" alt="" />
            <span class="btn__inner btn__inner-nav">
                <span class="btn__inner-shadow"></span>
                <span class="btn__inner-rect"></span>
            </span>
        </button>

     </div>
</template>

<script>
export default {
    name: "GameNavigation",
    methods: {
        loadPrevGame: function () {
            window.location.href = `/game/${this.$store.state.Game.gameId - 1}`;
        },
        loadNextGame: function () {
            window.location.href = `/game/${this.$store.state.Game.gameId + 1}`;
        }
    }
}
</script>

<style scoped>

</style>
