<template>
    <div class="game-error-notification fancy-font stat-block">
        <div class="text-center lead mb-4"> The new game <span class="emphasis">starts</span> in:</div>
        <div class="d-flex width-100 justify-content-evenly mb-4">
            <div class="time-cell d-flex flex-column">
                <div class="text-center countdown-value">{{ rDate.rDays }}</div>
                <div class="text-uppercase">days</div>
            </div>
            <div class="time-cell d-flex flex-column">
                <div class="text-center countdown-value">{{ rDate.rHours }}</div>
                <div class="text-uppercase">hours</div>
            </div>
            <div class="time-cell d-flex flex-column">
                <div class="text-center countdown-value">{{ rDate.rMinutes }}</div>
                <div class="text-uppercase">min</div>
            </div>
            <div class="time-cell d-flex flex-column">
                <div class="text-center countdown-value">{{ rDate.rSeconds }}</div>
                <div class="text-uppercase">sec</div>
            </div>
        </div>
        <div class="text-center"> Please reload the page once ready.</div>
    </div>
</template>

<script>
export default {
    name: "GameCountdown",
    data: function () {
        return {
            rDate: { rDays: 0, rHours: 0, rMinutes: 0, rSeconds: 0 },
        }
    },
    computed: {
        gameStartTime: function () {
            return this.$store.state.Game.gameStartTime;
        }
    },

    methods: {
        calculateRemainingDate() {
            let now = Math.floor(Date.now() / 1000);
            if (now > this.gameStartTime) {
                this.rDate.rDays = 0;
                this.rDate.rHours = 0;
                this.rDate.rMinutes = 0;
                this.rDate.rSeconds = 0;
                return;
            }
            this.rDate.rDays = Math.floor((this.gameStartTime - now) / (60 * 60 * 24));
            this.rDate.rHours = Math.floor(((this.gameStartTime - now - this.rDate.rDays * 60 * 60 * 24) / (60 * 60)));
            this.rDate.rMinutes = Math.floor((this.gameStartTime - now - this.rDate.rDays * 60 * 60 * 24 - this.rDate.rHours * 60 * 60) / 60);
            this.rDate.rSeconds = Math.floor(this.gameStartTime - now - this.rDate.rDays * 60 * 60 * 24 - this.rDate.rHours * 60 * 60 - this.rDate.rMinutes * 60);
        },
    },

    mounted() {
        setInterval(this.calculateRemainingDate, 1000);
    }
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
