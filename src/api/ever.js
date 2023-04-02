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
            console.log("API getWallet call run");
            return result.value0.toString();
        }
    },
    calc: {
        calcFarming: async function (calcContract, time, tokenBalance): Promise<number> {
            const result = await calcContract
                .methods
                .calcFarming({time: time, tokenBalance: tokenBalance})
                .call();
            console.log("API calcFarming call run");
            return parseInt(result.farmValue);
        }
    },
    host: {
        getCurrentGameId: async function (gHost): Promise<number> {
            const result = await gHost
                .methods
                .currentGameId({})
                .call();
            console.log("API getCurrentGameId call run");
            return parseInt(result.currentGameId);
        },
        isQueueFinished: async function (gHost): Promise<boolean> {
            const result = await gHost
                .methods
                .isQueueFinished({})
                .call();
            console.log("API isNextGameEmpty call run");
            return result.value0;
        },
        _getIndexAddress: async function (gHost, gameId: number): Promise<Address> {
            const result = await gHost
                .methods
                .getIndexAddress({_gameId: gameId})
                .call();
            console.log("API _getIndexAddress call run");
            return result.value0;
        },
        getRewardPerGame: async function (gHost): Promise<number> {
            const result = await gHost
                .methods
                .getRewardPerGame({})
                .call();
            console.log("API getRewardPerGame call run");
            return parseInt(result.value0 / 1e9);
        },
    },
    index: {
        getGameAddress: async function (gameIndex): Promise<string> {
            const result = await gameIndex
                .methods
                .gameAddress({})
                .call();
            console.log("API getGameAddress call run");
            return result.gameAddress;
        }

    },
    game: {
        getGameInfo: async function (game): Promise<Object> {
            const result = await game
                .methods
                .getInfo({})
                .call();
            console.log("API getGameInfo call run");
            return result.value0;
        },

        getGameExtraSettings: async function (game): Promise<GameExtraSettings> {
            const result = await game
                .methods
                .getGameExtraSettings({})
                .call();
            console.log("API getGameExtraSettings call run");
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
            console.log("API getFarmingAddress call run");
            return result.value0;
        },

        deployFarmingWallet: async function (game, playerAddress) {
            const pAddress = new Address(playerAddress);
            await game
                .methods
                .deployFarmingWallet({})
                .send({
                    from: pAddress,
                    amount: '1000000000',
                    bounce: true,
                });

        },

        getField: async function (game): Promise<Object> {
            const result = await game
                .methods
                .field({})
                .call();
            console.log("API getField call run");
            return result.field;
        },
        getTemplate: async function (game): Promise<Object> {
            const result = await game
                .methods
                .template({})
                .call();
            console.log("API getTemplate call run");
            return result.template;
        },
        getPlayers: async function (game): Promise<Array<Array<[Address, RawPlayerStats]>>> {
            const result = await game
                .methods
                .players({})
                .call();
            console.log("API getPlayers call run");
            return result.players;

        },
        getColors: async function (game): Promise<Object> {
            const result = await game
                .methods
                .playerColors({})
                .call();
            console.log("API getColors call run");
            return result.playerColors;
        },
        packTiles: async function(gameContract: Contract, tiles: Array<TileCoordinatePlusColor>) {
            const result = await gameContract
                .methods
                .packTiles({tiles: tiles})
                .call();
            console.log("API packTiles call run");
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
            console.log("API getBalance call run");
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
            console.log("API getTiles call run");
            return parseInt(result.value0);
        },

        getLockedInFarming: async function (walletContract: Contract) {
            const result = await walletContract
                .methods
                ._balance({})
                .call();
            console.log("API getLockedInFarming call run");
            return parseInt(result._balance) / 1e9;
        },

        calcFarming: async function (walletContract: Contract, time: number, tokenBalance: number) {
            const result = await walletContract
                .methods
                .calcFarming({time: time, tokenBalance: tokenBalance})
                .call();
            console.log("API calcFarming call run");
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

    },
    nftCollection: {
        nftOwnerCodeHash: async function (collectionContract: Contract, playerAddress: string): Promise<string> {
            const result = await collectionContract
                .methods
                .nftOwnerCodeHash({_nftOwner: playerAddress})
                .call();
            console.log("API nftOwnerCodeHash call run");
            return result.codeHash;
        }
    },
    nftIndex: {
        getNftAddress: async function (nftIndexContract: Contract): Promise<string> {
            const result = await nftIndexContract
                .methods
                .getInfo({answerId: 1})
                .call();
            console.log("API getNftAddress call run");
            return result.nft._address;
        },
        getPlayerNftIndexes: async function (everx, ownerHash: string):Promise<string[]> {
            let queryString = `query {
                accounts(
                    filter: {
                      code_hash: {eq: "${ownerHash}"
                      }
                    }
                ) {id}
            }`
            let response = await everx.net.query({"query": queryString});
            return response.result.data.accounts.map((item) => item['id']);
        }
    },
    nft: {
        getNftJson: async function (nftContract: Contract): Promise<string> {
                const result = await nftContract
                    .methods
                    .getJson({answerId: 1})
                    .call();
                console.log("API getNftAddress call run");
                return JSON.parse(result.json);
        },
        applyNft: async function (nftContract: Contract, playerAddress: string, gameAddress: string, targetPlayerAddress: string) {
            const pAddress = new Address(playerAddress);
            await nftContract
                .methods
                .applyNft({_gameAddress: gameAddress, _targetPlayerAddress: targetPlayerAddress})
                .send({
                    from: pAddress,
                    amount: '1000000000',
                    bounce: true,
                });
        }
    }
}
