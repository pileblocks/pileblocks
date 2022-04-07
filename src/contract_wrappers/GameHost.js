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
    codeHash: "fced00e61b4ff26304f187946e8b8e86ddd765cf0bcf4775d9a0f9679cb7cb03",
};
module.exports = { GameHostContract };