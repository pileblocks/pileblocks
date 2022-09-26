<template>
    <div class="game-error-notification fancy-font stat-block">
        <div class="text-center lead mb-4"> The new game <span class="emphasis">starts</span> in:</div>
        <div class="d-flex width-100 justify-content-center mb-4 countdown-box align-items-center">

            <div class="btn">
                <div class="time-cell d-flex flex-column span">
                    <div class="text-center countdown-value">{{ rDate.rDays }}</div>
                    <div class="text-uppercase">days</div>
                </div>
                <span class="btn__border">
                    <span class="btn__border-top"></span>
                    <span class="btn__border-bot"></span>
                </span>
                <span class="btn__inner-menu">
                </span>
            </div>

            <div class="btn">
                <div class="time-cell d-flex flex-column span">
                    <div class="text-center countdown-value">{{ rDate.rHours }}</div>
                    <div class="text-uppercase">hrs</div>
                </div>
                <span class="btn__border">
                    <span class="btn__border-top"></span>
                    <span class="btn__border-bot"></span>
                </span>
                <span class="btn__inner-menu">
                </span>
            </div>

            <div class="btn">
                <div class="time-cell d-flex flex-column span">
                    <div class="text-center countdown-value">{{ rDate.rMinutes }}</div>
                    <div class="text-uppercase">min</div>
                </div>
                <span class="btn__border">
                    <span class="btn__border-top"></span>
                    <span class="btn__border-bot"></span>
                </span>
                <span class="btn__inner-menu">
                </span>
            </div>

            <div class="btn">
                <div class="time-cell d-flex flex-column span">
                    <div class="text-center countdown-value">{{ rDate.rSeconds }}</div>
                    <div class="text-uppercase">sec</div>
                </div>
                <span class="btn__border">
                    <span class="btn__border-top"></span>
                    <span class="btn__border-bot"></span>
                </span>
                <span class="btn__inner-menu">
                </span>
            </div>

        </div>
        <div class="text-center mb-5"> Please reload the page once ready.</div>

        <game-navigation></game-navigation>

    </div>
</template>

<script>
import GameNavigation from "@/components/GameNavigation";
export default {
    name: "GameCountdown",
    components: {GameNavigation},
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
.countdown-box {
    background-image: url('~@/assets/icon-countdown-box.svg');
    background-repeat: no-repeat;
    background-position: top;
    background-size: contain;
    height: 190px;
}
</style>
