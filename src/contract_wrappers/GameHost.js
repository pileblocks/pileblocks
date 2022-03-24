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
    codeHash: "578c4747f2b4e21558306a308be5d280fb8438d1df0d8bc1cd97422a99637fd8",
};
module.exports = { GameHostContract };