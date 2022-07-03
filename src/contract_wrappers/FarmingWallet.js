const FarmingWalletContract = {
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
                "inputs": [],
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
                "name": "releaseTokens",
                "inputs": [
                    {
                        "name": "amount",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setFarmingSpeed",
                "inputs": [
                    {
                        "name": "newSpeed",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "calcFarming",
                "inputs": [
                    {
                        "name": "time",
                        "type": "uint128"
                    },
                    {
                        "name": "tokenBalance",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "showTiles",
                "inputs": [],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint16"
                    }
                ]
            },
            {
                "name": "claimTiles",
                "inputs": [
                    {
                        "name": "genesis",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "tokenWallet",
                "inputs": [],
                "outputs": [
                    {
                        "name": "tokenWallet",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "farmingSpeed",
                "inputs": [],
                "outputs": [
                    {
                        "name": "farmingSpeed",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "_balance",
                "inputs": [],
                "outputs": [
                    {
                        "name": "_balance",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "tilesNum",
                "inputs": [],
                "outputs": [
                    {
                        "name": "tilesNum",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "tilesChangeTime",
                "inputs": [],
                "outputs": [
                    {
                        "name": "tilesChangeTime",
                        "type": "uint128"
                    }
                ]
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "game",
                "type": "address"
            },
            {
                "key": 2,
                "name": "owner",
                "type": "address"
            },
            {
                "key": 3,
                "name": "tokenRootAddress",
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
            },
            {
                "name": "GameBattleEvent",
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
                        "name": "timestamp",
                        "type": "uint64"
                    },
                    {
                        "name": "value",
                        "type": "uint128"
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
                "name": "game",
                "type": "address"
            },
            {
                "name": "owner",
                "type": "address"
            },
            {
                "name": "tokenRootAddress",
                "type": "address"
            },
            {
                "name": "tokenWallet",
                "type": "address"
            },
            {
                "name": "farmingSpeed",
                "type": "uint128"
            },
            {
                "name": "_balance",
                "type": "uint128"
            },
            {
                "name": "tilesNum",
                "type": "uint128"
            },
            {
                "name": "tilesChangeTime",
                "type": "uint128"
            }
        ]
    },
    tvc: "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",
    code: "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",
    codeHash: "e4bb0ad79f069557be6071eb5c2ca6cfe25bf657e02b3c093c00da2811df37e8",
};
module.exports = { FarmingWalletContract };