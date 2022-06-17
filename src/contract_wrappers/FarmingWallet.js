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
    codeHash: "821f3d465a319543cab7d07e8d0daa1f2416a99ead430e6efc2b9bb42f14ebc7",
};
module.exports = { FarmingWalletContract };