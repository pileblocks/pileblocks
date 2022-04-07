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
                "name": "onAcceptTokensTransfer",
                "inputs": [
                    {
                        "name": "tokenRoot",
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
                        "name": "senderWallet",
                        "type": "address"
                    },
                    {
                        "name": "remainingGasTo",
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
                "name": "packTiles",
                "inputs": [
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
                "outputs": [
                    {
                        "name": "value0",
                        "type": "cell"
                    }
                ]
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
    tvc: "te6ccgECqgEAGKAAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAgaK2zWpBAQkiu1TIOMDIMD/4wIgwP7jAvILpgYFqAPE7UTQ10nDAfhmifhpIds80wABjh2BAgDXGCD5AQHTAAGU0/8DAZMC+ELiIPhl+RDyqJXTAAHyeuLTPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwH4I7zyudMfAds88jyWJAcDUu1E0NdJwwH4ZiLQ0wP6QDD4aak4ANwhxwDjAiHXDR/yvCHjAwHbPPI8paUHAiggghBf0kVpu+MCIIIQcNifybvjAjEIBFAgghBqdjh4uuMCIIIQbFP7/LrjAiCCEGyVNJ264wIgghBw2J/JuuMCLykWCQNaMPhG8uBM+EJu4wAhk9TR0N76QNN/1NHQ+kDU0dD6QNTR0PpA1NHbPDDbPPIApAqYBOD4SfhSxwXy4/34VsAC8uP0aKb+YIIQazqPwL7y4+9VA/hbuvLj8HBtbwIh0McAnCHQ0x/0BFlvAgHRMd8gbxDBM/Lj+fgnbxBopv5gobV/ghAdzWUAoLV/cvsCUwTbPDD4U46A328QtX/4I/hWVQWIDg0MCwBIjQRwAAAAAAAAAAAAAAAAEU/8OGDIzszOywfLP8t/yXD7AF8EACxvbkFjY2VwdFRva2Vuc1RyYW5zZmVyAbBz+HbbPPhVyM+FiM6NBJBHhowAAAAAAAAAAAAAAAAAAMDPFgHIz5AuaeeKAW8rXqDOyz9VgMjOyx9VYMjOyw9VQMjOAW8iAssf9ADLB8zLP83Nzc3JcPsATQR8cCCAIPhA+FMk2zwl+F+BAQv0CpTTH/QFknBt4m8CIG8Qln81VQNsceEnbxFwbY6AjoDjGF8DJI6A318EbDFsFBAPAYIh+CNvVDInbxC1D1MibxFYoLUPb1EyI4Ag+GAi+HMm+F4j2zzJWYEBC/QT+H4m+F/II28iAssf9ABZgQEL9EH4f44BciBvESFvEiJvEIAh+EB49A6U0x/0BZJwbeJvAm8RgCD0DvKy0x/0BW8CbxGAIPQO8rLXCwchbxO6IBEBto5NMCBvESFvEiJvECl49A6U0x/0BZJwbeJvAm8RgCD0DvKy0x/0BW8CbxGAIPQO8rLXCwfAACCOFTAgbxOltQckbxGAIPQO8rLXCw/CAN7ejoCUfzjbMeIhpDISAf4gbxNTcW8QZiF49A6U0x/0BZJwbeIlbxJmI7nyslyAIPQO8rLTH/QFKG8RZiO58rJVB8jLB1mAIPRDbwLIAW8iAssf9ABZgCD0Q28CyAFvIgLLH/QAWXj0QzcjbyIibxOltQdmI7nyslyAIPQO8rLXCw+ltQ/Iyw9ZgCD0Q28CEwAwNCWltQ82JcABlSR/b1M13iWVJH9vUjXfARxTEoAg9A5voeMAIDJusxUAFtMH0wfTB9MH0W8EBPQw+EJu4wD4RvJz0x/0BFlvAgHU0z/R+EGIyM+OK2zWzM7J2zwgbvLT8iBu8n/Q0x/6QDAB+HT4dfhJ+FXHBfLj8wH4fPh9+Hpw+FpvEYAg9A7ystcLF7UH+Hdx+FpvEYAg9A7ystcLF7UH+Hhy+FpvEYAg9A7ystcLFySpIRcD/IIQO5rKAKi1f/h7c/habxGAIPQO8rLXCxe1B/h5cfh2+Ff4WKi1B3CTUwG5joDoMHDIy/9wbYBA9EP4T3FYgED0FvgocliAQPQWyPQAyfhOyM+EgPQA9ADPgcn5AMjPigBAy//J0PhybwDIi9R2FtZSB3YWxsZXQ6II2zz4UhqHGARe2zzbPND+FDCBAIC1D6i1D/hzbwDIjQQcmVtYWluaW5nVGlsZXM6IINs8+FNwXyBedYcZA2zbPNs80P4UMIIQEeGjAPgo+E/Iz4WIznHPC25Zi4Me3Ux2p2OHiMjOzst/zcmBAID7ANs88gB3dZgBTnBtbwJwkyDBCI6A6DAhgCD4QMhVAm8iAssf9ABZePRDgCD4YKS1BxsBQCGAEIhvAsgBbyICyx/0AAFvIiGkVSCAIPRDbwIypLUHHAIDzkAdHQIBIB4eAgEgHx8CASAgIAADACACGNAgizits1jHBYqK4iIjAQrXTdDbPCMAQtdM0IsvSkDXJvQEMdMJMYsvShjXJiDXSsIBktdNkjBt4gIW7UTQ10nCAY6A4w0lpASUcO1E0PQFcPhA+EH4QvhD+ET4RfhG+Ef4SPhJbXBfIHEvgED0D46A33JWEIBA9A6OgN9zVhGAQPQOk9cLP5Fw4nRWEoBA9A6OgN8oJycmA0iJcCCJcF9AbW8CcIhwbV8wgCJvgO1XgED0DvK91wv/+GJw+GOWlqgBAomWAQKIqAMmMPhG8uBM+EJu4wDR2zww2zzyAKQqmAEs+FbAA/Lj9PhJ+F6BAQv0Cm+hMY6A3isDKvhJ+F6BAQv0C46AjoDiIG8WjoDfMJCPLAT+iHD4KHD4SSVvFfhSyM+FiM6NBJBHhowAAAAAAAAAAAAAAAAAAMDPFlVQyM+Rz4iFDst/zst/VSDIzsoAzM3NyXD7AH9vVvhJ+F4i2zzJWYEBC/QT+H4gbxX4I/hW+EmIjQRwAAAAAAAAAAAAAAAAEU/8OGDIzszOywfLP8t/yaiOLi0ABnD7AAAWY2xhaW1SZXdhcmQDNjD4RvLgTPhCbuMAIZPU0dDe+kDR2zww2zzyAKQwmAACMAROIIILuImZu+MCIIIQItuVY7vjAiCCEFKUoNe74wIgghBf0kVpu+MCnE49MgRQIIIQUzmUFLrjAiCCEFX3xZy64wIgghBaKmPpuuMCIIIQX9JFabrjAjw7NDMBUDDR2zz4XiGOHI0EcAAAAAAAAAAAAAAAADf0kVpgyM70AMlw+wDe8gCkAzow+Eby4Ez4Qm7jACGT1NHQ3vpA0w/R2zww2zzyAKQ1mAHSaKb7YPLQSPhJInDIy/9wbYBA9EP4T3FYgED0FgFyWIBA9BbI9ADJ+E7Iz4SA9AD0AM+ByfkAyM+KAEDL/8nQxwXy4+n4VsAC8uP0+CP4Xb7y4/wh+F+BAQv0CpTTH/QFknBt4m8CIG8QNgL8jhn4WXDIyw9wbSOZXyKkA1iAIPRD5GwhbwIx3yGBBAC6lIEAgDLeIds8cJQg+Fm5jjxTAW8RgCD0DvKy1wsPUxNvEYAg9A7ystcLD6C1D4EEALYII28iUjBTErnyslUCyMsPWYAg9ENvAjOktQ/oWyL4X8hVAm8iAssf9ABZOTcBYIEBC/RB+H/4I/hWVQKIjQRwAAAAAAAAAAAAAAAAEU/8OGDIzszOywfLP8t/yXD7ADgAGG9uQ2xhaW1UaWxlcwH+cG1vAiGnCLUPeqkEWCH4WakE+FmotQ+htQ9wlCD4WbmOGV34WakEyMsPAW8iIaRVIIAg9ENvAjSktQfoMHCXIPhZpbUHuY40IfgR+CX4FVMEbyJSQFMSufKyXIAg9A7ystcLD1UDoLUPyMsPWYAg9ENvAjUiorUPMqS1B+gwWDoARG8idGYjufKyXIAg9A7ystcLD1UDoLUPyMsPWYAg9ENvAjEDgDD4RvLgTPhCbuMA0ds8IY4oI9DTAfpAMDHIz4cgzo0EAAAAAAAAAAAAAAAADV98WcjPFsoAyXD7AJEw4uMA8gCkUaABVDDR2zyAIPhAIY4cjQRwAAAAAAAAAAAAAAAANM5lBSDIzvQAyXD7AN7yAKQEUCCCECO6dtS64wIgghAsEQaEuuMCIIIQMLN39brjAiCCEFKUoNe64wJMQkA+AyQw+Eby4Ez4Qm7jANHbPOMA8gCkP6AARvhJ+FXHBfLj9YIQBfXhAHD7AvhVyM+FiM6Ab89AyYEAgPsAAyow+Eby4Ez4Qm7jANMH0ds8MNs88gCkQZgAJGim+2Dy0Ej4SfhVxwXy4/X4dgM2MPhG8uBM+EJu4wAhk9TR0N76QNHbPDDbPPIApEOYARRopvtg8tBIjoDYRATy+En4KMcF8uRWcG3bPCP6Qm8T1wv/joCOgOIyIW6zM3CTIMFAjoDjGF8DjjFwIG8C+CjIz4WIzo0EgAAAAAAAAAAAAAAAAAAQb5XVwM8WAW8iAssPyj/JgQCA+wAw4fgoyM+FiM5xzwtuAcjPkLBEGhLOzcmBAID7AEtJR0UBFCOOgJLbMeKktQdGAl5TIm7yf28iXG8RWG8UtD+jbwLbPMnQ+EqAUPQS+GpTAoEBC/R0b6HjADQ1Im6zNHBKARQggQEL9INvoeMASAEMAdDbPG8ClQEWUzCBAQv0dG+h4wBKARAB10zQ2zxvApUABPheA7ww+Eby4Ez4Qm7jANHbPCGORiPQ0wH6QDAxyM+HIM5xzwthAcjPko7p21IBbyteoM7LP1WAyM7LH1VgyM7LD1VAyM4BbyICyx/0AMsHzMs/zc3Nzclw+wCRMOLjAPIApE2gADD4T/hQ+FH4VPhS+FP4Vfha+Fb4XPhdbwsEUCCCEAu6lzO64wIgghAYxgHNuuMCIIIQIN8rq7rjAiCCECLblWO64wKXcVJPAyYw+Eby4Ez4Qm7jANHbPDDbPPIApFCYAVxopvtg8tBI+En4UccF8uP3+FbAAfLj9Ns8k3T4dt74ScjPhQjOgG/PQMmAQPsAUQCy+Ff4WKi1B3BtbwKAIfhAIHj0hpggWNMf9AVvApNtXyDikyJus44oU0HIywcBbyIhpFUggCD0Q28CNVMjePR8mCBY0x/0BW8Ck21fIOJsM+hfBG8QupF/4HADNjD4RvLgTPhCbuMA0w/SP1lvAgHR2zww2zzyAKRTmAEUaKb7YPLQSI6A2FQD1vhJ+CjHBfLkVm1wXyBvAiNvEI6AjhT4SoBQ9IpvoZrTD9I/0W8CAW8C3uIzIm6zMnCTIMEFjoDjGDABjoDh+CjIz4WIzo0EgAAAAAAAAAAAAAAAAAAQb5XVwM8WAW8iAssPyj/JgQCA+wBbb1dVAUT4I40EcAAAAAAAAAAAAAAAAAv4VtUgyM7LP8lw+wDbPF8DVgA0ghAF9eEAcPsC+FXIz4WIzoBvz0DJgQCA+wABFCKOgJLbMeKktQdYA1pTM27yf28iITQhbxDbPNs82zzJ0PhKgFD0dm+hmtMP0j/RbwIBbwLeNCNuszNuWXAEeCHbPFIQIG8VWKC1f29VIvheWNs8yVmBAQv0E/h+bwDIjQVQ2FsY3VsYXRlIHJld2FyZCBmb3Igg2zxVAmyOh1oEKNs8i0IGlzII2zxYeds82zzQ/hQwXodbdQRgIbYLelRyArHy4EXbPKkMXyVVAnAgVQa4wQDbPDQ0Is81wgiOgN8iz4S6MwF/cNs8XXdcdwEMXds8NMgziQA6cZMhwwCOEyGpOACUIqghpZdTIqgzIasA4jLobCEDOvpEXVUC2zwzMyHPNcIIjoDfIc+E6jKAQH8gcNs8YF9hAQ5fIts8M8gyiQEaWSK2C3Agf1UFwQDbPGEEUCXPNasCII6A31UCkoAwkoAg4liVJc+EtjbeIaUyIY6A31UDgBDbPCBraoJiBCDbPCWOgN5TA7uOgI6A4l8GgWZkYwMiI46A5F8n2zw4yDdTA6GOgORliWUBCCCOgORlAToh2zwzIMEKkyeAMJlTdZKAV5KAN+LiIqDPCwc4MHwCLFNQuSbCf7Hy0EVTUKFTBLuOgI6A4jBoZwFEJJZTc88LBzjkXyjbPDnIOFMEoZZTc88LBzjkgH8hoSWgNYkBIiCWU3PPCwc45FNAoTUkjoDfaQEUXyjbPDnIOIB/NYkBFF8m2zw3yDaAfzKJARRfJ9s8OMg3MIB/iQKmiXBfUG8HIfhegQEL9ApvoTGOgI48IXDIy/9wbYBA9EP4T3FYgED0FgFyWIBA9BbI9ADJ+E7Iz4SA9AD0AM+ByfkAyM+KAEDL/8nQcF9Qbwcx4jGWbQIcIfhegQEL9AuOgI6A4jGQjwBeIPhNpwK1DyKktQ9y+EyotQ+gtQ+htX+otX/4S/hNpwK1D6kEqLV/+ExYoLUP+GwBMiPbPMnQ+EqAUPR2b6Ga0w/SP9FvAgFvAt5wABBvIgHIyw/KPwM2MPhG8uBM+EJu4wAhk9TR0N7Tf9HbPDDbPPIApHKYA2Ropvtg8tBI+En4VccF8uPzgQCAtQ/4V/hYqLUHqLUPIds8Ids8IYBkqQSnVbV/Mts8MI2KcwSacG1vAgH4bQGnArV/+E2ltQ+pBPhrbwDIi9cmV3YXJkQ29lZmY6II2zz4S3BfINs82zzQ/hQwcPhs+CjIz4WIznHPC26IzxTJgQCA+wCHd3V0AEssEQaEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAEYliFviMAAs46A6MkxdgEMIds8M88RfARMJM81qwIgjoDfWJKAMJKAIOJYlSTPhLY13iGlMiGOgN9VAnrbPCCGhYJ4BCDbPCSOgN5TA7uOgI6A4l8FgX16eQMiI46A5F8m2zw3yDZTA6GOgOR7iXsBCCCOgOR7ARoh2zwzJoAwWKDPCwc2fAAcb41vjVkgb4iSb4yRMOICLFNAuSXCf7Hy0EJTQKFTBLuOgI6A4jB/fgFEJJZTY88LBzfkXyfbPDjIN1MEoZZTY88LBzfkgH8hoSWgNYkBIiCWU2PPCwc35FNAoTUkjoDfgAEUXyfbPDjIN4B/NYkAJiBviCCbpYEA/6gBb4tviKCRMeICIm8AIo6A4XCTI8MAjoDoMGwhhIMBEl2pDDI0XNs8MokBCnDbPGwhiQEUXyXbPDbINYB/MokBFF8m2zw3yDYwgH+JATghzzWm+SHXSyCWI3Ai1zE03jAhu46A31MSzmwxiAEaXNcYMyPOM13bPDTIM4kAOgEgb4ifb40gb4iBAP+hlG+MbwDfkm8A4lhvjG+MBFjbPCD4XoEBC/QLjoCOgOJYgBSpBAEgbxVYoLV/b1X4XgHbPMlZgQEL9BP4fouQj44DNon4XiCBAQv0g5NtXyDjDXCTI26zjoDjGNxfBJaUjAE2IW8TllhsUXTbMeBTNIEBC/R0k21fIOMNNDQ0kwRW2zwg+F6BAQv0C46AjoDiWHqpBAEgbxVYoLV/b1X4XgHbPMlZgQEL9BP4fpGQj44AJG8nXlDIzssPygDKAMs/y3/KAAEMiXBfUG8HlgEG0Ns8lQM2ifheIIEBC/SDk21fIOMNcJMjbrOOgOMY3F8ElpSSATYhbxKWWGxRdNsx4FM0gQEL9HSTbV8g4w00NDSTAQ4gWNdM0Ns8lQEKIFjQ2zyVACL6QNMP0gDSANM/03/SANFvBwBDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAM6MPhG8uBM+EJu4wDTB9Mf9ARZbwIB0ds8MNs88gCkmZgAzO1HcIAib4eAI2+CMIAicGRfCvhD+ELIy//LP8+D9ADLf8sPyw/MgBNiyM7LP4ARYsjOVfDIzssPyx9VwMjOywfLB8sHywcBbyICyx/0AMt/zMs/9ABVIMj0APQA9ADNzc3NzcntVAFgaKb7YPLQSPhJ+FHHBfLj9/hWwAHy4/Qh+Ff4WKi1B7ny4/ggbxDACPLj7HCTIMEImgH8jmtTAW8RgCD0DvKy0x/0BW8CbxDAEPLj7XCTIMEQjkhUcBJvEYAg9A7ystMf9AVvAm8RgCD0DvKy1wsHwgAgjiAwVHASbxGAIPQO8rLTH/QFbwJvEYAg9A7ystcLB/hZu97y4+6ktQfoMKS1B+gwgCH4QMhYbyICyx/0AFl4mwAM9EOAIfhgBEggggniqfG64wIgggn9DCq64wIggguNpM664wIgggu4iZm64wKjop+dAzQw+Eby4Ez4Qm7jACGT1NHQ3tN/0ds84wDyAKSeoAGW+En4VccF8uP1iHD4KHD4SVUE+FLIz4WIzo0EkEeGjAAAAAAAAAAAAAAAAAAAwM8WVVDIz5HPiIUOy3/Oy39VIMjOygDMzc3JcPsAqAKEMPhG8uBM0x/0BFlvAgHR2zwhjicj0NMB+kAwMcjPhyDOjQQAAAAAAAAAAAAAAAAIONpM6M8WzMlw+wCRMOLjAPIAoaAAKO1E0NP/0z8x+ENYyMv/yz/Oye1UABTIAW8iAssf9ADJAVAw0ds8+F8hjhyNBHAAAAAAAAAAAAAAAAAgf0MKoMjO9ADJcPsA3vIApAFUMNHbPIAh+EAhjhyNBHAAAAAAAAAAAAAAAAAgeKp8YMjO9ADJcPsA3vIApADi7UTQ0//TP9MAMfQE03/TD9MP1NTR0PpA0z/U0dD6QNTR0PpA0w/TH9TR0PpA0wfTB9MH0wfTH/QEWW8CAdN/1NM/9ATU0dD0BPQE9ATRcPhA+EH4QvhD+ET4RfhG+Ef4SPhJgBh6Y4Aib4DtV/hj+GIACvhG8uBMAgr0pCD0oainABRzb2wgMC41Ny4wAAAADCD4Ye0e2Q==",
    code: "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",
    codeHash: "2c4984059bf174ff45d44dd19a1811b75e1a389ed335d09de1cbcae39002cf04",
};
module.exports = { PBGameContract };