<template>

        <b-overlay :show="false" variant="secondary" spinner-variant="primary" opacity="0.97" id="app">
            <div class="game-container">
                <top-menu id="top-menu" class="stat-block"/>
                <div id="field">
                    <router-view/>
                </div>
                <bottom-menu id="bottom-menu"/>
                <toast-manager></toast-manager>
            </div>
        </b-overlay>

</template>

<script>
// @flow

import BottomMenu from "./components/BottomMenu";
import ToastManager from "@/components/ToastManager";
import TopMenu from "@/components/TopMenu";
import {Address, ProviderRpcClient, TvmException} from "everscale-inpage-provider";
import {PBGameContract} from "@/contract_wrappers/PBGame"
const App: {} = {
    name: 'App',
    components: {TopMenu, ToastManager, BottomMenu},
    computed: {
    },
    async mounted() {
        /*
        const ever = new ProviderRpcClient();
          if (!(await ever.hasProvider())) {
            throw new Error('Extension is not installed');
          }
          await ever.ensureInitialized();

          const { accountInteraction } = await ever.requestPermissions({
            permissions: ['basic', 'accountInteraction'],
          });
          if (accountInteraction == null) {
            throw new Error('Insufficient permissions');
          }
          console.log(accountInteraction.address);
          const gameAddress = new Address('0:260c2557486ba0c1ec1bfe98f429a78557d4f97a551061fcba489eda035d0c72');

          const pbGame = new ever.Contract(PBGameContract.abi, gameAddress);

          try {
            const output = await pbGame
              .methods
              .template({})
              .call();
            console.log(output);
          } catch (e) {
            if (e instanceof TvmException) {
              console.error(e.code);
            }
          }
*/
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

.color-5 {
    background-color: #1e2228 !important;
    color: #fefefe;
}

</style>
