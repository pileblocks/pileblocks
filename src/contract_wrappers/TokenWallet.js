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
                    },
                    {
                        "name": "genesis",
                        "type": "address"
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
    codeHash: "3824795e30bac2c37b0a5e5c175078b51d4d32580f28c7234a96a05cafba6603",
};
module.exports = { TokenWalletContract };