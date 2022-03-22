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
        <div class="game-container" v-if="this.$store.state.Ever.extensionWorks && !this.$store.state.Ever.isLoading">
            <top-menu id="top-menu" class="stat-block"/>
            <div id="field">
                <router-view/>
            </div>
            <bottom-menu id="bottom-menu"/>
            <toast-manager></toast-manager>
        </div>
        <div class="game-container" v-if="!this.$store.state.Ever.extensionWorks && !this.$store.state.Ever.isLoading">
            <div class="game-error-notification">
                <div class="fancy-font stat-block text-center">Install the EVER wallet or update the permissions</div>
            </div>
        </div>
    </div>

</template>

<script>
// @flow

import BottomMenu from "./components/BottomMenu";
import ToastManager from "./components/ToastManager";
import TopMenu from "./components/TopMenu";
import EverLoader from "./components/EverLoader";

const App: {} = {
    name: 'App',
    components: {EverLoader, TopMenu, ToastManager, BottomMenu},
    computed: {},
    data: function() {
        return {
        }
    },

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
    height: calc(100vh - 60px);
    overflow-y: hidden;
}

.game-container {
    display: grid;
    grid-template-rows: 80px 9fr 2fr;
    grid-template-columns: 1fr;
    height: calc(100vh - 60px);
    overflow-y: hidden;
}

.game-error-notification {
    grid-column: 1;
    grid-row: 1 / 3;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

body {
    height: calc(100vh - 60px);
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
    grid-template-columns: 3fr 2fr;
    border-top-color: #fff;
    border-top-width: 1px;
    border-top-style: solid;

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
    justify-content: center;
}

.d-contents {
    display: contents;
}

.light-border {
    border: rgba(255, 255, 255, 0.5) 1px solid;
}
/*
.color-1 {
    background-color: #fefefe !important;
    color: #1e2228;
}

.color-2 {
    background-color: #aab0bc !important;
    color: #fefefe;
}

.color-3 {
    background-color: #60697b !important;
    color: #fefefe;
}

.color-4 {
    background-color: #2f353a !important;
    color: #fefefe;
}
*/
.color-primary {
    color: var(--primary);
}

</style>
