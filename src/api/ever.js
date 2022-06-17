import {Address, Contract, ProviderRpcClient} from "everscale-inpage-provider";
import type {RawPlayerStats} from "../AppTypes";
import type {TileCoordinatePlusColor} from "../AppTypes";
import {LOADING_STATUS_PROVIDER_LOADED, LOADING_STATUS_PROVIDER_NOT_LOADED} from "@/AppConst";
import {GameExtraSettings} from "../AppTypes";

export const EverAPI = {

    isWorking: async function (ever: ProviderRpcClient): Promise<boolean> {
        if (await ever.hasProvider()) {
            return LOADING_STATUS_PROVIDER_LOADED;
        }
        return LOADING_STATUS_PROVIDER_NOT_LOADED;
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
    isActiveContract: async function (ever: ProviderRpcClient, contractAddress: string): Promise<boolean> {
        return JSON.stringify(await ever.getFullContractState({address: contractAddress})) !== "{}";
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
    calc: {
        calcFarming: async function (calcContract, time, tokenBalance): Promise<number> {
            const result = await calcContract
                .methods
                .calcFarming({time: time, tokenBalance: tokenBalance})
                .call();
            return parseInt(result.farmValue);
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
        isNextGameEmpty: async function (gHost): Promise<boolean> {
            const result = await gHost
                .methods
                .isNextGameEmpty({})
                .call();
            return result.value0;
        },
        _getIndexAddress: async function (gHost, gameId: number): Promise<Address> {
            const result = await gHost
                .methods
                .getIndexAddress({_gameId: gameId})
                .call();
            return result.value0;
        },
        getRewardPerGame: async function (gHost): Promise<number> {
            const result = await gHost
                .methods
                .getRewardPerGame({})
                .call();
            return parseInt(result.value0 / 1e9);
        },
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

        getGameExtraSettings: async function (game): Promise<GameExtraSettings> {
            const result = await game
                .methods
                .getGameExtraSettings({})
                .call();

            return {
                maxStars: parseInt(result.value0.maxStars),
                scorePerStar: parseInt(result.value0.scorePerStar),
                currentStars: parseInt(result.value0.currentStars),
                percentOfReward: parseInt(result.value0.percentOfReward)
            };
        },

        getFarmingAddress: async function (game, playerAddress): Promise<Object> {
            const result = await game
                .methods
                .getFarmingAddress({walletOwner: playerAddress})
                .call();
            return result.value0;
        },

        deployFarmingWallet: async function (game, playerAddress) {
            const pAddress = new Address(playerAddress);
            await game
                .methods
                .deployFarmingWallet({})
                .send({
                    from: pAddress,
                    amount: '500000000',
                    bounce: true,
                });

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
        getColors: async function (game): Promise<Object> {
            const result = await game
                .methods
                .playerColors({})
                .call();
            return result.playerColors;
        },
        claimReward: async function (gameContract: Contract, playerAddress: string) {
            const pAddress = new Address(playerAddress);
            await gameContract
                .methods
                .claimReward({})
                .send({
                    from: pAddress,
                    amount: '500000000',
                    bounce: true,
                });

        },
        packTiles: async function(gameContract: Contract, tiles: Array<TileCoordinatePlusColor>) {
            const result = await gameContract
                .methods
                .packTiles({tiles: tiles})
                .call();
            return result.value0;
        }
    },
    wallet: {

        getState: async function (ever: ProviderRpcClient, walletAddress: string): Promise<number> {
            return await ever.getFullContractState({address: new Address(walletAddress)});
        },

        getBalance: async function (walletContract: Contract) {
            const result = await walletContract
                .methods
                .balance({answerId: 1})
                .call();
            return parseInt(result.value0) / 1e9;
        },

        putTiles: async function (walletContract: Contract, payPerMove: number, gameAddress: string, playerAddress: string, tilesPayload: string) {
            const pAddress = new Address(playerAddress);
            await walletContract
                .methods
                .transfer({amount: payPerMove, recipient: gameAddress, deployWalletValue: 0, remainingGasTo: playerAddress, notify: true, payload: tilesPayload})
                .send({
                    from: pAddress,
                    amount: '2000000000',
                    bounce: true,
                });
        },
        claimTiles: async function (walletContract: Contract, playerAddress: string, gameAddress: string, genesisAddress: string) {
            const pAddress = new Address(playerAddress);
            await walletContract
                .methods
                .claimTiles({gameAddress: gameAddress, genesis: genesisAddress})
                .send({
                    from: pAddress,
                    amount: '1000000000',
                    bounce: true,
                });
        }
    },
    farmingWallet: {

        getTiles: async function (walletContract: Contract) {
            const result = await walletContract
                .methods
                .showTiles({})
                .call();
            return parseInt(result.value0);
        },

        getLockedInFarming: async function (walletContract: Contract) {
            const result = await walletContract
                .methods
                ._balance({})
                .call();
            return parseInt(result._balance) / 1e9;
        },

        calcFarming: async function (walletContract: Contract, time: number, tokenBalance: number) {
            const result = await walletContract
                .methods
                .calcFarming({time: time, tokenBalance: tokenBalance})
                .call();
            return parseInt(result.value0);
        },

        releaseTokens: async function (walletContract: Contract, playerAddress: string, amount: number) {
            const pAddress = new Address(playerAddress);
            await walletContract
                .methods
                .releaseTokens({amount: amount})
                .send({
                    from: pAddress,
                    amount: '500000000',
                    bounce: true,
                });
        },
        claimTiles: async function (walletContract: Contract, playerAddress: string, genesisAddress: string) {
            const pAddress = new Address(playerAddress);
            await walletContract
                .methods
                .claimTiles({genesis: genesisAddress})
                .send({
                    from: pAddress,
                    amount: '1000000000',
                    bounce: true,
                });
        }

    }
}
