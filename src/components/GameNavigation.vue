<template>
    <div class="text-center mt-3">
        <b-button size="sm" variant="secondary" v-if="this.$store.state.Game.gameId > 1" v-on:click="loadPrevGame" class="mr-3"><i class="bi bi-chevron-double-left"></i> {{$t("home.previousGame")}}</b-button>
        <b-button size="sm" variant="secondary" v-if="this.$store.state.Game.gameId < this.$store.state.Game.lastGameId" v-on:click="loadNextGame">{{$t("home.nextGame")}} <i class="bi bi-chevron-double-right"></i></b-button>
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
