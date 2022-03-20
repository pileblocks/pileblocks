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
    code: "te6ccgECoQEAF0AAAgaK2zWgAQQkiu1TIOMDIMD/4wIgwP7jAvILnQMCnwPE7UTQ10nDAfhmifhpIds80wABjh2BAgDXGCD5AQHTAAGU0/8DAZMC+ELiIPhl+RDyqJXTAAHyeuLTPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwH4I7zyudMfAds88jyalQQDUu1E0NdJwwH4ZiLQ0wP6QDD4aak4ANwhxwDjAiHXDR/yvCHjAwHbPPI8nJwEAiggghBaKmPpu+MCIIIQbFP7/LvjAg0FAzwgghBf0kVpuuMCIIIQanY4eLrjAiCCEGxT+/y64wIMCgYDJjD4RvLgTPhCbuMA0ds8MNs88gCWB2cBLPhWwAPy4/T4SfhdgQEL9ApvoTGOgN4IAyr4SfhdgQEL9AuOgI6A4iBvFo6A3zBRUAkCrIhw+Chw+EklbxX4UsjPhYjOjQSQR4aMAAAAAAAAAAAAAAAAAADAzxZVUMjPkc+IhQ7Lf87Lf1UgyM7KAMzNzclw+wB/b1b4SfhdIts8yVmBAQv0E/h9n08DNjD4RvLgTPhCbuMAIZPU0dDe+kDR2zww2zzyAJYLZwACMAFQMNHbPPhdIY4cjQRwAAAAAAAAAAAAAAAAN/SRWmDIzvQAyXD7AN7yAJYETiCCC7iJmbvjAiCCECDfK6u74wIgghAws3f1u+MCIIIQWipj6bvjAl01GQ4EUCCCEFKUoNe64wIgghBTOZQUuuMCIIIQVffFnLrjAiCCEFoqY+m64wIXFhUPAzow+Eby4Ez4Qm7jACGT1NHQ3vpA0w/R2zww2zzyAJYQZwH8aKb7YPLQSPhJInDIy/9wbYBA9EP4T3FYgED0FgFyWIBA9BbI9ADJ+E7Iz4SA9AD0AM+ByfkAyM+KAEDL/8nQxwXy4+n4VsAC8uP0IfhegQEL9AqU0x/0BZJwbeJvAiBvEI4Z+FlwyMsPcG0jmV8ipANYgCD0Q+RsIW8CMd8BEQL+2zxwlCD4WbmOPFMBbxGAIPQO8rLXCw9TE28RgCD0DvKy1wsPoLUPgQQAtggjbyJSMFMSufKyVQLIyw9ZgCD0Q28CM6S1D+hbbyJwZiO58rKBBADIyw9ZgCD0Q3FmI7nysoEEAMjLD1mAIPRDcmYjufKygQQAyMsPWYAg9ENzZhMSAGojufKygQQAyMsPWYAg9EN0ZiO58rKBBADIyw9ZgCD0Q28C+F7IWG8iAssf9ABZgQEL9EH4fgH+cG1vAiGnCLUPeqkEWCH4WakE+FmotQ+htQ9wlCD4WbmOGV34WakEyMsPAW8iIaRVIIAg9ENvAjSktQfoMHCXIPhZpbUHuY40IfgR+CX4FVMEbyJSQFMSufKyXIAg9A7ystcLD1UDoLUPyMsPWYAg9ENvAjUiorUPMqS1B+gwWBQARG8idGYjufKyXIAg9A7ystcLD1UDoLUPyMsPWYAg9ENvAjEDgDD4RvLgTPhCbuMA0ds8IY4oI9DTAfpAMDHIz4cgzo0EAAAAAAAAAAAAAAAADV98WcjPFsoAyXD7AJEw4uMA8gCWNF8BUDDR2zz4XyGOHI0EcAAAAAAAAAAAAAAAADTOZQUgyM70AMlw+wDe8gCWAyQw+Eby4Ez4Qm7jANHbPOMA8gCWGF8ARvhJ+FXHBfLj9YIQBfXhAHD7AvhVyM+FiM6Ab89AyYEAgPsABFAgghAi25VjuuMCIIIQLBEGhLrjAiCCEC4anjK64wIgghAws3f1uuMCMigcGgMqMPhG8uBM+EJu4wDTB9HbPDDbPPIAlhtnACRopvtg8tBI+En4VccF8uP1+HYDSjD4RvLgTPhCbuMAIZPU0dDe+kDTH/QEWW8CAdN/0ds8MNs88gCWHWcD/vhWwALy4/T4SSNwyMv/cG2AQPRD+E9xWIBA9BYBcliAQPQWyPQAyfhOyM+EgPQA9ADPgcn5AMjPigBAy//J0McF8uPpaKb+YIIQazqPwL7y4+/4W7ry4/AgbxDBM/Lj+fgnbxBopv5gobV/ghAdzWUAoLV/cvsCAds8MPhTjoAgHx4AAt8BrHP4dts8+FXIz4WIzo0EkEeGjAAAAAAAAAAAAAAAAAAAwM8WAcjPkDYRnfoBbypekM7LP1VwyM7LH1VQyM7LD1UwyM4BbyICyx/0AMsHzM3Nzc3JcPsAWAR4cCD4X/hTJNs8JfhegQEL9AqU0x/0BZJwbeJvAiBvEJZ/NVUDbHHhJ28RcG2OgI6A4xhfAySOgN9fBGwxQiYiIQF+Ifgjb1QyJ28QtQ9TIm8RWKC1D29RMiP4fyL4cyb4XSPbPMlZgQEL9BP4fSb4XsgjbyICyx/0AFmBAQv0Qfh+TwFyIG8RIW8SIm8QgCD4QHj0DpTTH/QFknBt4m8CbxGAIPQO8rLTH/QFbwJvEYAg9A7ystcLByFvE7ogIwG2jk0wIG8RIW8SIm8QKXj0DpTTH/QFknBt4m8CbxGAIPQO8rLTH/QFbwJvEYAg9A7ystcLB8AAII4VMCBvE6W1ByRvEYAg9A7ystcLD8IA3t6OgJR/ONsx4iGkMiQB/iBvE1NxbxBmIXj0DpTTH/QFknBt4iVvEmYjufKyXIAg9A7ystMf9AUobxFmI7nyslUHyMsHWYAg9ENvAsgBbyICyx/0AFmAIPRDbwLIAW8iAssf9ABZePRDNyNvIiJvE6W1B2YjufKyXIAg9A7ystcLD6W1D8jLD1mAIPRDbwIlADA0JaW1DzYlwAGVJH9vUzXeJZUkf29SNd8BHFMSgCD0Dm+h4wAgMm6zJwAW0wfTB9MH0wfRbwQDNjD4RvLgTPhCbuMAIZPU0dDe+kDR2zww2zzyAJYpZwEUaKb7YPLQSI6A2CoE8vhJ+CjHBfLkVnBt2zwj+kJvE9cL/46AjoDiMiFuszNwkyDBQI6A4xhfA44xcCBvAvgoyM+FiM6NBIAAAAAAAAAAAAAAAAAAEG+V1cDPFgFvIgLLD8o/yYEAgPsAMOH4KMjPhYjOcc8LbgHIz5CwRBoSzs3JgQCA+wAxLy0rARQjjoCS2zHipLUHLAJeUyJu8n9vIlxvEVhvFLQ/o28C2zzJ0PhKgFD0EvhqUwKBAQv0dG+h4wA0NSJuszRGMAEUIIEBC/SDb6HjAC4BDAHQ2zxvAlYBFlMwgQEL9HRvoeMAMAEQAddM0Ns8bwJWAAT4XQMmMPhG8uBM+EJu4wDR2zww2zzyAJYzZwFcaKb7YPLQSPhJ+FHHBfLj9/hWwAHy4/TbPJN0+Hbe+EnIz4UIzoBvz0DJgED7ADQAsvhX+FiotQdwbW8CgCD4QCB49IaYIFjTH/QFbwKTbV8g4pMibrOOKFNByMsHAW8iIaRVIIAg9ENvAjVTI3j0fJggWNMf9AVvApNtXyDibDPoXwRvELqRf+BwBFAgghALupczuuMCIIIQFT3B77rjAiCCEBjGAc264wIgghAg3yuruuMCWVdHNgM2MPhG8uBM+EJu4wDTD9I/WW8CAdHbPDDbPPIAljdnARRopvtg8tBIjoDYOAPW+En4KMcF8uRWbXBfIG8CI28QjoCOFPhKgFD0im+hmtMP0j/RbwIBbwLe4jMibrMycJMgwQWOgOMYMAGOgOH4KMjPhYjOjQSAAAAAAAAAAAAAAAAAABBvldXAzxYBbyICyw/KP8mBAID7AFtFOzkBCNs8XwM6ADSCEAX14QBw+wL4VcjPhYjOgG/PQMmBAID7AAEUIo6Aktsx4qS1BzwDWlMzbvJ/byIhNCFvENs82zzbPMnQ+EqAUPR2b6Ga0w/SP9FvAgFvAt40I26zM0Q9RgR4Ids8UhAgbxVYoLV/b1Ui+F1Y2zzJWYEBC/QT+H1vAMiNBVDYWxjdWxhdGUgcmV3YXJkIGZvciCDbPFUCQk+IPgQo2zyLQgaXMgjbPFh52zzbPND+FDB1iD9zBGAhtgt6VHICsfLgRds8qQxfJVUCcCBVBrjBANs8NDQizzXCCI6A3yLPhLozAX9w2zxBaEBoAQxd2zw0yDOKADpxkyHDAI4TIak4AJQiqCGll1MiqDMhqwDiMuhsIQI8iXBfUG8HIfhdgQEL9ApvoTGOgJf4SXBfUG8H4mwhmkMCGiH4XYEBC/QLjoCOgOJRUABeIPhNpwK1DyKktQ9y+EyotQ+gtQ+htX+otX/4S/hNpwK1D6kEqLV/+ExYoLUP+GwBMiPbPMnQ+EqAUPR2b6Ga0w/SP9FvAgFvAt5GABBvIgHIyw/KPwM2MPhG8uBM+EJu4wAhk9TR0N7Tf9HbPDDbPPIAlkhnA2Ropvtg8tBI+En4VccF8uPzgQCAtQ/4V/hYqLUHqLUPIds8Ids8IYBkqQSnVbV/Mts8ME5LSQSacG1vAgH4bQGnArV/+E2ltQ+pBPhrbwDIi9cmV3YXJkQ29lZmY6II2zz4S3BfINs82zzQ/hQwcPhs+CjIz4WIznHPC26IzxTJgQCA+wCIaHNKAEssEQaEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEARY2zwg+F2BAQv0C46AjoDiWIAUqQQBIG8VWKC1f29V+F0B2zzJWYEBC/QT+H1MUVBPAzaJ+F0ggQEL9IOTbV8g4w1wkyNus46A4xjcXwSaVU0BNiFvE5ZYbFF02zHgUzSBAQv0dJNtXyDjDTQ0NFQEVts8IPhdgQEL9AuOgI6A4lh6qQQBIG8VWKC1f29V+F0B2zzJWYEBC/QT+H1SUVBPACRvJ15QyM7LD8oAygDLP8t/ygABDIlwX1BvB5oBBtDbPFYDNon4XSCBAQv0g5NtXyDjDXCTI26zjoDjGNxfBJpVUwE2IW8SllhsUXTbMeBTNIEBC/R0k21fIOMNNDQ0VAEOIFjXTNDbPFYBCiBY0Ns8VgAi+kDTD9IA0gDTP9N/0gDRbwcDuDD4RvLgTPhCbuMA0ds8IY5EI9DTAfpAMDHIz4cgznHPC2EByM+SVPcHvgFvKl6Qzss/VXDIzssfVVDIzssPVTDIzgFvIgLLH/QAywfMzc3Nzclw+wCRMOLjAPIAllhfACz4T/hQ+FH4VPhS+FP4Vfha+Fb4XG8KAzow+Eby4Ez4Qm7jANMH0x/0BFlvAgHR2zww2zzyAJZaZwFgaKb7YPLQSPhJ+FHHBfLj9/hWwAHy4/Qh+Ff4WKi1B7ny4/ggbxDACPLj7HCTIMEIWwH8jmtTAW8RgCD0DvKy0x/0BW8CbxDAEPLj7XCTIMEQjkhUcBJvEYAg9A7ystMf9AVvAm8RgCD0DvKy1wsHwgAgjiAwVHASbxGAIPQO8rLTH/QFbwJvEYAg9A7ystcLB/hZu97y4+6ktQfoMKS1B+gwgCD4QMhYbyICyx/0AFl4XAAM9EOAIPhgBEYgggPy07rjAiCCCeKp8brjAiCCCf0MKrrjAiCCC7iJmbrjAmNiYV4DNDD4RvLgTPhCbuMAIZPU0dDe03/R2zzjAPIAlmBfACjtRNDT/9M/MfhDWMjL/8s/zsntVAGW+En4VccF8uP1iHD4KHD4SVUE+FLIz4WIzo0EkEeGjAAAAAAAAAAAAAAAAAAAwM8WVVDIz5HPiIUOy3/Oy39VIMjOygDMzc3JcPsAnwFQMNHbPPheIY4cjQRwAAAAAAAAAAAAAAAAIH9DCqDIzvQAyXD7AN7yAJYBVDDR2zyAIPhAIY4cjQRwAAAAAAAAAAAAAAAAIHiqfGDIzvQAyXD7AN7yAJYE/DD4Qm7jAPhG8nPTH/QEWW8CAdTR+EGIyM+OK2zWzM7J2zwgbvLT8iBu8n/Q0x/6QDAB+HT4dfhJ+FXHBfLj8/h8+Hpw+FpvEYAg9A7ystcLF7UH+Hdx+FpvEYAg9A7ystcLF7UH+Hhy+FpvEYAg9A7ystcLF4IQO5rKAKi1f5WgkmQE7vh7c/habxGAIPQO8rLXCxe1B/h5cfh2+Ff4WKi1B3CTUwG5joDoMHDIy/9wbYBA9EP4T3FYgED0FvgocliAQPQWyPQAyfhOyM+EgPQA9ADPgcn5AMjPigBAy//J0PhybwDIi9R2FtZSB3YWxsZXQ6II2zz4Uts8i4h1ZQRe2zzQ/hQwgQCAtQ+otQ/4c28AyI0EHJlbWFpbmluZ1RpbGVzOiCDbPPhTcF8g2zxziGhmAmjbPND+FDCCEBHhowD4KPhPyM+FiM5xzwtuWYuDHt1Mdqdjh4jIzs7Lf83JgQCA+wDbPPIAc2cAxu1HcIAhb4eAIm+CMIAhcGRfCvhD+ELIy//LP8+D9ADLf8sPyw/MgBJiyM7LP1XwyM5V4MjOyw/LH1WwyM7LB8sHywfLBwFvIgLLH/QAy3/M9ABVIMj0APQA9ADNzc3NzcntVARMJM81qwIgjoDfWJKAMJKAIOJYlSTPhLY13iGlMiGOgN9VAnrbPCBycYNpBCDbPCSOgN5TA7uOgI6A4l8Fgm1ragMiI46A5F8m2zw3yDZTA6GOgORsimwBCCCOgORsARoh2zwzJoAwWKDPCwc2fQIsU0C5JcJ/sfLQQlNAoVMEu46AjoDiMG9uAUQkllNjzwsHN+RfJ9s8OMg3UwShllNjzwsHN+SAfyGhJaA1igEiIJZTY88LBzfkU0ChNSSOgN9wARRfJ9s8OMg3gH81igEUXyXbPDbINYB/MooBFF8m2zw3yDYwgH+KARiWIW+IwACzjoDoyTF0AQwh2zwzzxF9Azr6RF1VAts8MzMhzzXCCI6A3yHPhOoygEB/IHDbPHd2eAEOXyLbPDPIMooBGlkitgtwIH9VBcEA2zx4BFAlzzWrAiCOgN9VApKAMJKAIOJYlSXPhLY23iGlMiGOgN9VA4AQ2zwgh4aDeQQg2zwljoDeUwO7joCOgOJfBoJ+e3oDIiOOgORfJ9s8OMg3UwOhjoDkfIp8AQggjoDkfAE6Ids8MyDBCpMngDCZU3WSgFeSgDfi4iKgzwsHODB9ABxvjW+NWSBviJJvjJEw4gIsU1C5JsJ/sfLQRVNQoVMEu46AjoDiMIB/AUQkllNzzwsHOORfKNs8Ocg4UwShllNzzwsHOOSAfyGhJaA1igEiIJZTc88LBzjkU0ChNSSOgN+BARRfKNs8Ocg4gH81igAmIG+IIJulgQD/qAFvi2+IoJEx4gIibwAijoDhcJMjwwCOgOgwbCGFhAESXakMMjRc2zwyigEKcNs8bCGKARRfJts8N8g2gH8yigEUXyfbPDjINzCAf4oBOCHPNab5IddLIJYjcCLXMTTeMCG7joDfUxLObDGJARpc1xgzI84zXds8NMgzigA6ASBviJ9vjSBviIEA/6GUb4xvAN+SbwDiWG+Mb4wBRnBtbwJwkyDBCI6A6DAh+F/IVQJvIgLLH/QAWXj0Q/h/pLUHjAFAIYAQiG8CyAFvIgLLH/QAAW8iIaRVIIAg9ENvAjKktQeNAgPOQI6OAgEgj48CASCQkAIBIJGRAAMAIAIY0CCLOK2zWMcFiorik5QBCtdN0Ns8lABC10zQiy9KQNcm9AQx0wkxiy9KGNcmINdKwgGS102SMG3iAhbtRNDXScIBjoDjDZeWAN7tRNDT/9M/0wAx9ATTf9MP0w/U1NHQ+kDTP9TR0PpA1NHQ+kDTD9Mf1NHQ+kDTB9MH0wfTB9Mf9ARZbwIB03/U9ATU0dD0BPQE9ATRcPhA+EH4QvhD+ET4RfhG+Ef4SPhJgBd6Y4Ahb4DtV/hj+GIElHDtRND0BXD4QPhB+EL4Q/hE+EX4RvhH+Ej4SW1wXyBxL4BA9A+OgN9yVhCAQPQOjoDfc1YRgED0DpPXCz+RcOJ0VhKAQPQOjoDfm5mZmANGiXAgiXBfQG1vAnCIbV8wgCFvgO1XgED0DvK91wv/+GJw+GOamp8BAomaAEOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAQKInwAK+Eby4EwCCvSkIPShn54AFHNvbCAwLjU3LjAAAAAMIPhh7R7Z",
    codeHash: "546119ba1967db9f08eb8e5137c1a4eadd6bb7fc55232a76a9f87fdbf1db1e11",
};
module.exports = { PBGameContract };