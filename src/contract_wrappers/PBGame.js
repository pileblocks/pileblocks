const PBGameContract = {
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
                        "name": "_renderSettings",
                        "type": "uint24[]"
                    },
                    {
                        "name": "_gameName",
                        "type": "string"
                    },
                    {
                        "name": "_gameStartTime",
                        "type": "uint64"
                    }
                ],
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
                "name": "saveImageFragment",
                "inputs": [
                    {
                        "name": "fragmentNum",
                        "type": "uint8"
                    },
                    {
                        "name": "tiles",
                        "type": "uint8[][]"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setImageForReview",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "setGameStatus",
                "inputs": [
                    {
                        "name": "newStatus",
                        "type": "uint8"
                    }
                ],
                "outputs": []
            },
            {
                "name": "onClaimTiles",
                "inputs": [
                    {
                        "name": "ownerAddress",
                        "type": "address"
                    },
                    {
                        "name": "tilesNum",
                        "type": "uint16"
                    }
                ],
                "outputs": []
            },
            {
                "name": "onPutTiles",
                "inputs": [
                    {
                        "name": "ownerAddress",
                        "type": "address"
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
                    },
                    {
                        "name": "tokensNum",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "completeGame",
                "inputs": [
                    {
                        "name": "totalReward",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "claimReward",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "drainByHost",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "drainTokens",
                "inputs": [
                    {
                        "name": "value",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "isImageComplete",
                "inputs": [],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "getInfo",
                "inputs": [],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "tokenRootAddress",
                                "type": "address"
                            },
                            {
                                "name": "created",
                                "type": "uint64"
                            },
                            {
                                "name": "imageOwner",
                                "type": "address"
                            },
                            {
                                "name": "gameId",
                                "type": "uint32"
                            },
                            {
                                "name": "gameWallet",
                                "type": "address"
                            },
                            {
                                "name": "remainingTiles",
                                "type": "uint16"
                            },
                            {
                                "name": "gameHost",
                                "type": "address"
                            },
                            {
                                "name": "renderConfig",
                                "type": "uint24[]"
                            },
                            {
                                "name": "status",
                                "type": "uint8"
                            },
                            {
                                "name": "gameName",
                                "type": "string"
                            },
                            {
                                "name": "gameStartTime",
                                "type": "uint64"
                            }
                        ],
                        "name": "value0",
                        "type": "tuple"
                    }
                ]
            },
            {
                "name": "fillSortable",
                "inputs": [
                    {
                        "name": "startPlayerAddress",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "distributeRewards",
                "inputs": [
                    {
                        "components": [
                            {
                                "name": "value",
                                "type": "uint16"
                            },
                            {
                                "name": "created",
                                "type": "int64"
                            }
                        ],
                        "name": "startPlayerSortable",
                        "type": "tuple"
                    }
                ],
                "outputs": []
            },
            {
                "name": "players",
                "inputs": [],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "walletAddress",
                                "type": "address"
                            },
                            {
                                "name": "captured",
                                "type": "uint16"
                            },
                            {
                                "name": "isLast",
                                "type": "bool"
                            },
                            {
                                "name": "isPrelast",
                                "type": "bool"
                            },
                            {
                                "name": "lastPutTime",
                                "type": "uint64"
                            },
                            {
                                "name": "reward",
                                "type": "uint128"
                            },
                            {
                                "name": "isReceived",
                                "type": "bool"
                            }
                        ],
                        "name": "players",
                        "type": "map(address,tuple)"
                    }
                ]
            },
            {
                "name": "playerColors",
                "inputs": [],
                "outputs": [
                    {
                        "name": "playerColors",
                        "type": "map(address,uint16[])"
                    }
                ]
            },
            {
                "name": "field",
                "inputs": [],
                "outputs": [
                    {
                        "name": "field",
                        "type": "map(uint8,uint8[][])"
                    }
                ]
            },
            {
                "name": "template",
                "inputs": [],
                "outputs": [
                    {
                        "name": "template",
                        "type": "map(uint8,uint8[][])"
                    }
                ]
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "walletCode",
                "type": "cell"
            },
            {
                "key": 2,
                "name": "tokenRootAddress",
                "type": "address"
            },
            {
                "key": 3,
                "name": "created",
                "type": "uint64"
            },
            {
                "key": 4,
                "name": "imageOwner",
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
                "name": "mSortablePlayers",
                "type": "optional(cell)"
            },
            {
                "name": "rewardCoeff",
                "type": "uint128"
            },
            {
                "name": "lastTile",
                "type": "uint16"
            },
            {
                "name": "numberOfTiles",
                "type": "uint16"
            },
            {
                "name": "walletCode",
                "type": "cell"
            },
            {
                "name": "tokenRootAddress",
                "type": "address"
            },
            {
                "name": "created",
                "type": "uint64"
            },
            {
                "name": "imageOwner",
                "type": "address"
            },
            {
                "name": "gameWallet",
                "type": "address"
            },
            {
                "name": "remainingTiles",
                "type": "uint16"
            },
            {
                "name": "gameId",
                "type": "uint32"
            },
            {
                "name": "gameHost",
                "type": "address"
            },
            {
                "name": "status",
                "type": "uint8"
            },
            {
                "name": "vertFragments",
                "type": "uint8"
            },
            {
                "name": "horizFragments",
                "type": "uint8"
            },
            {
                "name": "maxColors",
                "type": "uint8"
            },
            {
                "name": "renderSettings",
                "type": "uint24[]"
            },
            {
                "name": "tokensPerPut",
                "type": "uint128"
            },
            {
                "name": "gameName",
                "type": "string"
            },
            {
                "name": "gameStartTime",
                "type": "uint64"
            },
            {
                "components": [
                    {
                        "name": "walletAddress",
                        "type": "address"
                    },
                    {
                        "name": "captured",
                        "type": "uint16"
                    },
                    {
                        "name": "isLast",
                        "type": "bool"
                    },
                    {
                        "name": "isPrelast",
                        "type": "bool"
                    },
                    {
                        "name": "lastPutTime",
                        "type": "uint64"
                    },
                    {
                        "name": "reward",
                        "type": "uint128"
                    },
                    {
                        "name": "isReceived",
                        "type": "bool"
                    }
                ],
                "name": "players",
                "type": "map(address,tuple)"
            },
            {
                "name": "playerColors",
                "type": "map(address,uint16[])"
            },
            {
                "name": "field",
                "type": "map(uint8,uint8[][])"
            },
            {
                "name": "template",
                "type": "map(uint8,uint8[][])"
            }
        ]
    },
    tvc: "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",
    code: "te6ccgECoAEAFwoAAgaK2zWfAQQkiu1TIOMDIMD/4wIgwP7jAvILnAMCngPE7UTQ10nDAfhmifhpIds80wABjh2BAgDXGCD5AQHTAAGU0/8DAZMC+ELiIPhl+RDyqJXTAAHyeuLTPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwH4I7zyudMfAds88jyOFAQDUu1E0NdJwwH4ZiLQ0wP6QDD4aak4ANwhxwDjAiHXDR/yvCHjAwHbPPI8m5sEAiggghBf0kVpu+MCIIIQbJU0nbvjAh8FAzwgghBqdjh4uuMCIIIQbFP7/LrjAiCCEGyVNJ264wIdGQYE9DD4Qm7jAPhG8nPTH/QEWW8CAdTTP9H4QYjIz44rbNbMzsnbPCBu8tPyIG7yf9DTH/pAMAH4dPh1+En4VccF8uPzAfh8+H34enD4Wm8RgCD0DvKy1wsXtQf4d3H4Wm8RgCD0DvKy1wsXtQf4eHL4Wm8RgCD0DvKy1wsXFJ8RBwP8ghA7msoAqLV/+Htz+FpvEYAg9A7ystcLF7UH+Hlx+Hb4V/hYqLUHcJNTAbmOgOgwcMjL/3BtgED0Q/hPcViAQPQW+ChyWIBA9BbI9ADJ+E7Iz4SA9AD0AM+ByfkAyM+KAEDL/8nQ+HJvAMiL1HYW1lIHdhbGxldDogjbPPhSCn8IBF7bPNs80P4UMIEAgLUPqLUP+HNvAMiNBByZW1haW5pbmdUaWxlczogg2zz4U3BfIFZtfwkDbNs82zzQ/hQwghAR4aMA+Cj4T8jPhYjOcc8LblmLgx7dTHanY4eIyM7Oy3/NyYEAgPsA2zzyAG9tkQFOcG1vAnCTIMEIjoDoMCGAIPhAyFUCbyICyx/0AFl49EOAIPhgpLUHCwFAIYAQiG8CyAFvIgLLH/QAAW8iIaRVIIAg9ENvAjKktQcMAgPOQA0NAgEgDg4CASAPDwIBIBAQAAMAIAIY0CCLOK2zWMcFioriEhMBCtdN0Ns8EwBC10zQiy9KQNcm9AQx0wkxiy9KGNcmINdKwgGS102SMG3iAhbtRNDXScIBjoDjDRWaBJRw7UTQ9AVw+ED4QfhC+EP4RPhF+Eb4R/hI+EltcF8gcS+AQPQPjoDfclYQgED0Do6A33NWEYBA9A6T1ws/kXDidFYSgED0Do6A3xgXFxYDSIlwIIlwX0BtbwJwiHBtXzCAIm+A7VeAQPQO8r3XC//4YnD4Y46OngECiY4BAoieAyYw+Eby4Ez4Qm7jANHbPDDbPPIAmhqRASz4VsAD8uP0+En4XoEBC/QKb6ExjoDeGwMq+En4XoEBC/QLjoCOgOIgbxaOgN8wiIccAqyIcPgocPhJJW8V+FLIz4WIzo0EkEeGjAAAAAAAAAAAAAAAAAAAwM8WVVDIz5HPiIUOy3/Oy39VIMjOygDMzc3JcPsAf29W+En4XiLbPMlZgQEL9BP4fp6GAzYw+Eby4Ez4Qm7jACGT1NHQ3vpA0ds8MNs88gCaHpEAAjAEUCCCEAu6lzO74wIgghAjunbUu+MCIIIQUpSg17vjAiCCEF/SRWm74wKPRCkgBFAgghBTOZQUuuMCIIIQVffFnLrjAiCCEFoqY+m64wIgghBf0kVpuuMCKCciIQFQMNHbPPheIY4cjQRwAAAAAAAAAAAAAAAAN/SRWmDIzvQAyXD7AN7yAJoDOjD4RvLgTPhCbuMAIZPU0dDe+kDTD9HbPDDbPPIAmiORAdJopvtg8tBI+EkicMjL/3BtgED0Q/hPcViAQPQWAXJYgED0Fsj0AMn4TsjPhID0APQAz4HJ+QDIz4oAQMv/ydDHBfLj6fhWwALy4/T4I/hdvvLj/CH4X4EBC/QKlNMf9AWScG3ibwIgbxAkAfCOGfhZcMjLD3BtI5lfIqQDWIAg9EPkbCFvAjHfAds8cJQg+Fm5jjxTAW8RgCD0DvKy1wsPUxNvEYAg9A7ystcLD6C1D4EEALYII28iUjBTErnyslUCyMsPWYAg9ENvAjOktQ/oW/hfyFhvIgLLH/QAWYEBC/RB+H8lAf5wbW8CIacItQ96qQRYIfhZqQT4Wai1D6G1D3CUIPhZuY4ZXfhZqQTIyw8BbyIhpFUggCD0Q28CNKS1B+gwcJcg+FmltQe5jjQh+BH4JfgVUwRvIlJAUxK58rJcgCD0DvKy1wsPVQOgtQ/Iyw9ZgCD0Q28CNSKitQ8ypLUH6DBYJgBEbyJ0ZiO58rJcgCD0DvKy1wsPVQOgtQ/Iyw9ZgCD0Q28CMQOAMPhG8uBM+EJu4wDR2zwhjigj0NMB+kAwMcjPhyDOjQQAAAAAAAAAAAAAAAANX3xZyM8WygDJcPsAkTDi4wDyAJpJlgFUMNHbPIAg+EAhjhyNBHAAAAAAAAAAAAAAAAA0zmUFIMjO9ADJcPsA3vIAmgRQIIIQLBEGhLrjAiCCEC4anjK64wIgghAws3f1uuMCIIIQUpSg17rjAjouLCoDJDD4RvLgTPhCbuMA0ds84wDyAJorlgBG+En4VccF8uP1ghAF9eEAcPsC+FXIz4WIzoBvz0DJgQCA+wADKjD4RvLgTPhCbuMA0wfR2zww2zzyAJotkQAkaKb7YPLQSPhJ+FXHBfLj9fh2A0ow+Eby4Ez4Qm7jACGT1NHQ3vpA0x/0BFlvAgHTf9HbPDDbPPIAmi+RA/74VsAC8uP0+EkjcMjL/3BtgED0Q/hPcViAQPQWAXJYgED0Fsj0AMn4TsjPhID0APQAz4HJ+QDIz4oAQMv/ydDHBfLj6Wim/mCCEGs6j8C+8uPv+Fu68uPwIG8QwTPy4/n4J28QaKb+YKG1f4IQHc1lAKC1f3L7AgHbPDD4U46AMjEwAALfAbBz+HbbPPhVyM+FiM6NBJBHhowAAAAAAAAAAAAAAAAAAMDPFgHIz5AuaeeKAW8rXqDOyz9VgMjOyx9VYMjOyw9VQMjOAW8iAssf9ADLB8zLP83Nzc3JcPsARgR8cCCAIPhA+FMk2zwl+F+BAQv0CpTTH/QFknBt4m8CIG8Qln81VQNsceEnbxFwbY6AjoDjGF8DJI6A318EbDFkODQzAYIh+CNvVDInbxC1D1MibxFYoLUPb1EyI4Ag+GAi+HMm+F4j2zzJWYEBC/QT+H4m+F/II28iAssf9ABZgQEL9EH4f4YBciBvESFvEiJvEIAh+EB49A6U0x/0BZJwbeJvAm8RgCD0DvKy0x/0BW8CbxGAIPQO8rLXCwchbxO6IDUBto5NMCBvESFvEiJvECl49A6U0x/0BZJwbeJvAm8RgCD0DvKy0x/0BW8CbxGAIPQO8rLXCwfAACCOFTAgbxOltQckbxGAIPQO8rLXCw/CAN7ejoCUfzjbMeIhpDI2Af4gbxNTcW8QZiF49A6U0x/0BZJwbeIlbxJmI7nyslyAIPQO8rLTH/QFKG8RZiO58rJVB8jLB1mAIPRDbwLIAW8iAssf9ABZgCD0Q28CyAFvIgLLH/QAWXj0QzcjbyIibxOltQdmI7nyslyAIPQO8rLXCw+ltQ/Iyw9ZgCD0Q28CNwAwNCWltQ82JcABlSR/b1M13iWVJH9vUjXfARxTEoAg9A5voeMAIDJuszkAFtMH0wfTB9MH0W8EAzYw+Eby4Ez4Qm7jACGT1NHQ3vpA0ds8MNs88gCaO5EBFGim+2Dy0EiOgNg8BPL4SfgoxwXy5FZwbds8I/pCbxPXC/+OgI6A4jIhbrMzcJMgwUCOgOMYXwOOMXAgbwL4KMjPhYjOjQSAAAAAAAAAAAAAAAAAABBvldXAzxYBbyICyw/KP8mBAID7ADDh+CjIz4WIznHPC24ByM+QsEQaEs7NyYEAgPsAQ0E/PQEUI46Aktsx4qS1Bz4CXlMibvJ/byJcbxFYbxS0P6NvAts8ydD4SoBQ9BL4alMCgQEL9HRvoeMANDUibrM0aEIBFCCBAQv0g2+h4wBAAQwB0Ns8bwKNARZTMIEBC/R0b6HjAEIBEAHXTNDbPG8CjQAE+F4EUCCCEBjGAc264wIgghAg3yuruuMCIIIQItuVY7rjAiCCECO6dtS64wJpSkdFA7ww+Eby4Ez4Qm7jANHbPCGORiPQ0wH6QDAxyM+HIM5xzwthAcjPko7p21IBbyteoM7LP1WAyM7LH1VgyM7LD1VAyM4BbyICyx/0AMsHzMs/zc3Nzclw+wCRMOLjAPIAmkaWADD4T/hQ+FH4VPhS+FP4Vfha+Fb4XPhdbwsDJjD4RvLgTPhCbuMA0ds8MNs88gCaSJEBXGim+2Dy0Ej4SfhRxwXy4/f4VsAB8uP02zyTdPh23vhJyM+FCM6Ab89AyYBA+wBJALL4V/hYqLUHcG1vAoAh+EAgePSGmCBY0x/0BW8Ck21fIOKTIm6zjihTQcjLBwFvIiGkVSCAIPRDbwI1UyN49HyYIFjTH/QFbwKTbV8g4mwz6F8EbxC6kX/gcAM2MPhG8uBM+EJu4wDTD9I/WW8CAdHbPDDbPPIAmkuRARRopvtg8tBIjoDYTAPW+En4KMcF8uRWbXBfIG8CI28QjoCOFPhKgFD0im+hmtMP0j/RbwIBbwLe4jMibrMycJMgwQWOgOMYMAGOgOH4KMjPhYjOjQSAAAAAAAAAAAAAAAAAABBvldXAzxYBbyICyw/KP8mBAID7AFtnT00BCNs8XwNOADSCEAX14QBw+wL4VcjPhYjOgG/PQMmBAID7AAEUIo6Aktsx4qS1B1ADWlMzbvJ/byIhNCFvENs82zzbPMnQ+EqAUPR2b6Ga0w/SP9FvAgFvAt40I26zM2ZRaAR4Ids8UhAgbxVYoLV/b1Ui+F5Y2zzJWYEBC/QT+H5vAMiNBVDYWxjdWxhdGUgcmV3YXJkIGZvciCDbPFUCZIZ/UgQo2zyLQgaXMgjbPFh52zzbPND+FDBWf1NtBGAhtgt6VHICsfLgRds8qQxfJVUCcCBVBrjBANs8NDQizzXCCI6A3yLPhLozAX9w2zxVb1RvAQxd2zw0yDOBADpxkyHDAI4TIak4AJQiqCGll1MiqDMhqwDiMuhsIQM6+kRdVQLbPDMzIc81wgiOgN8hz4TqMoBAfyBw2zxYV1kBDl8i2zwzyDKBARpZIrYLcCB/VQXBANs8WQRQJc81qwIgjoDfVQKSgDCSgCDiWJUlz4S2Nt4hpTIhjoDfVQOAENs8IGNieloEINs8JY6A3lMDu46AjoDiXwZ5XlxbAyIjjoDkXyfbPDjIN1MDoY6A5F2BXQEIII6A5F0BOiHbPDMgwQqTJ4AwmVN1koBXkoA34uIioM8LBzgwdAIsU1C5JsJ/sfLQRVNQoVMEu46AjoDiMGBfAUQkllNzzwsHOORfKNs8Ocg4UwShllNzzwsHOOSAfyGhJaA1gQEiIJZTc88LBzjkU0ChNSSOgN9hARRfKNs8Ocg4gH81gQEUXybbPDfINoB/MoEBFF8n2zw4yDcwgH+BAjyJcF9Qbwch+F6BAQv0Cm+hMY6Al/hJcF9QbwfibCGOZQIaIfhegQEL9AuOgI6A4oiHAF4g+E2nArUPIqS1D3L4TKi1D6C1D6G1f6i1f/hL+E2nArUPqQSotX/4TFigtQ/4bAEyI9s8ydD4SoBQ9HZvoZrTD9I/0W8CAW8C3mgAEG8iAcjLD8o/AzYw+Eby4Ez4Qm7jACGT1NHQ3tN/0ds8MNs88gCaapEDZGim+2Dy0Ej4SfhVxwXy4/OBAIC1D/hX+FiotQeotQ8h2zwh2zwhgGSpBKdVtX8y2zwwhYJrBJpwbW8CAfhtAacCtX/4TaW1D6kE+GtvAMiL1yZXdhcmRDb2VmZjogjbPPhLcF8g2zzbPND+FDBw+Gz4KMjPhYjOcc8LbojPFMmBAID7AH9vbWwASywRBoSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQARiWIW+IwACzjoDoyTFuAQwh2zwzzxF0BEwkzzWrAiCOgN9YkoAwkoAg4liVJM+EtjXeIaUyIY6A31UCets8IH59enAEINs8JI6A3lMDu46AjoDiXwV5dXJxAyIjjoDkXybbPDfINlMDoY6A5HOBcwEIII6A5HMBGiHbPDMmgDBYoM8LBzZ0ABxvjW+NWSBviJJvjJEw4gIsU0C5JcJ/sfLQQlNAoVMEu46AjoDiMHd2AUQkllNjzwsHN+RfJ9s8OMg3UwShllNjzwsHN+SAfyGhJaA1gQEiIJZTY88LBzfkU0ChNSSOgN94ARRfJ9s8OMg3gH81gQAmIG+IIJulgQD/qAFvi2+IoJEx4gIibwAijoDhcJMjwwCOgOgwbCF8ewESXakMMjRc2zwygQEKcNs8bCGBARRfJds8Nsg1gH8ygQEUXybbPDfINjCAf4EBOCHPNab5IddLIJYjcCLXMTTeMCG7joDfUxLObDGAARpc1xgzI84zXds8NMgzgQA6ASBviJ9vjSBviIEA/6GUb4xvAN+SbwDiWG+Mb4wEWNs8IPhegQEL9AuOgI6A4liAFKkEASBvFVigtX9vVfheAds8yVmBAQv0E/h+g4iHhgM2ifheIIEBC/SDk21fIOMNcJMjbrOOgOMY3F8EjoyEATYhbxOWWGxRdNsx4FM0gQEL9HSTbV8g4w00NDSLBFbbPCD4XoEBC/QLjoCOgOJYeqkEASBvFVigtX9vVfheAds8yVmBAQv0E/h+iYiHhgAkbydeUMjOyw/KAMoAyz/Lf8oAAQyJcF9QbweOAQbQ2zyNAzaJ+F4ggQEL9IOTbV8g4w1wkyNus46A4xjcXwSOjIoBNiFvEpZYbFF02zHgUzSBAQv0dJNtXyDjDTQ0NIsBDiBY10zQ2zyNAQogWNDbPI0AIvpA0w/SANIA0z/Tf9IA0W8HAEOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQBEogggniqfG64wIgggn9DCq64wIgggu4iZm64wIgghALupczuuMCmZiVkAM6MPhG8uBM+EJu4wDTB9Mf9ARZbwIB0ds8MNs88gCakpEAzO1HcIAib4eAI2+CMIAicGRfCvhD+ELIy//LP8+D9ADLf8sPyw/MgBNiyM7LP4ARYsjOVfDIzssPyx9VwMjOywfLB8sHywcBbyICyx/0AMt/zMs/9ABVIMj0APQA9ADNzc3NzcntVAFgaKb7YPLQSPhJ+FHHBfLj9/hWwAHy4/Qh+Ff4WKi1B7ny4/ggbxDACPLj7HCTIMEIkwH8jmtTAW8RgCD0DvKy0x/0BW8CbxDAEPLj7XCTIMEQjkhUcBJvEYAg9A7ystMf9AVvAm8RgCD0DvKy1wsHwgAgjiAwVHASbxGAIPQO8rLTH/QFbwJvEYAg9A7ystcLB/hZu97y4+6ktQfoMKS1B+gwgCH4QMhYbyICyx/0AFl4lAAM9EOAIfhgAzQw+Eby4Ez4Qm7jACGT1NHQ3tN/0ds84wDyAJqXlgAo7UTQ0//TPzH4Q1jIy//LP87J7VQBlvhJ+FXHBfLj9Yhw+Chw+ElVBPhSyM+FiM6NBJBHhowAAAAAAAAAAAAAAAAAAMDPFlVQyM+Rz4iFDst/zst/VSDIzsoAzM3NyXD7AJ4BUDDR2zz4XyGOHI0EcAAAAAAAAAAAAAAAACB/QwqgyM70AMlw+wDe8gCaAVQw0ds8gCH4QCGOHI0EcAAAAAAAAAAAAAAAACB4qnxgyM70AMlw+wDe8gCaAOLtRNDT/9M/0wAx9ATTf9MP0w/U1NHQ+kDTP9TR0PpA1NHQ+kDTD9Mf1NHQ+kDTB9MH0wfTB9Mf9ARZbwIB03/U0z/0BNTR0PQE9AT0BNFw+ED4QfhC+EP4RPhF+Eb4R/hI+EmAGHpjgCJvgO1X+GP4YgAK+Eby4EwCCvSkIPShnp0AFHNvbCAwLjU3LjAAAAAMIPhh7R7Z",
    codeHash: "431bf371da2953eb6c691c907756befb335de66d7369e593453a53ac286af0fd",
};
module.exports = { PBGameContract };