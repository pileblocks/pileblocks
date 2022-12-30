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
                        "name": "value0",
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
                        "name": "value3",
                        "type": "address"
                    },
                    {
                        "name": "value4",
                        "type": "address"
                    },
                    {
                        "name": "value5",
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
    codeHash: "c399934e66ed291aa01ec3844196df1a44456cf62a4e868182d386e952b1b563",
};
module.exports = { FarmingWalletContract };