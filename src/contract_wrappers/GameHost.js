const GameHostContract = {
    abi: {
        "ABI version": 2,
        "version": "2.2",
        "header": [
            "pubkey",
            "time",
            "expire"
        ],
        "functions": [
            {
                "name": "constructor",
                "inputs": [
                    {
                        "name": "_indexCode",
                        "type": "cell"
                    },
                    {
                        "name": "_gameCode",
                        "type": "cell"
                    },
                    {
                        "name": "_walletCode",
                        "type": "cell"
                    },
                    {
                        "name": "_tokenRootAddress",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "onDeploy",
                "inputs": [
                    {
                        "name": "gameWallet",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "onGetWalletAddress",
                "inputs": [
                    {
                        "name": "_walletAddress",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getGameCode",
                "inputs": [
                    {
                        "name": "gameId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "getGameHash",
                "inputs": [
                    {
                        "name": "gameId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "setGameCode",
                "inputs": [
                    {
                        "name": "_gameCode",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "activateGame",
                "inputs": [
                    {
                        "name": "gameAddress",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "runGame",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "deployGame",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "_renderSettings",
                        "type": "uint24[]"
                    },
                    {
                        "name": "_gameName",
                        "type": "string"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "onGameCompleted",
                "inputs": [
                    {
                        "components": [
                            {
                                "name": "tokenRootAddress",
                                "type": "address"
                            },
                            {
                                "name": "created",
                                "type": "uint64"
                            },
                            {
                                "name": "imageOwner",
                                "type": "address"
                            },
                            {
                                "name": "gameId",
                                "type": "uint32"
                            },
                            {
                                "name": "gameWallet",
                                "type": "address"
                            },
                            {
                                "name": "remainingTiles",
                                "type": "uint16"
                            },
                            {
                                "name": "gameHost",
                                "type": "address"
                            },
                            {
                                "name": "renderConfig",
                                "type": "uint24[]"
                            },
                            {
                                "name": "status",
                                "type": "uint8"
                            },
                            {
                                "name": "gameName",
                                "type": "string"
                            }
                        ],
                        "name": "gameInfo",
                        "type": "tuple"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setRewardPerGame",
                "inputs": [
                    {
                        "name": "newRewardPerGame",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getRewardPerGame",
                "inputs": [],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "getGameAddress",
                "inputs": [
                    {
                        "components": [
                            {
                                "name": "tokenRootAddress",
                                "type": "address"
                            },
                            {
                                "name": "created",
                                "type": "uint64"
                            },
                            {
                                "name": "imageOwner",
                                "type": "address"
                            },
                            {
                                "name": "gameId",
                                "type": "uint32"
                            },
                            {
                                "name": "gameWallet",
                                "type": "address"
                            },
                            {
                                "name": "remainingTiles",
                                "type": "uint16"
                            },
                            {
                                "name": "gameHost",
                                "type": "address"
                            },
                            {
                                "name": "renderConfig",
                                "type": "uint24[]"
                            },
                            {
                                "name": "status",
                                "type": "uint8"
                            },
                            {
                                "name": "gameName",
                                "type": "string"
                            }
                        ],
                        "name": "gameInfo",
                        "type": "tuple"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "getIndexAddress",
                "inputs": [
                    {
                        "name": "_gameId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "drain",
                "inputs": [
                    {
                        "name": "receiver",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "drainGame",
                "inputs": [
                    {
                        "name": "gameAddress",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "drainTokens",
                "inputs": [
                    {
                        "name": "value",
                        "type": "uint128"
                    },
                    {
                        "name": "receiver",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "drainGameTokens",
                "inputs": [
                    {
                        "name": "gameAddress",
                        "type": "address"
                    },
                    {
                        "name": "value",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "currentGameId",
                "inputs": [],
                "outputs": [
                    {
                        "name": "currentGameId",
                        "type": "uint32"
                    }
                ]
            },
            {
                "name": "indexCode",
                "inputs": [],
                "outputs": [
                    {
                        "name": "indexCode",
                        "type": "cell"
                    }
                ]
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "_randomNonce",
                "type": "uint64"
            }
        ],
        "events": [],
        "fields": [
            {
                "name": "_pubkey",
                "type": "uint256"
            },
            {
                "name": "_timestamp",
                "type": "uint64"
            },
            {
                "name": "_constructorFlag",
                "type": "bool"
            },
            {
                "name": "_randomNonce",
                "type": "uint64"
            },
            {
                "name": "currentGameId",
                "type": "uint32"
            },
            {
                "name": "nextGameAddress",
                "type": "address"
            },
            {
                "name": "indexCode",
                "type": "cell"
            },
            {
                "name": "gameCode",
                "type": "cell"
            },
            {
                "name": "walletCode",
                "type": "cell"
            },
            {
                "name": "tokenRootAddress",
                "type": "address"
            },
            {
                "name": "walletAddress",
                "type": "address"
            },
            {
                "name": "rewardPerGame",
                "type": "uint128"
            }
        ]
    },
    tvc: "te6ccgECbwEAD8QAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgBCSK7VMg4wMgwP/jAiDA/uMC8gtsBQRuA8TtRNDXScMB+GaJ+Gkh2zzTAAGOHYECANcYIPkBAdMAAZTT/wMBkwL4QuIg+GX5EPKoldMAAfJ64tM/AfhDIbnytCD4I4ED6KiCCBt3QKC58rT4Y9MfAfgjvPK50x8B2zzyPEE1BgN67UTQ10nDAfhmItDTA/pAMPhpqTgA+ER/b3GCCJiWgG9ybW9zcG90+GTcIccA4wIh1w0f8rwh4wMB2zzyPGtrBgIoIIIQaBqdYLvjAiCCEH2XRia74wIPBwRQIIIQanY4eLrjAiCCEGyBTzy64wIgghByHFdeuuMCIIIQfZdGJrrjAg0LCQgBUDDR2zz4SyGOHI0EcAAAAAAAAAAAAAAAAD9l0YmgyM7LH8lw+wDe8gBqAygw+Eby4Ez4Qm7jANTR2zww2zzyAGoKPQA2aKb7YMD/8uBH+EL4RSBukjBw3rry4+v4APhuAzYw+Eby4Ez4Qm7jACGT1NHQ3vpA0ds8MNs88gBqDD0DYGim+2Dy0Ej4SfhQxwXy4/r4cW8AyIvUhvc3Qgd2FsbGV0OiCNs8+FHbPNs80P4UMFlGRAM2MPhG8uBM+EJu4wAhk9TR0N76QNHbPDDbPPIAag49AAIwBFAgghAN0fCbu+MCIIIQHhtzIbvjAiCCEDsmuLC74wIgghBoGp1gu+MCOi0YEARQIIIQPWkwNbrjAiCCEEf4kni64wIgghBl7BQUuuMCIIIQaBqdYLrjAhcVExEDhDD4RvLgTPhCbuMA0x/R2zwhjigj0NMB+kAwMcjPhyDOjQQAAAAAAAAAAAAAAAAOganWCM8Wy//JcPsAkTDi4wDyAGoSaAEg+CgByMsfzvhO0AHJ2zz5AGADcjD4RvLgTPhCbuMA0x/R2zwhjh8j0NMB+kAwMcjPhyDOcc8LYQHIz5OXsFBSzs3JcPsAkTDi4wDyAGoUaAFi+ELIy/9wbYBA9EMByMsfcViAQPRDyPQAyds8yM+EgPQA9ADPgcn5AMjPigBAy//J0F0CKjD4RvLgTCGT1NHQ3vpA0ds84wDyABZoAGj4QvhFIG6SMHDeuvLj6/gAyM+FiM6NBZAX14QAAAAAAAAAAAAAAAAAAClKUGvAzxbJcPsAAU4w0ds8+E0hjhuNBHAAAAAAAAAAAAAAAAAvWkwNYMjOzMlw+wDe8gBqBFAgghAlnB0PuuMCIIIQKTnVxLrjAiCCEDNlbPK64wIgghA7JriwuuMCHh0bGQM2MPhG8uBM+EJu4wAhk9TR0N7Tf9HbPDDbPPIAaho9ADZopvtgwP/y4Ef4QvhFIG6SMHDeuvLj6/gA+HIDgDD4RvLgTPhCbuMA0ds8IY4oI9DTAfpAMDHIz4cgzo0EAAAAAAAAAAAAAAAACzZWzyjPFst/yXD7AJEw4uMA8gBqHGgAFmim+2DA//LgR/hSA4Iw+Eby4Ez4Qm7jANMf0ds8IY4nI9DTAfpAMDHIz4cgzo0EAAAAAAAAAAAAAAAACpOdXEjPFszJcPsAkTDi4wDyAGpfaAM2MPhG8uBM+EJu4wAhk9TR0N76QNHbPDDbPPIAah89BIpopvtgwP/y4Ef4QvhFIG6SMHDeuvLj6/gAbwDIi/U2VuZGluZyBzdGF0dXMgjbPHJwXyDbPIvCB0byB0aGUgZ2FtZY2zxZIlkgAoLbPND+FDByIcjPhYjOjQWQF9eEAAAAAAAAAAAAAAAAAAAYWbv6wM8WywfJcPsA+EvAAY6AkSDi+Gww+EuktR/4a0QhAg74SyHbPDCJQkEETCTPNasCII6A31iSgDCSgCDiWJUkz4S2Nd4hpTIhjoDfVQJ62zwgLCtUIwQg2zwkjoDeUwO7joCOgOJfBVMnJSQDIiOOgORfJts8N8g2UwOhjoDkJlsmAQggjoDkJgEaIds8MyaAMFigzwsHNk4CLFNAuSXCf7Hy0EJTQKFTBLuOgI6A4jApKAFEJJZTY88LBzfkXyfbPDjIN1MEoZZTY88LBzfkgH8hoSWgNVsBIiCWU2PPCwc35FNAoTUkjoDfKgEUXyfbPDjIN4B/NVsBFF8l2zw2yDWAfzJbARRfJts8N8g2MIB/WwRQIIIQDlWeGLrjAiCCEBKE3RC64wIgghAar/OZuuMCIIIQHhtzIbrjAjczMS4D9DD4RvLgTPhCbuMA0x/4RFhvdfhk0x/0BFlvAgHU0ds8IY4dI9DTAfpAMDHIz4cgznHPC2EByM+SeG3Mhs7NyXCOMfhEIG8TIW8S+ElVAm8RyHLPQMoAc89AzgH6AvQAcc8LaQHI+ERvFc8LH87NyfhEbxTi+wDjAPIAai9oA/z4QsjL/3BtgED0Q/hPcViAQPQX+FByWIBA9Bb4I8jLP3NYgED0Q/hJdFiAQPQWyPQAyfhL2zzIz4SA9AD0AM+ByRIg+QDIz4oAQMv/ydBVICPIz4WIzovgAAAAAAAAAAAAAAAAAHDPFiHbPMzPkAAH5acBbyICyx/0AMzJgEBfXDADOPsAbwDIi6TmV3IGdhbWU6II2zwi2zzbPND+FDBZRkQDNDD4RvLgTPhCbuMAIZPU0dDe+kDR2zzjAPIAajJoAFD4QvhFIG6SMHDeuvLj6/gAghAF9eEAcPsCyM+FiM6Ab89AyYEAgPsAAvQw+EJu4wD4RvJzIZbU1NTU0dCT1NTU4vpA0fhC8uPq+EL4RSBukjBw3rry4+v4AFUC+G1Y+G4B+G/4cHH4a4IgBIwnOVAA+HL4UMjPhYjOjQSQR4aMAAAAAAAAAAAAAAAAAADAzxb4KIuCwWBUVsgU88jIzs7NyXD7ADU0AVyCEBHhowD4KPhQyM+FiM5xzwtuWYuDHt1Mdqdjh4jIzs7Lf83JgQCA+wDbPPIAPQIW7UTQ10nCAY6A4w02agN2cO1E0PQFcSGAQPQOk9cLP5Fw4nCJiF8giSBw+HL4cfhw+G/4bvht+Gz4a/hqgED0DvK91wv/+GJw+GNBbkEDJDD4RvLgTPhCbuMA0ds84wDyAGo4aAFKaKb7YMD/8uBH+EL4RSBukjBw3rry4+v4APhM+kJvE9cL/46A3jkBFPhLpbUf+EzbPDBCBFAgghAGz+wyuuMCIIIQB2mtx7rjAiCCEA2EZ3664wIgghAN0fCbuuMCZ2U8OwPIMPhG8uBM+EJu4wAhk9TR0N76QNM/1NHQ+kDTH9TR0PpA0w/U0dD6QNMf9ARZbwIB0wfUVZBvCgHR2zwhjh8j0NMB+kAwMcjPhyDOcc8LYQHIz5I3R8Juzs3JcPsAkTDi4wDyAGpeaAOAMPhG8uBM+EJu4wAhk9TR0N76QNM/1NHQ+kDTH9TR0PpA0w/U0dD6QNMf9ARZbwIB0wfUVZBvCgHR2zww2zzyAGo+PQBm+FL4UfhQ+E/4TvhN+Ez4S/hK+EP4QsjL/8s/z4PLP8sfzszMzFUgyM5ZyM7Lf83Nye1UBPJopvtg8tBIINs8+EnHBfLj+yBvFvgoxwXy4/MgbxjAA/Lj9PhM+kJvE9cL/46A3ohw+ChVAm8U+FL4UcjPhYjOjQSQR4aMAAAAAAAAAAAAAAAAAADAzxZVQMjPkRqnX7LLf85VIMjOygDMzc3JcPsA+FL4ScjPhYjOXkBuPwBCjQWQ7msoAAAAAAAAAAAAAAAAAAAMYwDmwM8Wy3/JcPsAAhr4S6W1H/hM2zwwifhsQkEAQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAE7vhCyMv/cG2AQPRDWMjLH3FYgED0Q8j0AMnbPMjPhID0APQAz4HJIPkAyM+KAEDL/8nQWSLIz4WIzo0EkC+vCAAAAAAAAAAAAAAAAAABwM8WIds8zM+DAcjPkR1ZU3LOzclx+wBvAMiLtOZXcgaW5kZXg6II2zwiXVxZQwIQ2zzbPND+FDBGRAEYliFviMAAs46A6MkxRQEMIds8M88RTgM6+kRdVQLbPDMzIc81wgiOgN8hz4TqMoBAfyBw2zxIR0kBDl8i2zwzyDJbARpZIrYLcCB/VQXBANs8SQRQJc81qwIgjoDfVQKSgDCSgCDiWJUlz4S2Nt4hpTIhjoDfVQOAENs8IFhXVEoEINs8JY6A3lMDu46AjoDiXwZTT0xLAyIjjoDkXyfbPDjIN1MDoY6A5E1bTQEIII6A5E0BOiHbPDMgwQqTJ4AwmVN1koBXkoA34uIioM8LBzgwTgAcb41vjVkgb4iSb4yRMOICLFNQuSbCf7Hy0EVTUKFTBLuOgI6A4jBRUAFEJJZTc88LBzjkXyjbPDnIOFMEoZZTc88LBzjkgH8hoSWgNVsBIiCWU3PPCwc45FNAoTUkjoDfUgEUXyjbPDnIOIB/NVsAJiBviCCbpYEA/6gBb4tviKCRMeICIm8AIo6A4XCTI8MAjoDoMGwhVlUBEl2pDDI0XNs8MlsBCnDbPGwhWwEUXybbPDfINoB/MlsBFF8n2zw4yDcwgH9bATghzzWm+SHXSyCWI3Ai1zE03jAhu46A31MSzmwxWgEaXNcYMyPOM13bPDTIM1sAOgEgb4ifb40gb4iBAP+hlG+MbwDfkm8A4lhvjG+MADTQ0gABk9IEMd7SAAGT0gEx3vQE9AT0BNFfAwEW+CjIzvhN0AHJ2zxgAaD4QsjL/3BtgED0Q/hPcViAQPQXIW8QcliAQPQWIW8RyMs/c1iAQPRDIW8SdFiAQPQWyPQAyQFvE9s8yM+EgPQA9ADPgcn5AMjPigBAy//J0F8BHPgoAcjLH874TtAByds8YAIWIYs4rbNYxwWKiuJiYQEIAds8yWMBJgHU1DAS0Ns8yM+OK2zWEszPEcljAWbViy9KQNcm9ATTCTEg10qR1I6A4osvShjXJjAByM+L0pD0AIAgzwsJz4vShswSzMjPEc5kAQSIAW4CLjD4RvLgTCGT1NHQ3vpA03/R2zzjAPIAZmgAbvhC+EUgbpIwcN668uPr+AAByM+FiM6NBZB3NZQAAAAAAAAAAAAAAAAAAAHcRMzAzxbLf8lw+wADODD4RvLgTPhCbuMAIZPU0dDe03/6QNHbPOMA8gBqaWgAKO1E0NP/0z8x+ENYyMv/yz/Oye1UAaz4QvhFIG6SMHDeuvLj6/gAiHD4KIIQEeGjAFUTAfhRyM+FiM6NBJB3NZQAAAAAAAAAAAAAAAAAAMDPFlVQyM+Rz4iFDst/zst/VSDIzsoAzM3NyXD7AG4AbO1E0NP/0z/TADHTP9Mf+kDU1NTU0dD6QNTR0PpA03/R+HL4cfhw+G/4bvht+Gz4a/hq+GP4YgAK+Eby4EwCCvSkIPShbm0AFHNvbCAwLjU3LjAAAA==",
    code: "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",
    codeHash: "860eb3d8027f96156df57c7a0b881d6665faa4582e96999739eec6b711775865",
};
module.exports = { GameHostContract };