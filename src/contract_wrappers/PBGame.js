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
    codeHash: "5b753404089d4c6f80ea7d016949151fa8e8f624431787e84df56d4d6c5f047c",
};
module.exports = { PBGameContract };