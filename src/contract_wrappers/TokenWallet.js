const TokenWalletContract = {
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
                "name": "claimTiles",
                "inputs": [
                    {
                        "name": "gameAddress",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "putTiles",
                "inputs": [
                    {
                        "name": "genesis",
                        "type": "address"
                    },
                    {
                        "name": "gameHost",
                        "type": "address"
                    },
                    {
                        "name": "gameAddress",
                        "type": "address"
                    },
                    {
                        "name": "tokensNum",
                        "type": "uint128"
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
                    }
                ],
                "outputs": []
            },
            {
                "name": "destroy",
                "inputs": [
                    {
                        "name": "remainingGasTo",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "burnByRoot",
                "inputs": [
                    {
                        "name": "amount",
                        "type": "uint128"
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
                "name": "burn",
                "inputs": [
                    {
                        "name": "amount",
                        "type": "uint128"
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
                "name": "balance",
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
                "name": "owner",
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
                "name": "root",
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
                "name": "transfer",
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
                "name": "transferToWallet",
                "inputs": [
                    {
                        "name": "amount",
                        "type": "uint128"
                    },
                    {
                        "name": "recipientTokenWallet",
                        "type": "address"
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
                "name": "acceptTransfer",
                "id": "0x67A0B95F",
                "inputs": [
                    {
                        "name": "amount",
                        "type": "uint128"
                    },
                    {
                        "name": "sender",
                        "type": "address"
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
                "name": "acceptMint",
                "id": "0x4384F298",
                "inputs": [
                    {
                        "name": "amount",
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
                "name": "sendSurplusGas",
                "inputs": [
                    {
                        "name": "to",
                        "type": "address"
                    }
                ],
                "outputs": []
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
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "root_",
                "type": "address"
            },
            {
                "key": 2,
                "name": "owner_",
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
                "name": "root_",
                "type": "address"
            },
            {
                "name": "owner_",
                "type": "address"
            },
            {
                "name": "balance_",
                "type": "uint128"
            },
            {
                "name": "tilesNum",
                "type": "uint128"
            },
            {
                "name": "tilesChangeTime",
                "type": "uint128"
            },
            {
                "name": "prevBalance",
                "type": "uint128"
            },
            {
                "name": "totalTime",
                "type": "uint128"
            }
        ]
    },
    tvc: "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",
    code: "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",
    codeHash: "42e8cc02d5e1bfa702d020d5da53621f7066f77278d1841ce401b7546e6d685a",
};
module.exports = { TokenWalletContract };