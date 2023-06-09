import {Address, toNano, WalletTypes, zeroAddress} from "locklift";

const GAME_DEPLOY_DELAY = 30000;

async function main() {

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    const signer = (await locklift.keystore.getSigner("0"))!;

    const mySafeMultisigAccount = await locklift.factory.accounts.addExistingAccount({
        mSigType: "SafeMultisig",
        publicKey: signer.publicKey,
        type: WalletTypes.MsigAccount,
        address: new Address("0:29f5c28802609492c7432f54a935c21100ff1cabd1a5651f654974d662629d08")
    });

    // Deploy genesis
    const {contract: genesis,} = await locklift.factory.deployContract({
        contract: "Genesis",
        publicKey: signer.publicKey,
        initParams: {
            _randomNonce: locklift.utils.getRandomNonce(),
        },
        constructorParams: {},
        value: locklift.utils.toNano(1),
    });
    console.log(`Signer: ${signer.publicKey}`);
    console.log(`Genesis deployed at: ${genesis.address.toString()}`);

    // Deploy TokenRoot
    const {contract: tokenRoot,} = await locklift.factory.deployContract({
        contract: "TokenRoot",
        publicKey: signer.publicKey,
        initParams: {
            randomNonce_: locklift.utils.getRandomNonce(),
            deployer_: zeroAddress,
            name_: "PileBlocks.com GameFi Play-to-Earn",
            symbol_: "PILE",
            decimals_: 9,
            rootOwner_: genesis.address,
            walletCode_: locklift.factory.getContractArtifacts("TokenWallet").code
        },
        constructorParams: {
            initialSupplyTo: zeroAddress,
            initialSupply: 0,
            deployWalletValue: 0,
            mintDisabled: false,
            burnByRootDisabled: false,
            burnPaused: false,
            remainingGasTo: zeroAddress
        },
        value: locklift.utils.toNano(2),
    });
    console.log(`tokenRoot deployed at: ${tokenRoot.address.toString()}`);

    // Deploy SaleToken
    const {contract: saleToken,} = await locklift.factory.deployContract({
        contract: "SaleToken",
        publicKey: signer.publicKey,
        initParams: {
            _randomNonce: locklift.utils.getRandomNonce(),
        },
        constructorParams: {
            tokenRootAddress: tokenRoot.address,
        },
        value: locklift.utils.toNano(1),
    });
    console.log(`saleToken deployed at: ${saleToken.address.toString()}`);

    // Deploy SaleToken
    const {contract: gameHost,} = await locklift.factory.deployContract({
        contract: "GameHost",
        publicKey: signer.publicKey,
        initParams: {
            _randomNonce: locklift.utils.getRandomNonce(),
        },
        constructorParams: {
            _indexCode: locklift.factory.getContractArtifacts("GameIndex").code,
            _walletCode: locklift.factory.getContractArtifacts("TokenWallet").code,
            _tokenRootAddress: tokenRoot.address,
        },
        value: locklift.utils.toNano(2),
    });
    console.log(`gameHost deployed at: ${gameHost.address.toString()}`);

    /*
    await gameHost.methods.setGameCode({_gameCode: locklift.factory.getContractArtifacts("PBGame").code}).send(
        {
            from: mySafeMultisigAccount.address,
            amount: locklift.utils.toNano(1)
        }
    )
     */
    await gameHost.methods.setGameCode({_gameCode: locklift.factory.getContractArtifacts("PBGame").code}).sendExternal(
        {
            publicKey: signer.publicKey
        }
    )
    console.log(`Game code set`);

    await gameHost.methods.setFarmingCode({_farmingCode: locklift.factory.getContractArtifacts("FarmingWallet").code}).sendExternal(
        {
            publicKey: signer.publicKey
        }
    )
    console.log(`Farming code set`);

    // Deploy PlayerTest
    const {contract: playerTest,} = await locklift.factory.deployContract({
        contract: "PlayerTest",
        publicKey: signer.publicKey,
        initParams: {
            _randomNonce: locklift.utils.getRandomNonce(),
        },
        constructorParams: {
            _rootAddress: tokenRoot.address,
            _genesis: genesis.address,
            _gameHost: gameHost.address,
        },
        value: locklift.utils.toNano(5),
    });
    console.log(`playerTest deployed at: ${playerTest.address.toString()}`);

    const GAMESTARTDATE: number = parseInt(String(new Date().getTime() / 1000));

    await playerTest.methods.deployGame({
        _renderSettings: [2, 1, 5, 5, 16711422, 11186364, 12456217, 3093818, 1974824],
        _gameName: "Follow the White Rabbit 🐇", _gameStartTime: GAMESTARTDATE
    }).sendExternal({
        publicKey: signer.publicKey
    })

    await delay(GAME_DEPLOY_DELAY);

    const gameAddressData: { gameAddress: Address } = await playerTest.methods.gameAddress().call();

    console.log(`Game address: ${gameAddressData.gameAddress.toString()}`);

    await playerTest.methods.saveImageFragment({
        fragmentNum: 0,
        tiles: [[4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 4, 4], [4, 4, 4, 4, 4, 4, 2, 4, 5, 5, 4, 1, 1, 2, 1, 1], [4, 4, 4, 5, 4, 4, 4, 4, 5, 5, 1, 1, 1, 2, 2, 2], [4, 4, 5, 5, 5, 4, 3, 5, 5, 1, 1, 1, 2, 2, 1, 1], [4, 5, 5, 5, 3, 4, 5, 5, 3, 1, 1, 1, 2, 2, 1, 5], [5, 5, 5, 5, 5, 3, 3, 3, 5, 1, 1, 2, 2, 1, 2, 5], [5, 5, 5, 5, 5, 3, 3, 3, 1, 1, 1, 2, 1, 1, 2, 4], [5, 5, 4, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5, 4]]
    }).sendExternal({
        publicKey: signer.publicKey
    });

    await playerTest.methods.saveImageFragment({
        fragmentNum: 1,
        tiles: [[4, 4, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 5], [5, 5, 5, 1, 1, 1, 3, 3, 2, 1, 1, 1, 1, 4, 5, 4], [4, 4, 2, 1, 1, 1, 5, 3, 2, 2, 1, 1, 1, 3, 3, 3], [5, 4, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 3, 3, 3, 1], [4, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1], [5, 5, 5, 2, 2, 2, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1], [5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 3, 3, 1, 1, 1, 1], [4, 5, 5, 5, 5, 5, 4, 5, 2, 2, 3, 1, 1, 1, 1, 1]]
    }).sendExternal({
        publicKey: signer.publicKey
    });

    console.log("Template provided");

    await playerTest.methods.setGameExtraSettings({
        _extraSettings: [500, 100],
    }).sendExternal({
        publicKey: signer.publicKey
    });

    console.log("Extra settings provided");

    const INDEX_CODE = "te6ccgECHQEAA1UAAgaK2zUcAQQkiu1TIOMDIMD/4wIgwP7jAvILGQMCGwOK7UTQ10nDAfhmifhpIds80wABn4ECANcYIPkBWPhC+RDyqN7TPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwHbPPI8DgsEA3rtRNDXScMB+GYi0NMD+kAw+GmpOAD4RH9vcYIImJaAb3Jtb3Nwb3T4ZNwhxwDjAiHXDR/yvCHjAwHbPPI8GBgEAzogggujrde64wIgghAWX5bBuuMCIIIQR1ZU3LrjAhMPBQRCMPhCbuMA+EbycyGT1NHQ3vpA0fhBiMjPjits1szOyds8CxwIBgJqiCFus/LoZiBu8n/Q1PpA+kAwbBL4SfhKxwXy4GT4ACH4a/hs+kJvE9cL/5Mg+GvfMNs88gAHFAA8U2FsdCBkb2Vzbid0IGNvbnRhaW4gYW55IHZhbHVlAhjQIIs4rbNYxwWKiuIJCgEK103Q2zwKAELXTNCLL0pA1yb0BDHTCTGLL0oY1yYg10rCAZLXTZIwbeICFu1E0NdJwgGOgOMNDBcCSnDtRND0BXEhgED0Do6A34kg+Gz4a/hqgED0DvK91wv/+GJw+GMNDgECiQ4AQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAD/jD4RvLgTPhCbuMA0x/4RFhvdfhk0ds8I44mJdDTAfpAMDHIz4cgznHPC2FeIMjPkll+WwbOWcjOAcjOzc3NyXCOOvhEIG8TIW8S+ElVAm8RyM+EgMoAz4RAzgH6AvQAcc8LaV4gyPhEbxXPCx/OWcjOAcjOzc3NyfhEbxTi+wAXEhABCOMA8gARACjtRNDT/9M/MfhDWMjL/8s/zsntVAAi+ERwb3KAQG90+GT4S/hM+EoDNjD4RvLgTPhCbuMAIZPU0dDe+kDR2zww2zzyABcVFAA6+Ez4S/hK+EP4QsjL/8s/z4POWcjOAcjOzc3J7VQBMoj4SfhKxwXy6GXIz4UIzoBvz0DJgQCg+wAWACZNZXRob2QgZm9yIE5GVCBvbmx5AELtRNDT/9M/0wAx+kDU0dD6QNTR0PpA0fhs+Gv4avhj+GIACvhG8uBMAgr0pCD0oRsaABRzb2wgMC41OC4yAAAADCD4Ye0e2Q==";
    const INDEX_BASIS_CODE = "te6ccgECFAEAAmQABCSK7VMg4wMgwP/jAiDA/uMC8gsRAgETA4rtRNDXScMB+GaJ+Gkh2zzTAAGfgQIA1xgg+QFY+EL5EPKo3tM/AfhDIbnytCD4I4ED6KiCCBt3QKC58rT4Y9MfAds88jwKBwMDeu1E0NdJwwH4ZiLQ0wP6QDD4aak4APhEf29xggiYloBvcm1vc3BvdPhk3CHHAOMCIdcNH/K8IeMDAds88jwQEAMDOiCCC6Ot17rjAiCCEGi1Xz+64wIgghBswcwMuuMCCwYEA+Iw+Eby4Ez4Qm7jANMf+ERYb3X4ZNHbPCGOHSPQ0wH6QDAxyM+HIM5xzwthAcjPk7MHMDLOzclwjjH4RCBvEyFvEvhJVQJvEcjPhIDKAM+EQM4B+gL0AHHPC2kByPhEbxXPCx/Ozcn4RG8U4vsA4wDyAA8FDAAa+ERwb3KAQG90+GT4SgM2MPhCbuMA+Ebyc9GI+En4SscF8uhl+ADbPPIABw4MAhbtRNDXScIBjoDjDQgPAT5w7UTQ9AVxIYBA9A6OgN/4aoBA9A7yvdcL//hicPhjCQECiQoAQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABADNjD4RvLgTPhCbuMAIZPU0dDe+kDR2zww2zzyAA8NDAAi+Er4Q/hCyMv/yz/Pg87J7VQBNoj4SfhKxwXy6GX4AMjPhQjOgG/PQMmBAKD7AA4ANE1ldGhvZCBmb3IgY29sbGVjdGlvbiBvbmx5ACbtRNDT/9M/0wAx+kDR+Gr4Y/hiAAr4RvLgTAIK9KQg9KETEgAUc29sIDAuNTguMgAA";

    const JSON = '{\"type\":\"Basic NFT\",\"name\":\"PileBlocks Cards\",\"description\":\"PileBlocks in-game items\",\"preview\":{\"source\":\"https://pileblocks.github.io/img/pileblocks_collection_logo.png\",\"mimetype\":\"image/png\"},\"files\":[{\"source\":\"https://pileblocks.github.io/img/pileblocks_collection_logo_full.png\",\"mimetype\":\"image/png\"}],\"external_url\":\"https://pileblocks.com\"}'

    // Deploy Collection
    const {contract: collectionNft,} = await locklift.factory.deployContract({
        contract: "Collection",
        publicKey: signer.publicKey,
        initParams: {
            _nonce: locklift.utils.getRandomNonce(),
        },
        constructorParams: {
            codeNft: locklift.factory.getContractArtifacts("Nft").code,
            codeIndex: INDEX_CODE,
            codeIndexBasis: INDEX_BASIS_CODE,
            ownerPubkey: `0x${signer.publicKey}`,
            json: JSON,
            mintingFee: 0
        },
        value: locklift.utils.toNano(2),
    });
    console.log(`Collection address: ${collectionNft.address.toString()}`);

    // Deploy Oracle
    const {contract: oracle,} = await locklift.factory.deployContract({
        contract: "Oracle",
        publicKey: signer.publicKey,
        initParams: {
            _nonce: locklift.utils.getRandomNonce(),
        },
        constructorParams: {},
        value: locklift.utils.toNano(1),
    });
    console.log(`Oracle address: ${oracle.address.toString()}`);

    await oracle.methods.setNftCode({
        newCode: locklift.factory.getContractArtifacts("Nft").code,
    }).sendExternal({
        publicKey: signer.publicKey
    });
    console.log("NFT code set");

    await oracle.methods.setCollection({
        _collection: collectionNft.address,
    }).sendExternal({
        publicKey: signer.publicKey
    });
    console.log("Collection address set");

    await playerTest.methods.setOracleAddress({
        _oracleAddress: oracle.address,
    }).sendExternal({
        publicKey: signer.publicKey
    });
    console.log("Player set the Oracle address");

    await playerTest.methods.setImageForReview({}).sendExternal({
        publicKey: signer.publicKey
    });
    console.log("Player set image for review");

    await genesis.methods.mint({
        tokenRoot: tokenRoot.address,
        amount: toNano(100000),
        recipient: saleToken.address
    }).sendExternal({
        publicKey: signer.publicKey
    })
    console.log("Added tokens to sell point");

    // Deploy GameQueue
    const {contract: gameQueue,} = await locklift.factory.deployContract({
        contract: "GameQueue",
        publicKey: signer.publicKey,
        initParams: {
            _randomNonce: locklift.utils.getRandomNonce(),
        },
        constructorParams: {
            _hostAddress: gameHost.address,

        },
        value: locklift.utils.toNano(1),
    });
    console.log(`GameQueue address: ${gameQueue.address.toString()}`);

    await gameHost.methods.setQueueAddress({_queueAddress: gameQueue.address}).sendExternal({
        publicKey: signer.publicKey
    })
    console.log("GameHost received the game queue address");

    await gameQueue.methods.addGame({gameAddress: gameAddressData.gameAddress}).sendExternal({
        publicKey: signer.publicKey
    })
    console.log("Game added to the queue");

     await gameHost.methods.runGameInQueue({}).sendExternal({
        publicKey: signer.publicKey
    })
    console.log("GameHost launched the game");

    // Deploy NFT Creator
    const {contract: nftCreator,} = await locklift.factory.deployContract({
        contract: "NftCreator",
        publicKey: signer.publicKey,
        initParams: {
            _nonce: locklift.utils.getRandomNonce()
        },
        constructorParams: {
            _col: collectionNft.address,

        },
        value: locklift.utils.toNano(1),
    });
    console.log(`nftCreator address: ${nftCreator.address.toString()}`);


console.log(`VUE_APP_TOKEN_ROOT_ADDRESS=${tokenRoot.address.toString()}`);
console.log(`VUE_APP_SALE_TOKEN=${saleToken.address.toString()}`);
console.log(`VUE_APP_GENESIS_ADDRESS=${genesis.address.toString()}`);
console.log(`VUE_APP_COLLECTION_ADDRESS=${collectionNft.address.toString()}`);
console.log(`VUE_APP_ORACLE_ADDRESS=${oracle.address.toString()}`);
console.log(`VUE_APP_NFT_CREATOR=${nftCreator.address.toString()}`);
console.log(`VUE_APP_HOST_ADDRESS=${gameHost.address.toString()}`);
console.log(`VUE_APP_PLAYER_ADDRESS=${playerTest.address.toString()}`);
console.log(`VUE_APP_QUEUE_ADDRESS=${gameQueue.address.toString()}`);

}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log(e);
        process.exit(1);
    });
