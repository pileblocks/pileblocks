<template>
        <div id="bottom-menu" class="stat-block mt-2">
            <div id="pile-colors">
                <div class="ml-2 mt-2">
                    <b-button size="sm" variant="primary">
                        <div class="color-span color-1 d-inline-block">1</div>
                        {{ this.$store.state.PlayerInfo.colors[0] }}
                    </b-button>
                </div>
                <div class="ml-2 mt-2">
                    <b-button size="sm" variant="secondary">
                        <div class="color-span color-2 d-inline-block">2</div>
                        {{ this.$store.state.PlayerInfo.colors[1] }}
                    </b-button>
                </div>
                <div class="ml-2 mt-2">
                    <b-button size="sm" variant="secondary">
                        <div class="color-span color-3 d-inline-block">3</div>
                        {{ this.$store.state.PlayerInfo.colors[2] }}
                    </b-button>
                </div>
                <div class="ml-2 mt-2">
                    <b-button size="sm" variant="secondary">
                        <div class="color-span color-4 d-inline-block light-border">4</div>
                        {{ this.$store.state.PlayerInfo.colors[3] }}
                    </b-button>
                </div>
                <div class="ml-2 mt-2">
                    <b-button size="sm" variant="secondary">
                        <div class="color-span color-5 d-inline-block light-border">5</div>
                        {{ this.$store.state.PlayerInfo.colors[4] }}
                    </b-button>
                </div>
            </div>
            <div id="claim-tiles">
                <div>
                    <b-button size="lg" variant="primary">Claim <small>1011</small></b-button>
                </div>
            </div>
        </div>
</template>

<script>
// @flow
export default {
    name: "BottomMenu"
}
</script>

<style scoped>

</style>
