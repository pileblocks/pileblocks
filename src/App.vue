<template>
  <div id="app" class="game-container">
    <div id="top-menu" class="stat-block">
      <div id="top-menu-logo">
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
    <div id="bottom-menu" class="stat-block mt-2">
      <div id="pile-colors">
        <div class="ml-2 mt-2"><b-button size="sm" variant="primary"><div class="color-span-1 d-inline-block">1</div> 156</b-button>
        </div>
        <div class="ml-2 mt-2"><b-button size="sm" variant="secondary"><div class="color-span-2 d-inline-block">2</div> 26</b-button>
        </div>
        <div class="ml-2 mt-2"><b-button size="sm" variant="secondary"><div class="color-span-3 d-inline-block">3</div> 241</b-button>
        </div>
        <div class="ml-2 mt-2"><b-button size="sm" variant="secondary"><div class="color-span-4 d-inline-block">4</div> 357</b-button>
        </div>
        <div class="ml-2 mt-2"><b-button size="sm" variant="secondary"><div class="color-span-5 d-inline-block">5</div> 499</b-button>
        </div>
      </div>
      <div id="claim-tiles">
        <div><b-button size="lg" variant="primary">Claim <small>1011</small></b-button></div>
      </div>
    </div>
  </div>
</template>

<script>
// @flow
//import Tile from "@/components/Tile";

const App: {} = {
  name: 'App'
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
}

.pb-tile {
  width: 19px;
  height: 19px;
  background-color: rgb(254, 208, 73);
  margin: 1px;
  padding-top: 3px;
  text-align: center;
}
.pb-container {
  line-height: 0.7em;
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
  grid-row: 3;
  grid-column: 1;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 3fr 2fr;
  border-top-color: #fff;
  border-top-width: 1px;
  border-top-style: solid;

}

.fragment-number {
  color: #fefefe;
}

.logo-img {
 height:40px;
 width:40px;
}

.high-procent {
  color: var(--green);
}

.color-span-1 {
  height: 20px;
  width: 20px;
  background-color: dodgerblue;
}
.color-span-2 {
  height: 20px;
  width: 20px;
  background-color: #345B63;
}
.color-span-3 {
  height: 20px;
  width: 20px;
  background-color: red;
}
.color-span-4 {
  height: 20px;
  width: 20px;
  background-color: #42b983;
}
.color-span-5 {
  height: 20px;
  width: 20px;
  background-color: #282846;
  color: #fff;
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

</style>
