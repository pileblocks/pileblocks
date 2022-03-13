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
                            }
                        ],
                        "name": "value0",
                        "type": "tuple"
                    }
                ]
            },
            {
                "name": "generateFakePlayers",
                "inputs": [
                    {
                        "name": "playerNum",
                        "type": "uint16"
                    }
                ],
                "outputs": []
            },
            {
                "name": "cGame",
                "inputs": [
                    {
                        "name": "totalReward",
                        "type": "uint128"
                    }
                ],
                "outputs": []
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
    tvc: "te6ccgEClQEAFWkAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAgaK2zWUBAQkiu1TIOMDIMD/4wIgwP7jAvILkQYFkwPE7UTQ10nDAfhmifhpIds80wABjh2BAgDXGCD5AQHTAAGU0/8DAZMC+ELiIPhl+RDyqJXTAAHyeuLTPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwH4I7zyudMfAds88jxGLAcDUu1E0NdJwwH4ZiLQ0wP6QDD4aak4ANwhxwDjAiHXDR/yvCHjAwHbPPI8kJAHAiggghBhsqJsu+MCIIIQeaADorvjAg4IAiggghBqdjh4uuMCIIIQeaADorrjAgwJAyow+Eby4Ez4Qm7jANMP0ds8MNs88gCPCokBJPgA+CX4FXBwk1MSuY6A4xjcWwsBoPgQgGT4EYBk+BH4UyG5lDD4U3CW+FMhobUP4vhzWHDIz4ZAygfL/8nQIFhwIFUEbwX4XAHbPFmBAQv0Qfh8+CX4FfhTlV8DdNsx4SGktQcyOwM2MPhG8uBM+EJu4wAhk9TR0N76QNHbPDDbPPIAjw2JAAIwBFAgghAYxgHNu+MCIIIQLhqeMrvjAiCCEExIz1a74wIgghBhsqJsu+MCbjMaDwRQIIIQUzmUFLrjAiCCEFX3xZy64wIgghBaKmPpuuMCIIIQYbKibLrjAhkXERADtjD4RvLgTPhCbuMA0ds8IY5DI9DTAfpAMDHIz4cgznHPC2EByM+ThsqJsgFvKV6Azss/VWDIzssfVUDIzssPVSDIzgFvIgLLH/QAywfNzc3NyXD7AJEw4uMA8gCPOBgDOjD4RvLgTPhCbuMAIZPU0dDe+kDTD9HbPDDbPPIAjxKJAcJopvtg8tBI+EkicMjL/3BtgED0Q/hPcViAQPQWAXJYgED0Fsj0AMn4TsjPhID0APQAz4HJ+QDIz4oAQMv/ydDHBfLj6fhWwALy4/Qh+F2BAQv0CpTTH/QFknBt4m8CIG8QEwL8ji74WXDIyw9wbSOZXyKkA1iAIPRD5GwhbwIxbyJwZiO58rKBA+jIyw9ZgCD0Q28C3wHbPHCUIPhZuY48UwFvEYAg9A7ystcLD1MTbxGAIPQO8rLXCw+gtQ+BBAC2CCNvIlIwUxK58rJVAsjLD1mAIPRDbwIzpLUP6Fv4XchYFRQAHm8iAssf9ABZgQEL9EH4fQH+cG1vAiGnCLUPeqkEWCH4WakE+FmotQ+htQ9wlCD4WbmOGV34WakEyMsPAW8iIaRVIIAg9ENvAjSktQfoMHCXIPhZpbUHuY40IfgR+CX4FVMEbyJSQFMSufKyXIAg9A7ystcLD1UDoLUPyMsPWYAg9ENvAjUiorUPMqS1B+gwWBYARG8idGYjufKyXIAg9A7ystcLD1UDoLUPyMsPWYAg9ENvAjEDgDD4RvLgTPhCbuMA0ds8IY4oI9DTAfpAMDHIz4cgzo0EAAAAAAAAAAAAAAAADV98WcjPFsoAyXD7AJEw4uMA8gCPUhgAKO1E0NP/0z8x+ENYyMv/yz/Oye1UAVAw0ds8+F4hjhyNBHAAAAAAAAAAAAAAAAA0zmUFIMjO9ADJcPsA3vIAjwRQIIIQMLN39brjAiCCEDxwhue64wIgghBLM48SuuMCIIIQTEjPVrrjAjEeHRsDNjD4RvLgTPhCbuMAIZPU0dDe03/R2zww2zzyAI8ciQRo+ACBAIC1D/hX+FiotQeotQ9vAMiL1fdG90YWxUaWxlczogjbPCJwXyDbPNs80P4UMNs8MIV1c3EBUDDR2zz4XCGOHI0EcAAAAAAAAAAAAAAAADLM48SgyM70AMlw+wDe8gCPBPww+EJu4wD4RvJz0x/0BFlvAgHR+EGIyM+OK2zWzM7J2zwgbvLT8iBu8n/Q0x/6QDAB+HT4dfhJ+FXHBfLj8/h6cPhabxGAIPQO8rLXCxe1B/h3cfhabxGAIPQO8rLXCxe1B/h4cvhabxGAIPQO8rLXCxeCEDuaygCotX/4e3MslCkfBOj4Wm8RgCD0DvKy1wsXtQf4eXH4dvhX+FiotQdwk1MBuY6A6DBwyMv/cG2AQPRD+E9xWIBA9Bb4KHJYgED0Fsj0AMn4TsjPhID0APQAz4HJ+QDIz4oAQMv/ydD4cm8AyIvUdhbWUgd2FsbGV0OiCNs8+FLbPCKFXSAEXts80P4UMIEAgLUPqLUP+HNvAMiNBByZW1haW5pbmdUaWxlczogg2zz4U3BfINs8c4V1IQJo2zzQ/hQwghAR4aMA+Cj4T8jPhYjOcc8LblmLgx7dTHanY4eIyM7Oy3/NyYEAgPsA2zzyAHOJAUZwbW8CcJMgwQiOgOgwIfheyFUCbyICyx/0AFl49EP4fqS1ByMBQCGAEIhvAsgBbyICyx/0AAFvIiGkVSCAIPRDbwIypLUHJAIDzkAlJQIBICYmAgEgJycCASAoKAADACACGNAgizits1jHBYqK4iorAQrXTdDbPCsAQtdM0IsvSkDXJvQEMdMJMYsvShjXJiDXSsIBktdNkjBt4gIW7UTQ10nCAY6A4w0tjwSUcO1E0PQFcPhA+EH4QvhD+ET4RfhG+Ef4SPhJbXBfIHEvgED0D46A33JWEIBA9A6OgN9zVhGAQPQOk9cLP5Fw4nRWEoBA9A6OgN8wLy8uAkSJcCCJcF9AbW8CcG1fMIAgb4DtV4BA9A7yvdcL//hicPhjRkYBAolGAQKIkwMqMPhG8uBM+EJu4wDTB9HbPDDbPPIAjzKJACRopvtg8tBI+En4VccF8uP1+HYEUCCCECDfK6u64wIgghAi25VjuuMCIIIQLBEGhLrjAiCCEC4anjK64wJTUEc0A0ow+Eby4Ez4Qm7jACGT1NHQ3vpA0x/0BFlvAgHTf9HbPDDbPPIAjzWJA/74VsAC8uP0+EkjcMjL/3BtgED0Q/hPcViAQPQWAXJYgED0Fsj0AMn4TsjPhID0APQAz4HJ+QDIz4oAQMv/ydDHBfLj6Wim/mCCEGs6j8C+8uPv+Fu68uPwIG8QwTPy4/n4J28QaKb+YKG1f4IQHc1lAKC1f3L7AiHbPDAB2zwwQjk2AQr4U46A3zcBqnP4dts8+FXIz4WIzo0EkEeGjAAAAAAAAAAAAAAAAAAAwM8WAcjPkLQnBCIBbylegM7LP1VgyM7LH1VAyM7LD1UgyM4BbyICyx/0AMsHzc3Nzclw+wA4ACj4T/hQ+FH4VPhS+FP4Vfha+FZvCQR4cCD4XvhTJNs8JfhdgQEL9AqU0x/0BZJwbeJvAiBvEJZ/NVUDbHHhJ28RcG2OgI6A4xhfAySOgN9fBGwxQkA8OgF8Ifgjb1QyJ28QtQ9TIm8RWKC1D29RMiP4fiL4cyb4XCPbPFmBAQv0Qfh8JvhdyCNvIgLLH/QAWYEBC/RB+H07ABxvJV4wyM7LD8oAygDLPwFuIG8RIW8SIm8Q+F949A6U0x/0BZJwbeJvAm8RgCD0DvKy0x/0BW8CbxGAIPQO8rLXCwchbxO6ID0Bto5NMCBvESFvEiJvECl49A6U0x/0BZJwbeJvAm8RgCD0DvKy0x/0BW8CbxGAIPQO8rLXCwfAACCOFTAgbxOltQckbxGAIPQO8rLXCw/CAN7ejoCUfzjbMeIhpDI+Af4gbxNTcW8QZiF49A6U0x/0BZJwbeIlbxJmI7nyslyAIPQO8rLTH/QFKG8RZiO58rJVB8jLB1mAIPRDbwLIAW8iAssf9ABZgCD0Q28CyAFvIgLLH/QAWXj0QzcjbyIibxOltQdmI7nyslyAIPQO8rLXCw+ltQ/Iyw9ZgCD0Q28CPwAwNCWltQ82JcABlSR/b1M13iWVJH9vUjXfARxTEoAg9A5voeMAIDJus0EAFtMH0wfTB9MH0W8EAjyJcF8wbwUh+FyBAQv0Cm+hMY6Al/hJcF8wbwXibCFGQwIUIfhcgQEL9ArjD0VEAQyJcF8wbwVGABr6QNMP0gDSANM/0W8FAEOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAzYw+Eby4Ez4Qm7jACGT1NHQ3vpA0ds8MNs88gCPSIkBFGim+2Dy0EiOgNhJBPL4SfgoxwXy5FZwbds8I/pCbxPXC/+OgI6A4jIhbrMzcJMgwUCOgOMYXwOOMXAgbwL4KMjPhYjOjQSAAAAAAAAAAAAAAAAAABBvldXAzxYBbyICyw/KP8mBAID7ADDh+CjIz4WIznHPC24ByM+QsEQaEs7NyYEAgPsAT01MSgEUI46Aktsx4qS1B0sCXlMibvJ/byJcbxFYbxS0P6NvAts8ydD4SoBQ9BL4alMCgQEL9HRvoeMANDUibrM0bU4BFCCBAQv0gm+h4wBOARZTMIEBC/R0b6HjAE4AIAH6QNMP0gDSANM/0W8FbwIABPhcAyYw+Eby4Ez4Qm7jANHbPDDbPPIAj1GJAVxopvtg8tBI+En4UccF8uP3+FbAAfLj9Ns8k3T4dt74ScjPhQjOgG/PQMmAQPsAUgCu+Ff4WKi1B3BtbwL4XyB49IaYIFjTH/QFbwKTbV8g4pMibrOOKFNByMsHAW8iIaRVIIAg9ENvAjVTI3j0fJggWNMf9AVvApNtXyDibDPoXwRvELqRf+BwAzYw+Eby4Ez4Qm7jANMP0j9ZbwIB0ds8MNs88gCPVIkBFGim+2Dy0EiOgNhVAtj4SfgoxwXy5FZtcF8gbwIjbxCOgI4U+EqAUPSKb6Ga0w/SP9FvAgFvAt7iMyJuszJwkyDBBY6A4xgwAZJfA+H4KMjPhYjOjQSAAAAAAAAAAAAAAAAAABBvldXAzxYBbyICyw/KP8mBAID7AFtsVgEUIo6Aktsx4qS1B1cDWlMzbvJ/byIhNCFvENs82zzbPMnQ+EqAUPR2b6Ga0w/SP9FvAgFvAt40I26zM2tYbQRWbwDIjQVQ2FsY3VsYXRlIHJld2FyZCBmb3Igg2zxVAts8i0IGlzII2zxYeYVdhVkCENs82zzQ/hQwWnMEYCG2C3pUcgKx8uBF2zypDF8lVQJwIFUGuMEA2zw0NCLPNcIIjoDfIs+EujMBf3DbPFx1W3UBDF3bPDTIM4cAOnGTIcMAjhMhqTgAlCKoIaWXUyKoMyGrAOIy6GwhAzr6RF1VAts8MzMhzzXCCI6A3yHPhOoygEB/IHDbPF9eYAEOXyLbPDPIMocBGlkitgtwIH9VBcEA2zxgBFAlzzWrAiCOgN9VApKAMJKAIOJYlSXPhLY23iGlMiGOgN9VA4AQ2zwgammAYQQg2zwljoDeUwO7joCOgOJfBn9lY2IDIiOOgORfJ9s8OMg3UwOhjoDkZIdkAQggjoDkZAE6Ids8MyDBCpMngDCZU3WSgFeSgDfi4iKgzwsHODB6AixTULkmwn+x8tBFU1ChUwS7joCOgOIwZ2YBRCSWU3PPCwc45F8o2zw5yDhTBKGWU3PPCwc45IB/IaEloDWHASIgllNzzwsHOORTQKE1JI6A32gBFF8o2zw5yDiAfzWHARRfJts8N8g2gH8yhwEUXyfbPDjINzCAf4cAXiD4TacCtQ8ipLUPcvhMqLUPoLUPobV/qLV/+Ev4TacCtQ+pBKi1f/hMWKC1D/hsATIj2zzJ0PhKgFD0dm+hmtMP0j/RbwIBbwLebQAQbyIByMsPyj8ETCCCCeKp8brjAiCCCf0MKrrjAiCCEAu6lzO64wIgghAYxgHNuuMCjo2IbwM2MPhG8uBM+EJu4wAhk9TR0N7Tf9HbPDDbPPIAj3CJBIRopvtg8tBI+En4VccF8uPzgQCAtQ/4V/hYqLUHqLUPbwDIi9X3RvdGFsVGlsZXM6II2zwicF8g2zzbPND+FDDbPDCFdXNxBJpwbW8CAfhtAacCtX/4TaW1D6kE+GtvAMiL1yZXdhcmRDb2VmZjogjbPPhLcF8g2zzbPND+FDBw+Gz4KMjPhYjOcc8LbojPFMmBAID7AIV1c3IASywRBoSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQARiWIW+IwACzjoDoyTF0AQwh2zwzzxF6BEwkzzWrAiCOgN9YkoAwkoAg4liVJM+EtjXeIaUyIY6A31UCets8IISDgHYEINs8JI6A3lMDu46AjoDiXwV/e3h3AyIjjoDkXybbPDfINlMDoY6A5HmHeQEIII6A5HkBGiHbPDMmgDBYoM8LBzZ6ABxvjW+NWSBviJJvjJEw4gIsU0C5JcJ/sfLQQlNAoVMEu46AjoDiMH18AUQkllNjzwsHN+RfJ9s8OMg3UwShllNjzwsHN+SAfyGhJaA1hwEiIJZTY88LBzfkU0ChNSSOgN9+ARRfJ9s8OMg3gH81hwAmIG+IIJulgQD/qAFvi2+IoJEx4gIibwAijoDhcJMjwwCOgOgwbCGCgQESXakMMjRc2zwyhwEKcNs8bCGHARRfJds8Nsg1gH8yhwEUXybbPDfINjCAf4cBOCHPNab5IddLIJYjcCLXMTTeMCG7joDfUxLObDGGARpc1xgzI84zXds8NMgzhwA6ASBviJ9vjSBviIEA/6GUb4xvAN+SbwDiWG+Mb4wDOjD4RvLgTPhCbuMA0wfTH/QEWW8CAdHbPDDbPPIAj4qJAMLtR3CAIG+HgCFvgjCAIHBkXwr4Q/hCyMv/yz/Pg/QAy3/LD8sPzIARYsjOyz9V4MjOVdDIzssPyx9VoMjOywfLB8sHywcBbyICyx/0AMt/9AD0AFnI9AD0AM3Nzc3Nye1UAWBopvtg8tBI+En4UccF8uP3+FbAAfLj9CH4V/hYqLUHufLj+CBvEMAI8uPscJMgwQiLAfyOa1MBbxGAIPQO8rLTH/QFbwJvEMAQ8uPtcJMgwRCOSFRwEm8RgCD0DvKy0x/0BW8CbxGAIPQO8rLXCwfCACCOIDBUcBJvEYAg9A7ystMf9AVvAm8RgCD0DvKy1wsH+Fm73vLj7qS1B+gwpLUH6DD4X8hYbyICyx/0AFl49EOMAAT4fwFQMNHbPPhdIY4cjQRwAAAAAAAAAAAAAAAAIH9DCqDIzvQAyXD7AN7yAI8BUDDR2zz4XyGOHI0EcAAAAAAAAAAAAAAAACB4qnxgyM70AMlw+wDe8gCPANztRNDT/9M/0wAx9ATTf9MP0w/U1NHQ+kDTP9TR0PpA1NHQ+kDTD9Mf1NHQ+kDTB9MH0wfTB9Mf9ARZbwIB03/0BPQE1NHQ9AT0BNFw+ED4QfhC+EP4RPhF+Eb4R/hI+EmAFnpjgCBvgO1X+GP4YgAK+Eby4EwCCvSkIPShk5IAFHNvbCAwLjU3LjAAAAAMIPhh7R7Z",
    code: "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",
    codeHash: "1b93fa8eb56d998ffe6ed5f91f5696fdc8814b7d163204d7ee57197dc4f9897b",
};
module.exports = { PBGameContract };