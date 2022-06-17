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
                "inputs": [],
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
                "name": "setFarmingCode",
                "inputs": [
                    {
                        "name": "_farmingCode",
                        "type": "cell"
                    }
                ],
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
                    },
                    {
                        "name": "_gameStartTime",
                        "type": "uint64"
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
                "name": "runGameInQueue",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "onGetNextGame",
                "inputs": [
                    {
                        "name": "newGameAddress",
                        "type": "address"
                    }
                ],
                "outputs": []
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
                            },
                            {
                                "name": "gameStartTime",
                                "type": "uint64"
                            }
                        ],
                        "name": "gameInfo",
                        "type": "tuple"
                    }
                ],
                "outputs": []
            },
            {
                "name": "onGetNextGameAfterComplete",
                "inputs": [
                    {
                        "name": "newGameAddress",
                        "type": "address"
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
                            },
                            {
                                "name": "gameStartTime",
                                "type": "uint64"
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
                "name": "isNextGameEmpty",
                "inputs": [],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "setQueueAddress",
                "inputs": [
                    {
                        "name": "_queueAddress",
                        "type": "address"
                    }
                ],
                "outputs": []
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
            },
            {
                "name": "queueAddress",
                "inputs": [],
                "outputs": [
                    {
                        "name": "queueAddress",
                        "type": "address"
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
                "name": "farmingCode",
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
            },
            {
                "name": "queueAddress",
                "type": "address"
            }
        ]
    },
    tvc: "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",
    code: "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",
    codeHash: "ffc14ab6a78bb3fb83966b239926250f15c92688528854e2515164f3a16266b4",
};
module.exports = { GameHostContract };