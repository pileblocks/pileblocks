<template>
    <div class="ml-0 mt-md-2 mt-1">
        <div class="btn balance-menu" v-on:click="setActiveColor">
            <div class="d-flex">
                <div :class="colorClass">{{this.btnColor}}</div>
                <span class="xxs-text span">{{ paddedColorNum }}</span>
            </div>
            <span class="btn__border">
                <span class="btn__border-top"></span>
                <span class="btn__border-bot"></span>
            </span>
            <span class="btn__inner-menu" :class="{'btn__inner-menu-active': isActive==='primary'}">
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "BottomMenuColor",
    props: {
        btnColor: Number
    },
    methods: {
        setActiveColor: function (): void {
            this.$store.commit('PlayerInfo/setCurrentColor', this.btnColor);
        }
    },
    computed: {
        isActive: function():string {
            return this.btnColor===this.$store.state.PlayerInfo.currentColor ? "primary" : "secondary";
        },
        colorClass: function():string {
            let basicClass = "span color-span d-inline-block mr-2 small no-outline ";
            if ([4,5].includes(this.btnColor)) {
                basicClass += "light-border ";
            }
            basicClass += `color-${this.btnColor}`;
            return basicClass;
        },
        paddedColorNum: function():string {
            return this.$store.state.PlayerInfo.colors[this.btnColor - 1];
        }
    }
}
</script>

<style scoped>

</style>
