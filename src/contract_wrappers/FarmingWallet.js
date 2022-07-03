const FarmingWalletContract = {
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
                "inputs": [],
                "outputs": []
            },
            {
                "name": "onDeploy",
                "inputs": [
                    {
                        "name": "gWallet",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "onAcceptTokensTransfer",
                "inputs": [
                    {
                        "name": "tokenRoot",
                        "type": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint128"
                    },
                    {
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "name": "senderWallet",
                        "type": "address"
                    },
                    {
                        "name": "remainingGasTo",
                        "type": "address"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "releaseTokens",
                "inputs": [
                    {
                        "name": "amount",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setFarmingSpeed",
                "inputs": [
                    {
                        "name": "newSpeed",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "calcFarming",
                "inputs": [
                    {
                        "name": "time",
                        "type": "uint128"
                    },
                    {
                        "name": "tokenBalance",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "showTiles",
                "inputs": [],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint16"
                    }
                ]
            },
            {
                "name": "claimTiles",
                "inputs": [
                    {
                        "name": "genesis",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "tokenWallet",
                "inputs": [],
                "outputs": [
                    {
                        "name": "tokenWallet",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "farmingSpeed",
                "inputs": [],
                "outputs": [
                    {
                        "name": "farmingSpeed",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "_balance",
                "inputs": [],
                "outputs": [
                    {
                        "name": "_balance",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "tilesNum",
                "inputs": [],
                "outputs": [
                    {
                        "name": "tilesNum",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "tilesChangeTime",
                "inputs": [],
                "outputs": [
                    {
                        "name": "tilesChangeTime",
                        "type": "uint128"
                    }
                ]
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "game",
                "type": "address"
            },
            {
                "key": 2,
                "name": "owner",
                "type": "address"
            },
            {
                "key": 3,
                "name": "tokenRootAddress",
                "type": "address"
            }
        ],
        "events": [
            {
                "name": "OperationCompleted",
                "inputs": [
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "player",
                        "type": "address"
                    },
                    {
                        "name": "gameStatus",
                        "type": "uint8"
                    },
                    {
                        "name": "timestamp",
                        "type": "uint64"
                    },
                    {
                        "name": "value",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "RewardsCalculated",
                "inputs": [
                    {
                        "name": "timestamp",
                        "type": "uint64"
                    }
                ],
                "outputs": []
            },
            {
                "name": "GameBattleEvent",
                "inputs": [
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "player",
                        "type": "address"
                    },
                    {
                        "name": "timestamp",
                        "type": "uint64"
                    },
                    {
                        "name": "value",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            }
        ],
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
                "name": "game",
                "type": "address"
            },
            {
                "name": "owner",
                "type": "address"
            },
            {
                "name": "tokenRootAddress",
                "type": "address"
            },
            {
                "name": "tokenWallet",
                "type": "address"
            },
            {
                "name": "farmingSpeed",
                "type": "uint128"
            },
            {
                "name": "_balance",
                "type": "uint128"
            },
            {
                "name": "tilesNum",
                "type": "uint128"
            },
            {
                "name": "tilesChangeTime",
                "type": "uint128"
            }
        ]
    },
    tvc: "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",
    code: "te6ccgECUgEAC4AABCSK7VMg4wMgwP/jAiDA/uMC8gtPAgFRA77tRNDXScMB+GaJ+Gkh2zzTAAGOGoECANcYIPkBAdMAAZTT/wMBkwL4QuL5EPKoldMAAfJ64tM/AfhDIbnytCD4I4ED6KiCCBt3QKC58rT4Y9MfAfgjvPK50x8B2zzyPB4bAwNS7UTQ10nDAfhmItDTA/pAMPhpqTgA3CHHAOMCIdcNH/K8IeMDAds88jxOTgMEUCCCEA64E3u74wIgghBhUrblu+MCIIIQcNifybvjAiCCEHEDC2u64wI9IQUEAU4w0ds8+E0hjhuNBHAAAAAAAAAAAAAAAAA8QMLa4MjOzslw+wDe8gBNBFAgghBkEf/3uuMCIIIQaLVfP7rjAiCCEGp2OHi64wIgghBw2J/JuuMCHxoIBgNaMPhG8uBM+EJu4wAhk9TR0N76QNN/1NHQ+kDU0dD6QNTR0PpA1NHbPDDbPPIATQdAAr5fA/hJ+E3HBfLj/ds8+E9YoLV/IPhv+CNwVQKIjQRwAAAAAAAAAAAAAAAAEU/8OGDIzszOywfLP8t/yXD7ADD4T/hL+ErIz4WIznHPC25ZyM+QmiWLms7Lf83JgED7AERDAzYw+Eby4Ez4Qm7jACGT1NHQ3vpA0ds8MNs88gBNCUAEiPhJ+EzHBfLj6fhtbwDIjQRRmFybWluZyBhY2NvdW50OiCDbPPgo2zzbPND+FDBvAMiNBBGYXJtaW5nIHdhbGxldDoggOAwmCgT42zz4Tds82zzQ/hQw+ErIz4WIzo0EkBfXhAAAAAAAAAAAAAAAAAAAwM8W+EvIz5Daw3KCzs3JcPsAcPgjcPhLiI0EcAAAAAAAAAAAAAAAABFP/DhgyM7MzssHyz/Lf8lw+wCCEAX14QB0+wL4S8jPhYjOgG/PQMmBAID7ADgMJgsAKGZhcm1pbmdXYWxsZXRDcmVhdGVkAzr6RF1VAts8MzMhzzXCCI6A3yHPhOoygEB/IHDbPA4NDwEOXyLbPDPIMjoBGlkitgtwIH9VBcEA2zwPBFAlzzWrAiCOgN9VApKAMJKAIOJYlSXPhLY23iGlMiGOgN9VA4AQ2zwgGRgzEAQg2zwljoDeUwO7joCOgOJfBjIUEhEDIiOOgORfJ9s8OMg3UwOhjoDkEzoTAQggjoDkEwE6Ids8MyDBCpMngDCZU3WSgFeSgDfi4iKgzwsHODAtAixTULkmwn+x8tBFU1ChUwS7joCOgOIwFhUBRCSWU3PPCwc45F8o2zw5yDhTBKGWU3PPCwc45IB/IaEloDU6ASIgllNzzwsHOORTQKE1JI6A3xcBFF8o2zw5yDiAfzU6ARRfJts8N8g2gH8yOgEUXyfbPDjINzCAfzoCeDD4Qm7jAPhG8nPRcfhughAR4aMA+Cj4TMjPhYjOcc8LblmLgx7dTHanY4eIyM7Oy3/NyYEAgPsA2zzyABtAAhbtRNDXScIBjoDjDRxNBIZw7UTQ9AVxIYBA9A6OgN9yIoBA9A6OgN9zI4BA9A6OgN+JcF8w+HH4cPhv+G74bfhs+Gv4aoBA9A7yvdcL//hicPhjHR0dHgECiR4AQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABADNjD4RvLgTPhCbuMAIZPU0dDe+kDR2zww2zzyAE0gQAG0+En4S8cF8uPp2zxw+HD4I/hxAcjPhYjOjQVOYloAAAAAAAAAAAAAAAAAAAAlwz5AzxbJcPsA+Ev4SnDIz4WAygBzz0DOcc8LblnIz5C9t7YOzssPzcmAQPsARQRQIIIQM5kl/LrjAiCCEDqZdFy64wIgghBORwp9uuMCIIIQYVK25brjAjskIyIBUDDR2zz4UCGOHI0EcAAAAAAAAAAAAAAAADhUrblgyM7Lf8lw+wDe8gBNA5Qw+Eby4Ez4Qm7jACGT1NHQ3tN/03/R2zwhjigj0NMB+kAwMcjPhyDOjQQAAAAAAAAAAAAAAAAM5HCn2M8Wy3/JcPsAkTDi4wDyAE1HPAM2MPhG8uBM+EJu4wAhk9TR0N7Tf9HbPDDbPPIATSVAA4popvtg8tBI+En4SscF8uPp+G5vAMiL9GYXJtaW5nIHNwZWVkOiCNs8+E5wXyDbPNs80P4UMPhLyM+FiM6Ab89AyYBA+wA4KCYBGJYhb4jAALOOgOjJMScBDCHbPDPPES0ETCTPNasCII6A31iSgDCSgCDiWJUkz4S2Nd4hpTIhjoDfVQJ62zwgNzYzKQQg2zwkjoDeUwO7joCOgOJfBTIuKyoDIiOOgORfJts8N8g2UwOhjoDkLDosAQggjoDkLAEaIds8MyaAMFigzwsHNi0AHG+Nb41ZIG+Ikm+MkTDiAixTQLklwn+x8tBCU0ChUwS7joCOgOIwMC8BRCSWU2PPCwc35F8n2zw4yDdTBKGWU2PPCwc35IB/IaEloDU6ASIgllNjzwsHN+RTQKE1JI6A3zEBFF8n2zw4yDeAfzU6ACYgb4ggm6WBAP+oAW+Lb4igkTHiAiJvACKOgOFwkyPDAI6A6DBsITU0ARJdqQwyNFzbPDI6AQpw2zxsIToBFF8l2zw2yDWAfzI6ARRfJts8N8g2MIB/OgE4Ic81pvkh10sgliNwItcxNN4wIbuOgN9TEs5sMTkBGlzXGDMjzjNd2zw0yDM6ADoBIG+In2+NIG+IgQD/oZRvjG8A35JvAOJYb4xvjAOAMPhG8uBM+EJu4wDR2zwhjigj0NMB+kAwMcjPhyDOjQQAAAAAAAAAAAAAAAALOZJfyM8Wyw/JcPsAkTDi4wDyAE1FPAAo7UTQ0//TPzH4Q1jIy//LP87J7VQETiCCCfTL+7rjAiCCEAdvmx+64wIgghAIVHoHuuMCIIIQDrgTe7rjAkxLPz4BUDDR2zz4USGOHI0EcAAAAAAAAAAAAAAAACOuBN7gyM7Lf8lw+wDe8gBNAzYw+Eby4Ez4Qm7jACGT1NHQ3tN/0ds8MNs88gBNQUAAcvhR+FD4T/hO+E34TPhL+Er4Q/hCyMv/yz/Pg85VYMjOVVDIzlVAyM7Lf8t/y38ByMt/zc3NzcntVAT++En4S8cF8uPp2zz4TyGhtX/4b4h/+Etw+EtVBPhNyM+FiM6NBJBHhowAAAAAAAAAAAAAAAAAAMDPFlVQyM+Rz4iFDst/zst/VSDIzsoAzM3NyXD7APhP+CNw+EuIjQRwAAAAAAAAAAAAAAAAEU/8OGDIzszOywfLP8t/yXD7AERRQ0IASnB0+wL4T/hL+ErIz4WIznHPC25ZyM+QmiWLms7Lf83JgQCA+wAAKmZhcm1pbmdCYWxhbmNlVXBkYXRlZAEQ2zz4cPgj+HFFAiT4UPgj+FGhtX/4T9s8oLV/2zxHRgAaIIEEALyUMIEEAOC1DwJyIJJbcOEBgGR2I4IQO5rKAKkF2zyotX+gtX+otX9xWIIQO5rKAKkFoLV/2zyotX+BAyD4Tqi1f6kESkgB/CDCAPLgZHAhgnEAAAAAAAAAAAAAAAAAAAAAvpohq38ygQCAoLV/3iGCMQAAAAAAAAAAvpghqz8ypkC1f94hghEAAAAAvpghqx8ypiC1f94hggEAAL6YIasPMqYQtX/eIYEBAL6YIasHMqYItX/eIcIPmCGrAzKmBLV/3iHCA0kAJJghqwEypgK1f94BwgGTpLV/3gAgcJMhwgGYIXqpBTKktX/oMQFQMNHbPPhPIY4cjQRwAAAAAAAAAAAAAAAAIdvmx+DIzst/yXD7AN7yAE0BUDDR2zz4TiGOHI0EcAAAAAAAAAAAAAAAACB9Mv7gyM7Lf8lw+wDe8gBNAHbtRNDT/9M/0wAx+kDU0dD6QNTR0PpA1NHQ+kDTf9N/03/U0dDTf9H4cfhw+G/4bvht+Gz4a/hq+GP4YgAK+Eby4EwCCvSkIPShUVAAFHNvbCAwLjU3LjAAAA==",
    codeHash: "c564925b015509b23732c094a8f19d5505e4631e235d1e8c5d329ec66c109900",
};
module.exports = { FarmingWalletContract };