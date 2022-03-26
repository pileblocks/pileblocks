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
            }
        ]
    },
    tvc: "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",
    code: "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",
    codeHash: "3b630786291d35728868e2ea0135b9915c7fac9eeaef2490ee67a53ead3deca7",
};
module.exports = { TokenWalletContract };