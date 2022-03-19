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
                "inputs": [
                    {
                        "name": "playerAddress",
                        "type": "address"
                    }
                ],
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
    tvc: "te6ccgECogEAFvYAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAgaK2zWhBAQkiu1TIOMDIMD/4wIgwP7jAvILngYFoAPE7UTQ10nDAfhmifhpIds80wABjh2BAgDXGCD5AQHTAAGU0/8DAZMC+ELiIPhl+RDyqJXTAAHyeuLTPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwH4I7zyudMfAds88jyblgcDUu1E0NdJwwH4ZiLQ0wP6QDD4aak4ANwhxwDjAiHXDR/yvCHjAwHbPPI8nZ0HAiggghBTOZQUu+MCIIIQanY4eLvjAhEIAzwgghBV98WcuuMCIIIQWipj6brjAiCCEGp2OHi64wIQCwkDNjD4RvLgTPhCbuMAIZPU0dDe+kDR2zww2zzyAJcKaAACMAM6MPhG8uBM+EJu4wAhk9TR0N76QNMP0ds8MNs88gCXDGgB/Gim+2Dy0Ej4SSJwyMv/cG2AQPRD+E9xWIBA9BYBcliAQPQWyPQAyfhOyM+EgPQA9ADPgcn5AMjPigBAy//J0McF8uPp+FbAAvLj9CH4XoEBC/QKlNMf9AWScG3ibwIgbxCOGfhZcMjLD3BtI5lfIqQDWIAg9EPkbCFvAjHfAQ0Btts8cJQg+Fm5jjxTAW8RgCD0DvKy1wsPUxNvEYAg9A7ystcLD6C1D4EEALYII28iUjBTErnyslUCyMsPWYAg9ENvAjOktQ/oW/heyFhvIgLLH/QAWYEBC/RB+H4OAf5wbW8CIacItQ96qQRYIfhZqQT4Wai1D6G1D3CUIPhZuY4ZXfhZqQTIyw8BbyIhpFUggCD0Q28CNKS1B+gwcJcg+FmltQe5jjQh+BH4JfgVUwRvIlJAUxK58rJcgCD0DvKy1wsPVQOgtQ/Iyw9ZgCD0Q28CNSKitQ8ypLUH6DBYDwBEbyJ0ZiO58rJcgCD0DvKy1wsPVQOgtQ/Iyw9ZgCD0Q28CMQOAMPhG8uBM+EJu4wDR2zwhjigj0NMB+kAwMcjPhyDOjQQAAAAAAAAAAAAAAAANX3xZyM8WygDJcPsAkTDi4wDyAJc0YAROIIILuImZu+MCIIIQGMYBzbvjAiCCEC4anjK74wIgghBTOZQUu+MCXkYbEgRQIIIQMLN39brjAiCCEDbM5Be64wIgghBSlKDXuuMCIIIQUzmUFLrjAhkWFBMBUDDR2zz4XyGOHI0EcAAAAAAAAAAAAAAAADTOZQUgyM70AMlw+wDe8gCXAyQw+Eby4Ez4Qm7jANHbPOMA8gCXFWAARvhJ+FXHBfLj9YIQBfXhAHD7AvhVyM+FiM6Ab89AyYEAgPsAAzYw+Eby4Ez4Qm7jACGT1NHQ3vpA0ds8MNs88gCXF2gBLPhWwAPy4/Qg+F2BAQv0Cm+hMY6A3jAYA6Ag+F2BAQv0C46AjoDiiHD4KHAlVQRvFfhSyM+FiM6NBJBHhowAAAAAAAAAAAAAAAAAAMDPFlVQyM+Rz4iFDst/zst/VSDIzsoAzM3NyXD7AFFQoAMqMPhG8uBM+EJu4wDTB9HbPDDbPPIAlxpoACRopvtg8tBI+En4VccF8uP1+HYEUCCCECDfK6u64wIgghAi25VjuuMCIIIQLBEGhLrjAiCCEC4anjK64wI1MigcA0ow+Eby4Ez4Qm7jACGT1NHQ3vpA0x/0BFlvAgHTf9HbPDDbPPIAlx1oA/74VsAC8uP0+EkjcMjL/3BtgED0Q/hPcViAQPQWAXJYgED0Fsj0AMn4TsjPhID0APQAz4HJ+QDIz4oAQMv/ydDHBfLj6Wim/mCCEGs6j8C+8uPv+Fu68uPwIG8QwTPy4/n4J28QaKb+YKG1f4IQHc1lAKC1f3L7AgHbPDD4U46AIB8eAALfAaxz+HbbPPhVyM+FiM6NBJBHhowAAAAAAAAAAAAAAAAAAMDPFgHIz5A2EZ36AW8qXpDOyz9VcMjOyx9VUMjOyw9VMMjOAW8iAssf9ADLB8zNzc3NyXD7AFgEeHAg+F/4UyTbPCX4XoEBC/QKlNMf9AWScG3ibwIgbxCWfzVVA2xx4SdvEXBtjoCOgOMYXwMkjoDfXwRsMUEmIiEBfiH4I29UMidvELUPUyJvEVigtQ9vUTIj+H8i+HMm+F0j2zzJWYEBC/QT+H0m+F7II28iAssf9ABZgQEL9EH4fk8BciBvESFvEiJvEIAg+EB49A6U0x/0BZJwbeJvAm8RgCD0DvKy0x/0BW8CbxGAIPQO8rLXCwchbxO6ICMBto5NMCBvESFvEiJvECl49A6U0x/0BZJwbeJvAm8RgCD0DvKy0x/0BW8CbxGAIPQO8rLXCwfAACCOFTAgbxOltQckbxGAIPQO8rLXCw/CAN7ejoCUfzjbMeIhpDIkAf4gbxNTcW8QZiF49A6U0x/0BZJwbeIlbxJmI7nyslyAIPQO8rLTH/QFKG8RZiO58rJVB8jLB1mAIPRDbwLIAW8iAssf9ABZgCD0Q28CyAFvIgLLH/QAWXj0QzcjbyIibxOltQdmI7nyslyAIPQO8rLXCw+ltQ/Iyw9ZgCD0Q28CJQAwNCWltQ82JcABlSR/b1M13iWVJH9vUjXfARxTEoAg9A5voeMAIDJusycAFtMH0wfTB9MH0W8EAzYw+Eby4Ez4Qm7jACGT1NHQ3vpA0ds8MNs88gCXKWgBFGim+2Dy0EiOgNgqBPL4SfgoxwXy5FZwbds8I/pCbxPXC/+OgI6A4jIhbrMzcJMgwUCOgOMYXwOOMXAgbwL4KMjPhYjOjQSAAAAAAAAAAAAAAAAAABBvldXAzxYBbyICyw/KP8mBAID7ADDh+CjIz4WIznHPC24ByM+QsEQaEs7NyYEAgPsAMS8tKwEUI46Aktsx4qS1BywCXlMibvJ/byJcbxFYbxS0P6NvAts8ydD4SoBQ9BL4alMCgQEL9HRvoeMANDUibrM0RTABFCCBAQv0g2+h4wAuAQwB0Ns8bwJWARZTMIEBC/R0b6HjADABEAHXTNDbPG8CVgAE+F0DJjD4RvLgTPhCbuMA0ds8MNs88gCXM2gBXGim+2Dy0Ej4SfhRxwXy4/f4VsAB8uP02zyTdPh23vhJyM+FCM6Ab89AyYBA+wA0ALL4V/hYqLUHcG1vAoAg+EAgePSGmCBY0x/0BW8Ck21fIOKTIm6zjihTQcjLBwFvIiGkVSCAIPRDbwI1UyN49HyYIFjTH/QFbwKTbV8g4mwz6F8EbxC6kX/gcAM2MPhG8uBM+EJu4wDTD9I/WW8CAdHbPDDbPPIAlzZoARRopvtg8tBIjoDYNwPW+En4KMcF8uRWbXBfIG8CI28QjoCOFPhKgFD0im+hmtMP0j/RbwIBbwLe4jMibrMycJMgwQWOgOMYMAGOgOH4KMjPhYjOjQSAAAAAAAAAAAAAAAAAABBvldXAzxYBbyICyw/KP8mBAID7AFtEOjgBCNs8XwM5ADSCEAX14QBw+wL4VcjPhYjOgG/PQMmBAID7AAEUIo6Aktsx4qS1BzsDWlMzbvJ/byIhNCFvENs82zzbPMnQ+EqAUPR2b6Ga0w/SP9FvAgFvAt40I26zM0M8RQR4Ids8UhAgbxVYoLV/b1Ui+F1Y2zzJWYEBC/QT+H1vAMiNBVDYWxjdWxhdGUgcmV3YXJkIGZvciCDbPFUCQU+JPQQo2zyLQgaXMgjbPFh52zzbPND+FDB2iT50BGAhtgt6VHICsfLgRds8qQxfJVUCcCBVBrjBANs8NDQizzXCCI6A3yLPhLozAX9w2zxAaT9pAQxd2zw0yDOLADpxkyHDAI4TIak4AJQiqCGll1MiqDMhqwDiMuhsIQI8iXBfQG8GIfhdgQEL9ApvoTGOgJf4SXBfQG8G4mwhm0ICGiH4XYEBC/QLjoCOgOJRUABeIPhNpwK1DyKktQ9y+EyotQ+gtQ+htX+otX/4S/hNpwK1D6kEqLV/+ExYoLUP+GwBMiPbPMnQ+EqAUPR2b6Ga0w/SP9FvAgFvAt5FABBvIgHIyw/KPwRQIIIQCPLScLrjAiCCEAu6lzO64wIgghAVPcHvuuMCIIIQGMYBzbrjAl1ZV0cDNjD4RvLgTPhCbuMAIZPU0dDe03/R2zww2zzyAJdIaANkaKb7YPLQSPhJ+FXHBfLj84EAgLUP+Ff4WKi1B6i1DyHbPCHbPCGAZKkEp1W1fzLbPDBOS0kEmnBtbwIB+G0BpwK1f/hNpbUPqQT4a28AyIvXJld2FyZENvZWZmOiCNs8+EtwXyDbPNs80P4UMHD4bPgoyM+FiM5xzwtuiM8UyYEAgPsAiWl0SgBLLBEGhIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAEWNs8IPhdgQEL9AuOgI6A4liAFKkEASBvFVigtX9vVfhdAds8yVmBAQv0E/h9TFFQTwM2ifhdIIEBC/SDk21fIOMNcJMjbrOOgOMY3F8Em1VNATYhbxOWWGxRdNsx4FM0gQEL9HSTbV8g4w00NDRUBFbbPCD4XYEBC/QLjoCOgOJYeqkEASBvFVigtX9vVfhdAds8yVmBAQv0E/h9UlFQTwAgbyZeQMjOyw/KAMoAyz/LfwEMiXBfQG8GmwEG0Ns8VgM2ifhdIIEBC/SDk21fIOMNcJMjbrOOgOMY3F8Em1VTATYhbxKWWGxRdNsx4FM0gQEL9HSTbV8g4w00NDRUAQ4gWNdM0Ns8VgEKIFjQ2zxWAB76QNMP0gDSANM/03/RbwYDuDD4RvLgTPhCbuMA0ds8IY5EI9DTAfpAMDHIz4cgznHPC2EByM+SVPcHvgFvKl6Qzss/VXDIzssfVVDIzssPVTDIzgFvIgLLH/QAywfMzc3Nzclw+wCRMOLjAPIAl1hgACz4T/hQ+FH4VPhS+FP4Vfha+Fb4XG8KAzow+Eby4Ez4Qm7jANMH0x/0BFlvAgHR2zww2zzyAJdaaAFgaKb7YPLQSPhJ+FHHBfLj9/hWwAHy4/Qh+Ff4WKi1B7ny4/ggbxDACPLj7HCTIMEIWwH8jmtTAW8RgCD0DvKy0x/0BW8CbxDAEPLj7XCTIMEQjkhUcBJvEYAg9A7ystMf9AVvAm8RgCD0DvKy1wsHwgAgjiAwVHASbxGAIPQO8rLTH/QFbwJvEYAg9A7ystcLB/hZu97y4+6ktQfoMKS1B+gwgCD4QMhYbyICyx/0AFl4XAAM9EOAIPhgAVAw0ds8+F0hjhyNBHAAAAAAAAAAAAAAAAAiPLScIMjO9ADJcPsA3vIAlwRGIIID8tO64wIgggniqfG64wIgggn9DCq64wIgggu4iZm64wJkY2JfAzQw+Eby4Ez4Qm7jACGT1NHQ3tN/0ds84wDyAJdhYAAo7UTQ0//TPzH4Q1jIy//LP87J7VQBlvhJ+FXHBfLj9Yhw+Chw+ElVBPhSyM+FiM6NBJBHhowAAAAAAAAAAAAAAAAAAMDPFlVQyM+Rz4iFDst/zst/VSDIzsoAzM3NyXD7AKABUDDR2zz4XiGOHI0EcAAAAAAAAAAAAAAAACB/QwqgyM70AMlw+wDe8gCXAVQw0ds8gCD4QCGOHI0EcAAAAAAAAAAAAAAAACB4qnxgyM70AMlw+wDe8gCXBPww+EJu4wD4RvJz0x/0BFlvAgHU0fhBiMjPjits1szOyds8IG7y0/IgbvJ/0NMf+kAwAfh0+HX4SfhVxwXy4/P4fPh6cPhabxGAIPQO8rLXCxe1B/h3cfhabxGAIPQO8rLXCxe1B/h4cvhabxGAIPQO8rLXCxeCEDuaygCotX+WoZNlBO74e3P4Wm8RgCD0DvKy1wsXtQf4eXH4dvhX+FiotQdwk1MBuY6A6DBwyMv/cG2AQPRD+E9xWIBA9Bb4KHJYgED0Fsj0AMn4TsjPhID0APQAz4HJ+QDIz4oAQMv/ydD4cm8AyIvUdhbWUgd2FsbGV0OiCNs8+FLbPIyJdmYEXts80P4UMIEAgLUPqLUP+HNvAMiNBByZW1haW5pbmdUaWxlczogg2zz4U3BfINs8dIlpZwJo2zzQ/hQwghAR4aMA+Cj4T8jPhYjOcc8LblmLgx7dTHanY4eIyM7Oy3/NyYEAgPsA2zzyAHRoAMbtR3CAIW+HgCJvgjCAIXBkXwr4Q/hCyMv/yz/Pg/QAy3/LD8sPzIASYsjOyz9V8MjOVeDIzssPyx9VsMjOywfLB8sHywcBbyICyx/0AMt/zPQAVSDI9AD0APQAzc3Nzc3J7VQETCTPNasCII6A31iSgDCSgCDiWJUkz4S2Nd4hpTIhjoDfVQJ62zwgc3KEagQg2zwkjoDeUwO7joCOgOJfBYNubGsDIiOOgORfJts8N8g2UwOhjoDkbYttAQggjoDkbQEaIds8MyaAMFigzwsHNn4CLFNAuSXCf7Hy0EJTQKFTBLuOgI6A4jBwbwFEJJZTY88LBzfkXyfbPDjIN1MEoZZTY88LBzfkgH8hoSWgNYsBIiCWU2PPCwc35FNAoTUkjoDfcQEUXyfbPDjIN4B/NYsBFF8l2zw2yDWAfzKLARRfJts8N8g2MIB/iwEYliFviMAAs46A6MkxdQEMIds8M88RfgM6+kRdVQLbPDMzIc81wgiOgN8hz4TqMoBAfyBw2zx4d3kBDl8i2zwzyDKLARpZIrYLcCB/VQXBANs8eQRQJc81qwIgjoDfVQKSgDCSgCDiWJUlz4S2Nt4hpTIhjoDfVQOAENs8IIiHhHoEINs8JY6A3lMDu46AjoDiXwaDf3x7AyIjjoDkXyfbPDjIN1MDoY6A5H2LfQEIII6A5H0BOiHbPDMgwQqTJ4AwmVN1koBXkoA34uIioM8LBzgwfgAcb41vjVkgb4iSb4yRMOICLFNQuSbCf7Hy0EVTUKFTBLuOgI6A4jCBgAFEJJZTc88LBzjkXyjbPDnIOFMEoZZTc88LBzjkgH8hoSWgNYsBIiCWU3PPCwc45FNAoTUkjoDfggEUXyjbPDnIOIB/NYsAJiBviCCbpYEA/6gBb4tviKCRMeICIm8AIo6A4XCTI8MAjoDoMGwhhoUBEl2pDDI0XNs8MosBCnDbPGwhiwEUXybbPDfINoB/MosBFF8n2zw4yDcwgH+LATghzzWm+SHXSyCWI3Ai1zE03jAhu46A31MSzmwxigEaXNcYMyPOM13bPDTIM4sAOgEgb4ifb40gb4iBAP+hlG+MbwDfkm8A4lhvjG+MAUZwbW8CcJMgwQiOgOgwIfhfyFUCbyICyx/0AFl49EP4f6S1B40BQCGAEIhvAsgBbyICyx/0AAFvIiGkVSCAIPRDbwIypLUHjgIDzkCPjwIBIJCQAgEgkZECASCSkgADACACGNAgizits1jHBYqK4pSVAQrXTdDbPJUAQtdM0IsvSkDXJvQEMdMJMYsvShjXJiDXSsIBktdNkjBt4gIW7UTQ10nCAY6A4w2YlwDe7UTQ0//TP9MAMfQE03/TD9MP1NTR0PpA0z/U0dD6QNTR0PpA0w/TH9TR0PpA0wfTB9MH0wfTH/QEWW8CAdN/1PQE1NHQ9AT0BPQE0XD4QPhB+EL4Q/hE+EX4RvhH+Ej4SYAXemOAIW+A7Vf4Y/hiBJRw7UTQ9AVw+ED4QfhC+EP4RPhF+Eb4R/hI+EltcF8gcS+AQPQPjoDfclYQgED0Do6A33NWEYBA9A6T1ws/kXDidFYSgED0Do6A35yampkDRolwIIlwX0BtbwJwiG1fMIAhb4DtV4BA9A7yvdcL//hicPhjm5ugAQKJmwBDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAECiKAACvhG8uBMAgr0pCD0oaCfABRzb2wgMC41Ny4wAAAADCD4Ye0e2Q==",
    code: "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",
    codeHash: "c34205b595f1b48518a1459aeb2918bd44c363db063f1c1920aff9a9b0e8fae5",
};
module.exports = { PBGameContract };