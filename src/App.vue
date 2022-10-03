<template>

    <div id="app">

        <div class="overlay overlay-background" v-if="this.$store.state.Ever.isLoading">
              <b-spinner  variant="primary"></b-spinner>
        </div>
        <div>
            <div id="color-1" class="color-1"></div>
            <div id="color-2" class="color-2"></div>
            <div id="color-3" class="color-3"></div>
            <div id="color-4" class="color-4"></div>
            <div id="color-5" class="color-5"></div>
            <ever-loader></ever-loader>
        </div>
        <div class="game-container" v-if="!noGames && !gamePending && providerLoaded && !this.$store.state.Ever.isLoading">
            <div class="game-container-wrapper">
                <top-menu id="top-menu" class="stat-block pt-1 position-relative"/>
                <div id="field" class="branded-bg">
                    <div id="field-bg-overlay">
                        <router-view/>
                    </div>
                </div>
                <bottom-menu id="bottom-menu"/>
            </div>
        </div>
        <div class="game-container" v-if="!noGames && !gamePending && !providerLoaded && !this.$store.state.Ever.isLoading">
            <div class="game-error-notification">
                <div class="p-4 stat-block text-center">PileBlocks requires the EVER wallet to launch. Please install the <span class="color-primary"><u><a href="https://l1.broxus.com/" target="_blank">EVER wallet</a></u></span> or update the permissions</div>
            </div>
        </div>
        <div class="game-container" v-if="!noGames && gamePending && !this.$store.state.Ever.isLoading">
            <game-countdown></game-countdown>
        </div>
        <div class="game-container" v-if="noGames && !this.$store.state.Ever.isLoading">
            <game-list-empty></game-list-empty>
        </div>
    </div>

</template>

<script>
// @flow

import BottomMenu from "./components/BottomMenu";
import TopMenu from "./components/TopMenu";
import EverLoader from "./components/EverLoader";
import {
    LOADING_STATUS_EMPTY_GAME_LIST,
    LOADING_STATUS_GAME_PENDING,
    LOADING_STATUS_NO_PERMISSIONS,
    LOADING_STATUS_PROVIDER_NOT_LOADED
} from "@/AppConst";
import GameCountdown from "@/components/GameCountdown";
import GameListEmpty from "@/components/GameListEmpty";
import ToastList from "@/components/ToastList";

const App: {} = {
    name: 'App',
    components: {ToastList, GameListEmpty, GameCountdown, EverLoader, TopMenu, BottomMenu},
    computed: {
        providerLoaded: function() {
            return !(this.$store.state.Ever.loadingStatus in [LOADING_STATUS_PROVIDER_NOT_LOADED, LOADING_STATUS_NO_PERMISSIONS]);
        },
        gamePending: function() {
            return this.$store.state.Ever.loadingStatus === LOADING_STATUS_GAME_PENDING;
        },
        noGames: function() {
            return this.$store.state.Ever.loadingStatus === LOADING_STATUS_EMPTY_GAME_LIST;
        }

    },
    data: function() {
        return {
        }
    }
}
export default App;
</script>

<style>
#app {
    height: 100%;
}
.overlay {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
}

#field {
    text-align: center;
    grid-row: 2;
    overflow-y: hidden;
}

@media (min-width: 576px) {
    body {
        height: 100vh;
    }

    #claim-tiles {
        margin-top: 1em;
    }



}




#loader {
    display: flex;
    justify-content: center;
    height: 100%;
    overflow-y: hidden;
}

.game-container {
    background-image: url('~@/assets/field-background.svg');
    background-repeat: repeat;
    background-position: center;
    height: 100%;
    overflow-y: hidden;
}

@keyframes game-container-bg-animation {
  from {
      background-position-x: 0px;
      background-position-y: 0px;
  }
  to {
      background-position-x: 210px;
      background-position-y: -210px;
  }
}

.game-container-wrapper {
    display: grid;
    grid-template-rows: 75px 1fr 80px;
    grid-template-columns: 1fr;
    width: 100%;
    height: 100%;
    background-image: url('~@/assets/field-overlay.svg');
    background-repeat: no-repeat;
    background-size: cover;
	background-position: center;
}

.game-error-notification {
    grid-column: 1;
    grid-row: 1 / 3;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
}

#top-menu {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 2fr 40px;
    align-items: center;
    background-image: url('~@/assets/top-menu.svg');
    background-repeat-x: repeat;
    background-repeat-y: no-repeat;
    background-position: top;
    background-size: contain;
    height: 65px;
}

.stat-block {
    color: #fff;
    font-size: 12pt;

}

.fancy-font {
}


#top-menu-player-info {
    grid-row: 1;
    grid-column: 2;
    padding-right: 5px;
    height: 100%;
}

#top-menu-game-stats {
    grid-row: 1;
    grid-column: 1;
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: flex-start;
}

#top-menu-game-reload {
    grid-row: 1;
    grid-column: 3;
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: flex-start;
}

#top-menu-game-lang {
    grid-row: 1;
    grid-column: 4;
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: flex-start;
}

#bottom-menu {
    display: grid;
    grid-row: 3;
    grid-column: 1;
    grid-template-rows: 1fr;
    grid-template-columns: 3fr 1fr;
    background-image:  url('~@/assets/bottom-menu.svg');

}

body, html {
    height: 100%;
    font-family: 'Maven Pro', sans-serif !important;
}

.logo-img {
    height: 40px;
    width: 40px;
}

.color-span {
    height: 20px;
    width: 20px;
    border: rgba(200, 200, 200, 0.8) 1px solid;
}

#pile-colors {
    display: flex;
    justify-content: flex-start;
    grid-column: 1;
    flex-wrap: wrap;
}

#claim-tiles {
    grid-column: 2;
    display: flex;
    justify-content: center;
    align-items: center;
}

.d-contents {
    display: contents;
}

.light-border {
    border: rgba(255, 255, 255, 0.5) 1px solid;
}
.color-primary {
    color: var(--primary) !important;
}

.branded-body {
}
.branded-main-text {
    font-weight: 800;
    text-shadow: #000 0px 0px 1px, #000 0px 0px 1px, #000 0px 0px 1px, #000 0px 0px 1px, #000 0px 0px 1px, #000 0px 0px 1px;

}

.branded-bg {
    /*
    background-image: url('~@/assets/game-bg.png') !important;
     */
}

@media (max-width: 576px) {
    .branded-bg {
        /*
        background-image: url('~@/assets/game-bg-mob.png') !important;
         */
    }
}

.modal-header {
    background-image: url('~@/assets/title-background.svg');
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
    border-bottom: 0 !important;
    border-radius: 0 !important;
}

.modal-content {
    border: 0;
    background-color: #5A1C80 !important;
    background-image: url('~@/assets/popup-background.png');
}

.modal-body {

}
@media (max-width: 576px) {
    .modal-dialog {
        margin: 0 !important;
    }
}
.close {
    opacity: 1 !important;
    font-size: 1rem !important;
}
.close:not(:disabled):not(.disabled):hover {
    opacity: 1 !important;
}

.button-icon {
    height: 25px;
    width: 25px;
    margin: 5px 0px;
}
#field-bg-overlay {
	height: 100%;
}

@media (max-width: 576px) {
    #field-bg-overlay {
        overflow-y: scroll;
    }
}


.button-spinner {
    min-width: 25px;
    min-height: 25px;
    margin: 5px 0px;
    color: var(--secondary)
}

.app-overlay {
	background-image: url('~@/assets/bottom-menu.svg');
}

.overlay-background {
    background-image: url('~@/assets/hero.webp');
    background-position: right;
    background-size: cover;
}
</style>
