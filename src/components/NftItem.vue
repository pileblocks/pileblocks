<template>
    <div class="card__overlay m-1">
        <img :src="nft.preview.source" class="card__img m-1" :class="{'card__img__disabled': isLoading}"/>
        <div class="d-flex justify-content-center">
            <select  aria-label="Default select example" v-model="selectedPlayer" :disabled="isLoading" v-show="nft.nftType !== OP_SET_BLOCK_COLOR">
              <option v-for="player in $store.state.Game.standings" :value="player.playerAddress" :key="player.playerAddress">{{ player.playerAddress | short }}</option>
            </select>
            <button class="btn btn-menu ml-2" type="button" v-on:click="applyNft" :disabled="isLoading">
                <span class="span p-1">{{ $t('bottomMenu.nftMenu.apply') }}</span>

                <span class="btn__border">
                    <span class="btn__border-top"></span>
                    <span class="btn__border-bot"></span>
                </span>

                <span class="btn__inner btn__inner-main">
                    <span class="btn__inner-shadow"></span>
                    <span class="btn__inner-rect"></span>
                </span>
            </button>
        </div>
    </div>
</template>

<script>
import {OP_SET_BLOCK_COLOR} from "@/AppConst";

export default {
    name: "NftItem",
    data: function () {
        return {
            selectedPlayer: '',
            OP_SET_BLOCK_COLOR: OP_SET_BLOCK_COLOR
        }
    },
    props: ['nft'],
    methods: {
        applyNft: async function () {

            let applyTarget = this.selectedPlayer === '' ?  this.$store.state.PlayerInfo.playerAddress : this.selectedPlayer;

            try {
                this.$store.commit('Ever/isOpInProgress', true);
                await this.$store.dispatch('Ever/applyNft', {nftAddress: this.nft.nftAddress, targetPlayer: applyTarget});
            } catch(e) {
                this.$store.commit('Ever/isOpInProgress', false);
                console.log(e);
            }
        }
    },
    computed: {
        isLoading: function(): boolean {
            //return true
            return this.$store.state.Ever.operationInProgress;
        },
    },
    async mounted() {
        console.log(this.nft)
    }
}
</script>

<style scoped>
.card__img {
    max-height: 256px;
}

.card__overlay {
    background-color: #3c2968;
    padding: 1em;
    border-radius: 8px;
}
.card__img__disabled {
    opacity: 0.4;
}
</style>
