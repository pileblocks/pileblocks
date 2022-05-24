const PBGameContract = {
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
                "name": "saveImageFragment",
                "inputs": [
                    {
                        "name": "fragmentNum",
                        "type": "uint8"
                    },
                    {
                        "name": "tiles",
                        "type": "uint8[][]"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setImageForReview",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "setGameStatus",
                "inputs": [
                    {
                        "name": "newStatus",
                        "type": "uint8"
                    }
                ],
                "outputs": []
            },
            {
                "name": "onClaimTiles",
                "inputs": [
                    {
                        "name": "ownerAddress",
                        "type": "address"
                    },
                    {
                        "name": "tilesNum",
                        "type": "uint16"
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
                "name": "packTiles",
                "inputs": [
                    {
                        "components": [
                            {
                                "name": "f",
                                "type": "uint8"
                            },
                            {
                                "name": "x",
                                "type": "uint8"
                            },
                            {
                                "name": "y",
                                "type": "uint8"
                            },
                            {
                                "name": "color",
                                "type": "uint8"
                            }
                        ],
                        "name": "tiles",
                        "type": "tuple[]"
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
                "name": "completeGame",
                "inputs": [
                    {
                        "name": "totalReward",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "claimReward",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "drainByHost",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "drainTokens",
                "inputs": [
                    {
                        "name": "value",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "isImageComplete",
                "inputs": [],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "getInfo",
                "inputs": [],
                "outputs": [
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
                        "name": "value0",
                        "type": "tuple"
                    }
                ]
            },
            {
                "name": "fillSortable",
                "inputs": [
                    {
                        "name": "startPlayerAddress",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "distributeRewards",
                "inputs": [
                    {
                        "components": [
                            {
                                "name": "value",
                                "type": "uint16"
                            },
                            {
                                "name": "created",
                                "type": "int64"
                            }
                        ],
                        "name": "startPlayerSortable",
                        "type": "tuple"
                    }
                ],
                "outputs": []
            },
            {
                "name": "players",
                "inputs": [],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "walletAddress",
                                "type": "address"
                            },
                            {
                                "name": "captured",
                                "type": "uint16"
                            },
                            {
                                "name": "isLast",
                                "type": "bool"
                            },
                            {
                                "name": "isPrelast",
                                "type": "bool"
                            },
                            {
                                "name": "lastPutTime",
                                "type": "uint64"
                            },
                            {
                                "name": "reward",
                                "type": "uint128"
                            },
                            {
                                "name": "isReceived",
                                "type": "bool"
                            }
                        ],
                        "name": "players",
                        "type": "map(address,tuple)"
                    }
                ]
            },
            {
                "name": "playerColors",
                "inputs": [],
                "outputs": [
                    {
                        "name": "playerColors",
                        "type": "map(address,uint16[])"
                    }
                ]
            },
            {
                "name": "field",
                "inputs": [],
                "outputs": [
                    {
                        "name": "field",
                        "type": "map(uint8,uint8[][])"
                    }
                ]
            },
            {
                "name": "template",
                "inputs": [],
                "outputs": [
                    {
                        "name": "template",
                        "type": "map(uint8,uint8[][])"
                    }
                ]
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "walletCode",
                "type": "cell"
            },
            {
                "key": 2,
                "name": "tokenRootAddress",
                "type": "address"
            },
            {
                "key": 3,
                "name": "created",
                "type": "uint64"
            },
            {
                "key": 4,
                "name": "imageOwner",
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
                "name": "mSortablePlayers",
                "type": "optional(cell)"
            },
            {
                "name": "rewardCoeff",
                "type": "uint128"
            },
            {
                "name": "lastTile",
                "type": "uint16"
            },
            {
                "name": "numberOfTiles",
                "type": "uint16"
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
                "name": "created",
                "type": "uint64"
            },
            {
                "name": "imageOwner",
                "type": "address"
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
                "name": "gameId",
                "type": "uint32"
            },
            {
                "name": "gameHost",
                "type": "address"
            },
            {
                "name": "status",
                "type": "uint8"
            },
            {
                "name": "vertFragments",
                "type": "uint8"
            },
            {
                "name": "horizFragments",
                "type": "uint8"
            },
            {
                "name": "maxColors",
                "type": "uint8"
            },
            {
                "name": "renderSettings",
                "type": "uint24[]"
            },
            {
                "name": "tokensPerPut",
                "type": "uint128"
            },
            {
                "name": "gameName",
                "type": "string"
            },
            {
                "name": "gameStartTime",
                "type": "uint64"
            },
            {
                "components": [
                    {
                        "name": "walletAddress",
                        "type": "address"
                    },
                    {
                        "name": "captured",
                        "type": "uint16"
                    },
                    {
                        "name": "isLast",
                        "type": "bool"
                    },
                    {
                        "name": "isPrelast",
                        "type": "bool"
                    },
                    {
                        "name": "lastPutTime",
                        "type": "uint64"
                    },
                    {
                        "name": "reward",
                        "type": "uint128"
                    },
                    {
                        "name": "isReceived",
                        "type": "bool"
                    }
                ],
                "name": "players",
                "type": "map(address,tuple)"
            },
            {
                "name": "playerColors",
                "type": "map(address,uint16[])"
            },
            {
                "name": "field",
                "type": "map(uint8,uint8[][])"
            },
            {
                "name": "template",
                "type": "map(uint8,uint8[][])"
            }
        ]
    },
    tvc: "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",
    code: "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",
    codeHash: "75f22400d2312ddeb3d3d6d9edc1906fc4178cc33107c5a0cc16cbc9e11e8f98",
};
module.exports = { PBGameContract };