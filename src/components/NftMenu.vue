<template>
    <div class="d-flex justify-content-center flex-wrap">
        <div v-for="nft in this.$store.state.Nft.nfts" :key="nft.id" v-show="!isLocalLoading">
            <nft-item :nft="nft"/>
        </div>
        <b-spinner small class="span button-spinner" v-show="isLocalLoading"></b-spinner>
        <p v-if="this.$store.state.Nft.nfts.length === 0">
            {{ $t('bottomMenu.nftMenu.noNfts') }}<a href='https://t.me/pileblocks_group' target="_blank">{{ $t('bottomMenu.nftMenu.ourTgGroup') }}</a>
        </p>
    </div>
</template>

<script>

import NftItem from "@/components/NftItem";

export default {
    name: "NftMenu",
    data: function () {
        return {
            isLocalLoading: false
        }
    },
    components: {NftItem},
    methods: {
    },
    computed: {
    },
    async mounted() {
        this.isLocalLoading = true;
        await this.$store.dispatch('Ever/reloadNft', this.everx);
        this.isLocalLoading = false;
    }
}
</script>

<style scoped>
.card__img {
    max-height: 256px;
}
</style>
