<template>

    <div id="app">
        <div class="overlay" v-if="this.$store.state.Ever.isLoading">
                <img src="~@/assets/logo.svg" class="img-fluid" alt=""/>
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
            <top-menu id="top-menu" class="stat-block"/>
            <div id="field">
                <router-view/>
            </div>
            <bottom-menu id="bottom-menu"/>
            <toast-manager></toast-manager>
        </div>
        <div class="game-container" v-if="!noGames && !gamePending && !providerLoaded && !this.$store.state.Ever.isLoading">
            <div class="game-error-notification">
                <div class="fancy-font stat-block text-center">Install the <span class="color-primary"><u><a href="https://l1.broxus.com/" target="_blank">EVER wallet</a></u></span> or update the permissions</div>
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
import ToastManager from "./components/ToastManager";
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

const App: {} = {
    name: 'App',
    components: {GameListEmpty, GameCountdown, EverLoader, TopMenu, ToastManager, BottomMenu},
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
    overflow-y: scroll;
    background-image: url('~@/assets/game-wp.png');
    background-repeat-y: no-repeat;
    background-size: cover;
    background-position: center;

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
    display: grid;
    grid-template-rows: 75px 1fr 90px;
    grid-template-columns: 1fr;
    height: 100%;
    overflow-y: hidden;
}

.game-error-notification {
    grid-column: 1;
    grid-row: 1 / 3;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

#top-menu {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr 3fr;
    border-bottom-color: #fefefe;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    align-items: center;
    margin-top: 0.5em;
}

.stat-block {
    color: #fff;
    font-size: 12pt;
    font-family: 'Bebas Neue', cursive;
}

.fancy-font {
    font-family: 'Bebas Neue', cursive;
}

#top-menu-logo {
    grid-row: 1;
    grid-column: 1;
    display: flex;
    justify-content: center;
}

#top-menu-player-info {
    grid-row: 1;
    grid-column: 4;
    padding-right: 5px;
}

#top-menu-game-stats {
    grid-row: 1;
    grid-column: 2;
    display: flex;
    justify-content: center;
}

#top-menu-game-reload {
    grid-row: 1;
    grid-column: 3;
    display: flex;
    justify-content: center;
}

#bottom-menu {
    display: grid;
    grid-row: 3;
    grid-column: 1;
    grid-template-rows: 1fr;
    grid-template-columns: 4fr 2fr;
    border-top-color: #fff;
    border-top-width: 1px;
    border-top-style: solid;

}

body, html {
    height: 100%;
}

.logo-img {
    height: 40px;
    width: 40px;
}

.color-span {
    height: 20px;
    width: 20px;
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

.field-stats {
    display: flex;
    column-gap: 1em;
    justify-content: space-around;
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

</style>
