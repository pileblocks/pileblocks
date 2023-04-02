const CollectionContract = {
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
                        "name": "codeNft",
                        "type": "cell"
                    },
                    {
                        "name": "codeIndex",
                        "type": "cell"
                    },
                    {
                        "name": "codeIndexBasis",
                        "type": "cell"
                    },
                    {
                        "name": "ownerPubkey",
                        "type": "uint256"
                    },
                    {
                        "name": "json",
                        "type": "string"
                    },
                    {
                        "name": "mintingFee",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "mintNft",
                "inputs": [
                    {
                        "name": "json",
                        "type": "string"
                    }
                ],
                "outputs": []
            },
            {
                "name": "withdraw",
                "inputs": [
                    {
                        "name": "dest",
                        "type": "address"
                    },
                    {
                        "name": "value",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "onTokenBurned",
                "inputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "name": "manager",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setRemainOnNft",
                "inputs": [
                    {
                        "name": "remainOnNft",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setMintingFee",
                "inputs": [
                    {
                        "name": "mintingFee",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "mintingFee",
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
                "name": "setNftParams",
                "inputs": [
                    {
                        "name": "nftAddress",
                        "type": "address"
                    },
                    {
                        "name": "_paramType",
                        "type": "uint8"
                    },
                    {
                        "name": "_paramIndex",
                        "type": "uint128"
                    },
                    {
                        "name": "_paramValue",
                        "type": "uint128"
                    },
                    {
                        "name": "_paramArray",
                        "type": "uint8[]"
                    },
                    {
                        "name": "_applyNumTimes",
                        "type": "uint8"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setMintAddress",
                "inputs": [
                    {
                        "name": "_mintAddress",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setJson",
                "inputs": [
                    {
                        "name": "nftAddress",
                        "type": "address"
                    },
                    {
                        "name": "json",
                        "type": "string"
                    }
                ],
                "outputs": []
            },
            {
                "name": "nftOwnerCodeHash",
                "inputs": [
                    {
                        "name": "_nftOwner",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "codeHash",
                        "type": "string"
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
                        "name": "pubkey",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "transferOwnership",
                "inputs": [
                    {
                        "name": "newOwner",
                        "type": "uint256"
                    }
                ],
                "outputs": []
            },
            {
                "name": "indexBasisCode",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "code",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "indexBasisCodeHash",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "hash",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "resolveIndexBasis",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "indexBasis",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "indexCode",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "code",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "indexCodeHash",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "hash",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "getJson",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "json",
                        "type": "string"
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
                        "name": "count",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "nftCode",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "code",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "nftCodeHash",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "codeHash",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "nftAddress",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "nft",
                        "type": "address"
                    }
                ]
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
                "name": "mintAddress",
                "inputs": [],
                "outputs": [
                    {
                        "name": "mintAddress",
                        "type": "address"
                    }
                ]
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "_nonce",
                "type": "uint64"
            }
        ],
        "events": [
            {
                "name": "OwnershipTransferred",
                "inputs": [
                    {
                        "name": "oldOwner",
                        "type": "uint256"
                    },
                    {
                        "name": "newOwner",
                        "type": "uint256"
                    }
                ],
                "outputs": []
            },
            {
                "name": "NftCreated",
                "inputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "nft",
                        "type": "address"
                    },
                    {
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "name": "manager",
                        "type": "address"
                    },
                    {
                        "name": "creator",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "NftBurned",
                "inputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "nft",
                        "type": "address"
                    },
                    {
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "name": "manager",
                        "type": "address"
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
                "name": "_supportedInterfaces",
                "type": "optional(cell)"
            },
            {
                "name": "_codeNft",
                "type": "cell"
            },
            {
                "name": "_totalSupply",
                "type": "uint128"
            },
            {
                "name": "_json",
                "type": "string"
            },
            {
                "name": "_codeIndex",
                "type": "cell"
            },
            {
                "name": "_codeIndexBasis",
                "type": "cell"
            },
            {
                "name": "_indexDeployValue",
                "type": "uint128"
            },
            {
                "name": "_indexDestroyValue",
                "type": "uint128"
            },
            {
                "name": "_deployIndexBasisValue",
                "type": "uint128"
            },
            {
                "name": "_owner",
                "type": "uint256"
            },
            {
                "name": "_remainOnNft",
                "type": "uint128"
            },
            {
                "name": "_lastTokenId",
                "type": "uint128"
            },
            {
                "name": "_mintingFee",
                "type": "uint128"
            },
            {
                "name": "_nonce",
                "type": "uint64"
            },
            {
                "name": "mintAddress",
                "type": "address"
            }
        ]
    },
    tvc: "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",
    code: "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",
    codeHash: "a6ad23df98eb3b3aab206401d7005e46e6e522f4d1ebcc68cf1e494ddd6da7a1",
};
module.exports = { CollectionContract };