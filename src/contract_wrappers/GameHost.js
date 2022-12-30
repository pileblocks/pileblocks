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
    codeHash: "c81c9545c7ba82f060b23d440d6f462bc0d514044231b9f69b6af7dc0852a523",
};
module.exports = { GameHostContract };