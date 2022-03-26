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
    tvc: "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",
    code: "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",
    codeHash: "4b6794908e2492edb5d2086748598b62c490656dd4e6daacf875d421dc5349d8",
};
module.exports = { GameHostContract };