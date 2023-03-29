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
                "name": "setGameMap",
                "inputs": [
                    {
                        "name": "_gameMap",
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
                "inputs": [],
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
                "name": "setGameStatus",
                "inputs": [
                    {
                        "name": "gameAddress",
                        "type": "address"
                    },
                    {
                        "name": "newStatus",
                        "type": "uint8"
                    }
                ],
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
                "name": "onWinnerSet",
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
                    },
                    {
                        "name": "winnerAddress",
                        "type": "address"
                    }
                ],
                "outputs": []
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
            },
            {
                "name": "isQueueFinished",
                "inputs": [],
                "outputs": [
                    {
                        "name": "isQueueFinished",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "gameMap",
                "inputs": [],
                "outputs": [
                    {
                        "name": "gameMap",
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
                "name": "FARMING_DEPLOY_VALUE",
                "type": "uint128"
            },
            {
                "name": "DEPLOY_VALUE",
                "type": "uint128"
            },
            {
                "name": "MIN_BALANCE",
                "type": "uint128"
            },
            {
                "name": "MESSAGE_VALUE",
                "type": "uint128"
            },
            {
                "name": "MIN_MESSAGE",
                "type": "uint128"
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
                "name": "queueAddress",
                "type": "address"
            },
            {
                "name": "isQueueFinished",
                "type": "bool"
            },
            {
                "name": "gameMap",
                "type": "address"
            }
        ]
    },
    tvc: "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",
    code: "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",
    codeHash: "cbed903dc00307ad8ebaa7881bc1733218e4a02de0003dbc79d2a56bf2c29b42",
};
module.exports = { GameHostContract };