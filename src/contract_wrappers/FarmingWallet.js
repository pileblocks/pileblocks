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
    codeHash: "9c190fcebb4b43015636f1498f6f51f9af8a7294ca44bde4d4b0f99ebe40c1d5",
};
module.exports = { FarmingWalletContract };