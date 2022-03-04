<template>
    <div id="app" class="game-container">
        <div id="top-menu" class="stat-block">
            <div id="top-menu-logo">
                <div id="color-1" class="color-1"></div>
                <div id="color-2" class="color-2"></div>
                <div id="color-3" class="color-3"></div>
                <div id="color-4" class="color-4"></div>
                <div id="color-5" class="color-5"></div>
                <img src="./assets/logo.svg" alt="PileBlocks" class="logo-img"/>
            </div>
            <div id="top-menu-player-info">
                <p class="mb-0">Balance: 1120<small>.75</small></p>
                <p class="mb-0">Your Reward: 310<small>.00</small> (<span class="high-procent">38.5%</span>)</p>
            </div>
            <div id="top-menu-game-stats">
                <b-button size="sm" variant="primary"><i class="bi bi-person-lines-fill"></i> 12</b-button>
            </div>
            <div id="top-menu-game-reload">
                <b-button size="sm" variant="primary"><i class="bi bi-arrow-clockwise"></i></b-button>
            </div>
        </div>
        <div id="field">
            <router-view/>
        </div>
        <bottom-menu id="bottom-menu"/>
    </div>
</template>

<script>
// @flow

import BottomMenu from "./components/BottomMenu";
const App: {} = {
    name: 'App',
    components: {BottomMenu},
    computed: {
    }
}
export default App;
</script>

<style>
#field {
    text-align: center;
    grid-row: 2;
    overflow-y: scroll;
    margin-top: 0.5em;
}

@media (min-width: 576px) {
    body {
        height: 100vh;
    }
    #claim-tiles {
        margin-top: 1em;
    }
}


.game-container {
    display: grid;
    grid-template-rows: 80px 9fr 2fr;
    grid-template-columns: 1fr;
    height: calc(100vh - 60px);
    overflow-y: hidden;
}

body {
    height: calc(100vh - 60px);
}

#top-menu {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 2fr 1fr;
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

#top-menu-logo {
    grid-row: 1;
    grid-column: 1;
    display: flex;
    justify-content: center;
}

#top-menu-player-info {
    grid-row: 1;
    grid-column: 3;
}

#top-menu-game-stats {
    grid-row: 1;
    grid-column: 2;
    display: flex;
    justify-content: center;
}

#top-menu-game-reload {
    grid-row: 1;
    grid-column: 4;
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

.high-procent {
    color: var(--green);
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

.color-1 {
    background-color: #fefefe !important;
}

.color-2 {
    background-color: #aab0bc !important;
}

.color-3 {
    background-color: #60697b !important;
}

.color-4 {
    background-color: #2f353a !important;
}

.color-5 {
    background-color: #1e2228 !important;
}

</style>
