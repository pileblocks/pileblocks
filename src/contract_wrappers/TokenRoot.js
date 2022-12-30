const TokenRootContract = {
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
                        "name": "initialSupplyTo",
                        "type": "address"
                    },
                    {
                        "name": "initialSupply",
                        "type": "uint128"
                    },
                    {
                        "name": "deployWalletValue",
                        "type": "uint128"
                    },
                    {
                        "name": "mintDisabled",
                        "type": "bool"
                    },
                    {
                        "name": "burnByRootDisabled",
                        "type": "bool"
                    },
                    {
                        "name": "burnPaused",
                        "type": "bool"
                    },
                    {
                        "name": "remainingGasTo",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "supportsInterface",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "interfaceID",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "disableMint",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "mintDisabled",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "burnTokens",
                "inputs": [
                    {
                        "name": "amount",
                        "type": "uint128"
                    },
                    {
                        "name": "walletOwner",
                        "type": "address"
                    },
                    {
                        "name": "remainingGasTo",
                        "type": "address"
                    },
                    {
                        "name": "callbackTo",
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
                "name": "disableBurnByRoot",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "burnByRootDisabled",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "burnPaused",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "setBurnPaused",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "paused",
                        "type": "bool"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "transferOwnership",
                "inputs": [
                    {
                        "name": "newOwner",
                        "type": "address"
                    },
                    {
                        "name": "remainingGasTo",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "name": "value",
                                "type": "uint128"
                            },
                            {
                                "name": "payload",
                                "type": "cell"
                            }
                        ],
                        "name": "callbacks",
                        "type": "map(address,tuple)"
                    }
                ],
                "outputs": []
            },
            {
                "name": "name",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "string"
                    }
                ]
            },
            {
                "name": "symbol",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "string"
                    }
                ]
            },
            {
                "name": "decimals",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint8"
                    }
                ]
            },
            {
                "name": "totalSupply",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
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
                "name": "walletCode",
                "inputs": [
                    {
                        "name": "answerId",
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
                "name": "rootOwner",
                "inputs": [
                    {
                        "name": "answerId",
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
                "name": "walletOf",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "walletOwner",
                        "type": "address"
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
                "name": "deployWallet",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "walletOwner",
                        "type": "address"
                    },
                    {
                        "name": "deployWalletValue",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "tokenWallet",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "mint",
                "inputs": [
                    {
                        "name": "amount",
                        "type": "uint128"
                    },
                    {
                        "name": "recipient",
                        "type": "address"
                    },
                    {
                        "name": "deployWalletValue",
                        "type": "uint128"
                    },
                    {
                        "name": "remainingGasTo",
                        "type": "address"
                    },
                    {
                        "name": "notify",
                        "type": "bool"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "acceptBurn",
                "id": "0x192B51B1",
                "inputs": [
                    {
                        "name": "amount",
                        "type": "uint128"
                    },
                    {
                        "name": "walletOwner",
                        "type": "address"
                    },
                    {
                        "name": "remainingGasTo",
                        "type": "address"
                    },
                    {
                        "name": "callbackTo",
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
                "name": "sendSurplusGas",
                "inputs": [
                    {
                        "name": "to",
                        "type": "address"
                    }
                ],
                "outputs": []
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "name_",
                "type": "string"
            },
            {
                "key": 2,
                "name": "symbol_",
                "type": "string"
            },
            {
                "key": 3,
                "name": "decimals_",
                "type": "uint8"
            },
            {
                "key": 4,
                "name": "rootOwner_",
                "type": "address"
            },
            {
                "key": 5,
                "name": "walletCode_",
                "type": "cell"
            },
            {
                "key": 6,
                "name": "randomNonce_",
                "type": "uint256"
            },
            {
                "key": 7,
                "name": "deployer_",
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
                "name": "name_",
                "type": "string"
            },
            {
                "name": "symbol_",
                "type": "string"
            },
            {
                "name": "decimals_",
                "type": "uint8"
            },
            {
                "name": "rootOwner_",
                "type": "address"
            },
            {
                "name": "walletCode_",
                "type": "cell"
            },
            {
                "name": "totalSupply_",
                "type": "uint128"
            },
            {
                "name": "burnPaused_",
                "type": "bool"
            },
            {
                "name": "burnByRootDisabled_",
                "type": "bool"
            },
            {
                "name": "mintDisabled_",
                "type": "bool"
            },
            {
                "name": "randomNonce_",
                "type": "uint256"
            },
            {
                "name": "deployer_",
                "type": "address"
            }
        ]
    },
    tvc: "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",
    code: "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",
    codeHash: "e34d09807ef5576caaa5a21546cdc92ac0d699ade27bc336a5330345354728d7",
};
module.exports = { TokenRootContract };