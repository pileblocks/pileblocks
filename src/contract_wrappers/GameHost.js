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
    codeHash: "38a7a81a1543efcd732e1a00ba7e2a588c9f87a0117582966bd62d5bc50a7cdd",
};
module.exports = { GameHostContract };