<template>
    <div class="game-error-notification fancy-font stat-block">
        <div class="text-center lead mb-4">There are <span class="emphasis">No</span> active games currently!</div>
        <div class="d-flex width-100 justify-content-evenly mb-4">
            <img src="~@/assets/sandwatch.svg">
        </div>
        <div class="text-center"> Join our <a href="https://t.me/pileblocks_group"><span class="emphasis">@Telegram Channel</span></a> to get informed about the new games</div>
    </div>
</template>

<script>
export default {
    name: "GameListEmpty"
}
</script>

<style scoped>
.justify-content-evenly {
    justify-content: space-evenly !important;
}
.emphasis {
    color: var(--green);
}
.countdown-value {
    color: var(--primary);
}
</style>
