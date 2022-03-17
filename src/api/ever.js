import {Address, Contract, ProviderRpcClient} from "everscale-inpage-provider";
import type {RawPlayerStats} from "../AppTypes";

export const EverAPI = {

    isWorking: function (ever): Promise<boolean> {
        return ever.hasProvider()
    },
    initWallet: async function (ever: ProviderRpcClient): Promise<string> {

        const {accountInteraction} = await ever.requestPermissions({
            permissions: ['basic', 'accountInteraction'],
        });
        if (accountInteraction == null) {
            return "";
        }
        return accountInteraction.address.toString();
    },
    tokenRoot: {
        getWallet: async function (tRoot, playerAddress: string) {
            const result = await tRoot
                .methods
                .walletOf({answerId: 1, walletOwner: playerAddress})
                .call();
            return result.value0.toString();
        }
    },
    host: {
        getCurrentGameId: async function (gHost): Promise<number> {
            const result = await gHost
                .methods
                .currentGameId({})
                .call();
            return parseInt(result.currentGameId);
        },
        _getIndexAddress: async function (gHost, gameId: number): Promise<Address> {
            const result = await gHost
                .methods
                .getIndexAddress({_gameId: gameId})
                .call();
            return result.value0;
        }
    },
    index: {
        getGameAddress: async function (gameIndex): Promise<string> {
            const result = await gameIndex
                .methods
                .gameAddress({})
                .call();
            return result.gameAddress;
        }

    },
    game: {
        getGameInfo: async function (game): Promise<Object> {
            const result = await game
                .methods
                .getInfo({})
                .call();
            return result.value0;
        },
        getField: async function (game): Promise<Object> {
            const result = await game
                .methods
                .field({})
                .call();
            return result.field;
        },
        getTemplate: async function (game): Promise<Object> {
            const result = await game
                .methods
                .template({})
                .call();
            return result.template;
        },
        getPlayers: async function (game): Promise<Array<Array<[Address, RawPlayerStats]>>> {
            const result = await game
                .methods
                .players({})
                .call();
            return result.players;

        },
        getColors: async function(game): Promise<Object> {
             const result = await game
                .methods
                .playerColors({})
                .call();
             return result.playerColors;
        }
    },
    wallet: {

        getState: async function (ever:ProviderRpcClient, walletAddress: string): Promise<number> {
            return await ever.getFullContractState({address: new Address(walletAddress)});
        },

        getBalance: async function (walletContract: Contract) {
            const result = await walletContract
                .methods
                .balance({answerId: 1})
                .call();
            return parseInt(result.value0) / 1e9;
        },
        getTiles: async function (walletContract: Contract) {
            const result = await walletContract
                .methods
                .showTiles({})
                .call();
            return parseInt(result.value0);
        },
        claimTiles: async function(walletContract: Contract, playerAddress: string, gameAddress: string) {
            const pAddress = new Address(playerAddress);
            await walletContract
                .methods
                .claimTiles({gameAddress: gameAddress})
                .send({
                  from: pAddress,
                  amount: '1000000000',
                  bounce: true,
                });
        }
    }
}
