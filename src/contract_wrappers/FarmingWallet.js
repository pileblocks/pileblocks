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
                "name": "FARMING_DEPLOY_VALUE",
                "type": "uint128"
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
                "name": "MIN_MESSAGE",
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
    codeHash: "6d1eb32dba14a75770d50da654dc3b4fca1099ce3105621a156394fe942e7900",
};
module.exports = { FarmingWalletContract };