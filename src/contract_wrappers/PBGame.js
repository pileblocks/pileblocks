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
                            }
                        ],
                        "name": "value0",
                        "type": "tuple"
                    }
                ]
            },
            {
                "name": "generateFakePlayers",
                "inputs": [
                    {
                        "name": "playerNum",
                        "type": "uint16"
                    }
                ],
                "outputs": []
            },
            {
                "name": "cGame",
                "inputs": [
                    {
                        "name": "totalReward",
                        "type": "uint128"
                    }
                ],
                "outputs": []
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
    codeHash: "e539c7ed34817e7815a1183e564eb54962e3834d340a267882167cf4d1355142",
};
module.exports = { PBGameContract };