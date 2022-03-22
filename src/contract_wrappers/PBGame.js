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
                "name": "onPutTiles",
                "inputs": [
                    {
                        "name": "ownerAddress",
                        "type": "address"
                    },
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
                    },
                    {
                        "name": "tokensNum",
                        "type": "uint128"
                    }
                ],
                "outputs": []
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
    codeHash: "62eba8836c4cbcce48ad3240aece9ea0a75ded8f0be1ef61d26ab449f1fdf000",
};
module.exports = { PBGameContract };