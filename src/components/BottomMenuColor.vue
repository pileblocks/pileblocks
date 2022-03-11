<template>
    <div class="ml-2 mt-2">
        <b-button size="sm" :variant="isActive" v-on:click="setActiveColor">
            <div :class="colorClass">{{this.btnColor}}</div>
            <span class="small">{{ paddedColorNum }}</span>
        </b-button>
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
            let basicClass = "fancy-font color-span d-inline-block mr-2 ";
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
