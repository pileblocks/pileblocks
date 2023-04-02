const NftContract = {
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
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "name": "gameManager",
                        "type": "address"
                    },
                    {
                        "name": "sendGasTo",
                        "type": "address"
                    },
                    {
                        "name": "remainOnNft",
                        "type": "uint128"
                    },
                    {
                        "name": "json",
                        "type": "string"
                    },
                    {
                        "name": "indexDeployValue",
                        "type": "uint128"
                    },
                    {
                        "name": "indexDestroyValue",
                        "type": "uint128"
                    },
                    {
                        "name": "codeIndex",
                        "type": "cell"
                    }
                ],
                "outputs": []
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
                "name": "setParams",
                "inputs": [
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
                "name": "setJson",
                "inputs": [
                    {
                        "name": "json",
                        "type": "string"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getParams",
                "inputs": [],
                "outputs": [
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
                ]
            },
            {
                "name": "burn",
                "inputs": [
                    {
                        "name": "dest",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "applyNft",
                "inputs": [
                    {
                        "name": "_gameAddress",
                        "type": "address"
                    },
                    {
                        "name": "_targetPlayerAddress",
                        "type": "address"
                    }
                ],
                "outputs": []
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
                "name": "resolveIndex",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "collection",
                        "type": "address"
                    },
                    {
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "index",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "transfer",
                "inputs": [
                    {
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "name": "sendGasTo",
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
                "name": "changeOwner",
                "inputs": [
                    {
                        "name": "newOwner",
                        "type": "address"
                    },
                    {
                        "name": "sendGasTo",
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
                "name": "changeManager",
                "inputs": [
                    {
                        "name": "newManager",
                        "type": "address"
                    },
                    {
                        "name": "sendGasTo",
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
                "name": "getInfo",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
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
                    },
                    {
                        "name": "collection",
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
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "_id",
                "type": "uint256"
            }
        ],
        "events": [
            {
                "name": "NftCreated",
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
                    },
                    {
                        "name": "collection",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "OwnerChanged",
                "inputs": [
                    {
                        "name": "oldOwner",
                        "type": "address"
                    },
                    {
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "ManagerChanged",
                "inputs": [
                    {
                        "name": "oldManager",
                        "type": "address"
                    },
                    {
                        "name": "newManager",
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
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "name": "manager",
                        "type": "address"
                    },
                    {
                        "name": "collection",
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
                "name": "_id",
                "type": "uint256"
            },
            {
                "name": "_collection",
                "type": "address"
            },
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_manager",
                "type": "address"
            },
            {
                "name": "_json",
                "type": "string"
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
                "name": "_codeIndex",
                "type": "cell"
            },
            {
                "name": "FARMING_DEPLOY_VALUE",
                "type": "uint128"
            },
            {
                "name": "DEPLOY_VALUE",
                "type": "uint128"
            },
            {
                "name": "MIN_BALANCE",
                "type": "uint128"
            },
            {
                "name": "MESSAGE_VALUE",
                "type": "uint128"
            },
            {
                "name": "MIN_MESSAGE",
                "type": "uint128"
            },
            {
                "name": "paramType",
                "type": "uint8"
            },
            {
                "name": "paramIndex",
                "type": "uint128"
            },
            {
                "name": "paramValue",
                "type": "uint128"
            },
            {
                "name": "paramArray",
                "type": "uint8[]"
            },
            {
                "name": "applyNumTimes",
                "type": "uint8"
            }
        ]
    },
    tvc: "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",
    code: "te6ccgECXgEAEA0AAgaK2zVdAQQkiu1TIOMDIMD/4wIgwP7jAvILWgMCXAPE7UTQ10nDAfhmifhpIds80wABjh2BAgDXGCD5AQHTAAGU0/8DAZMC+ELiIPhl+RDyqJXTAAHyeuLTPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwH4I7zyudMfAds88jxIHwQEfO1E0NdJwwH4ZiLQ0wP6QDD4aak4APhEf29xggiYloBvcm1vc3BvdPhk4wIhxwDjAiHXDR/yvCHjAwHbPPI8V1ZWBARQIIIQEd2ekrvjAiCCECjYrAi74wIgghBHHMiPu+MCIIIQcX8LbLvjAjElEQUDPCCCEFrvHKi64wIgghBwFBzZuuMCIIIQcX8LbLrjAhAOBgNEMPhG8uBM+EJu4wAhk9TR0N76QNTR0PpA9ATR2zww2zzyAFkHWARS+En4TscF8uBncHT7AvhNXzPbPPhNI9s8VHAyJNs8ASCBAQv0gpNtXyAMOwoIAk7jDZMibrOOgOhfBSD6Qm8T1wv/jhAgyM+FCM6Ab89AyYEAgvsA3ltQCQGwIG8RJvhMU5f4TvhLVQZvEFUHcMjPhYDKAM+EQM4B+gJxzwtqVWDIz5GCV/3my//OVUDIzlUwyM5VIMjOWcjOzM3Nzc3NyXH7AFMBgQEL9HSTbV8g4w1sE1ABBNs8CwEIXwTbPDgBBNs8DQEIMNs8Wz4DKDD4RvLgTPhCbuMA1NHbPDDbPPIAWQ9YAED4SfhMxwXy4GZwdPsC+G/4TsjPhYjOgG/PQMmBAID7AAP8MPhG8uBM+EJu4wDTH/hEWG91+GQhk9TR0N76QNTR0PpA0ds8IY4dI9DTAfpAMDHIz4cgznHPC2EByM+Ta7xyos7NyXCOMfhEIG8TIW8S+ElVAm8RyM+EgMoAz4RAzgH6AvQAcc8LaQHI+ERvFc8LH87NyfhEbxTi+wDjAPIAWT9UBFAgghAyBOwpuuMCIIIQPbsefbrjAiCCEEQA31a64wIgghBHHMiPuuMCIyEUEgNYMPhG8uBM+EJu4wAhldMH1NHQktMH4tN/03/TH/QEWW8CAdMH0ds8MNs88gBZE1gAXPhJ+EzHBfLgZnB0+wJVA/h4VQL4eVj4egH4e/h8+E7Iz4WIzoBvz0DJgQCA+wAE/DD4Qm7jAPhG8nMhk9TR0N76QNTR0PpA1NHQ+kDTf9TTf9N/1NFVBlUU+EGIyM+OK2zWzM7J2zwgbvLQZSBu8n/Q+kAw+EkhxwXy4GYh8uBlaKb+YCK88uBoAXD7AvhsIfhtAfhughAyBOwp+ErIz4NZgCD0QyD4aoIQEb9Xah9dHBUB/oIQcX8LbLKCEAkVjeqyghAR3Z6SsgHIz4NZgCD0Q/hq+Ez4TvhN+EuL3AAAAAAAAAAAAAAAABjIzlUwyM+QMGw+0sv/zlnIzgHIzs3Nzclw+wDIz4WIzoBvz0DJgQCC+wBVAvhvghAk19X1+ErIz4NZgCD0Q/hqWPhwAfhx+HIWA14w+EqCC9WeZYIQFMynxrKCEFrvHKiyAcjPg1mAIPRD+GrbPPgAdYhvAvh72zzyADgXWAIDzsAZGAAD0AQCASAaGgIBIBsbAAMAIAIY0CCLOK2zWMcFioriHR4BCtdN0Ns8HgBC10zQiy9KQNcm9AQx0wkxiy9KGNcmINdKwgGS102SMG3iAhbtRNDXScIBjoDjDSBZA+Zw7UTQ9AVw+ED4QfhC+EP4RPhF+Eb4R/hI+EltcSyAQPQOk9cL/5Fw4olfIIhwIIhwX4BtbwJwgB1vgO1XgED0DvK91wv/+GJw+GOCEBfXhAD4c4IQEeGjAPh0ghAL68IA+HWCEAvrwgD4doIQBfXhAPh3SFxcA5Aw+Eby4Ez4Qm7jANHbPCWOLyfQ0wH6QDAxyM+HIM5xzwthXkDIz5L27Hn2ywfLf8t/AW8iAssf9ADLB83JcPsAkl8F4uMA8gBZIlQAFPhY+Fn4Wvhb+FwD3DD4RvLgTPhCbuMA0x/4RFhvdfhk0x/R2zwhjhoj0NMB+kAwMcjPhyDOghCyBOwpzwuBygDJcI4v+EQgbxMhbxL4SVUCbxHIz4SAygDPhEDOAfoC9ACAas9A+ERvFc8LH8oAyfhEbxTi+wDjAPIAWSRUADb4RHBvcoBAb3Rwb3H4ZPhKgCD0DpPXCgCRcOIEUCCCEBTMp8a64wIgghAZFEBauuMCIIIQJNfV9brjAiCCECjYrAi64wIvLComA0Aw+Eby4Ez4Qm7jACGT1NHQ3vpA1NHQ+kDR2zww2zzyAFknWAKk+En4TscF8uBnaKb+YHr4V6i1f77y5AH4XKW1B/h82zz4S2im/mBy+FeotX+htX9VAsjPhYjOAfoCcc8LalnIz5D/fnhOy//Mzclw+wD4XI6A3ykoAXz4TvhN+Ev4V/hMyM+FiM4B+gJxzwtqVSDIz5B/wee6y//OAcjOzc3JcPsA2zz4TsjPhQjOgG/PQMmBAKD7AC4AvvhYyMsH+E0BzvhYwAKYUhDO+FoBy3+ORPhYwAGZ+FtvIgLLH/QAjjP4WMADmFIQzvhaAct/jiP4WMAEmFIQzvhaAct/jhP4WMAFnVIQzvhZAct/+FoBy3/e4uLi4skxA9Qw+Eby4Ez4Qm7jANMf+ERYb3X4ZNHbPCGOGSPQ0wH6QDAxyM+HIM6CEKTX1fXPC4HMyXCOLvhEIG8TIW8S+ElVAm8RyM+EgMoAz4RAzgH6AvQAgGrPQPhEbxXPCx/MyfhEbxTi+wDjAPIAWStUACD4RHBvcoBAb3Rwb3H4ZPhPAzYw+Eby4Ez4Qm7jACGT1NHQ3vpA0ds8MNs88gBZLVgBjvhJ+E7HBfLgZ/gA+E74TfhL+Ff4TMjPhYjOAfoCcc8LalUgyM+Qf8Hnusv/zgHIzs3NyXD7ANs8yM+FCM6Ab89AyYEAoPsALgJ0+Ez4Tds8+CjbPPhXAfkA+Cj6Qm8SyM+GQMoHy//J0MjPhYjOAfoCcc8LavhNyM+QDo63Xs7NyXD7AEFAA94w+Eby4Ez4Qm7jANMf+ERYb3X4ZNHbPCGOGiPQ0wH6QDAxyM+HIM6CEJTMp8bPC4HL/8lwjjL4RCBvEyFvEvhJVQJvEcjPhIDKAM+EQM4B+gL0AHHPC2kByPhEbxXPCx/L/83J+ERvFOL7AOMA8gBZMFQAJPhEcG9ygEBvdHBvcfhk+FL5AAROIIIL1Z5luuMCIIIQCRWN6rrjAiCCEBG/V2q64wIgghAR3Z6SuuMCU0xJMgNEMPhG8uBM+EJu4wAhk9TR0N76QNTR0PpA9ATR2zww2zzyAFkzWAQ2+En4TscF8uBncHT7Al8y2zz4TSPbPCPbPF8zPDtRNANo2zwBIIEBC/SCk21fIOMNkyJus46A6F8FIPpCbxPXC/+OECDIz4UIzoBvz0DJgQCC+wDeWzZQNQG8IG8RJvhMKfhOU7n4S1UHbxBVCHDIz4WAygDPhEDOAfoCcc8LalVwyM+R8aOG5sv/zlVQyM5VQMjOVTDIzlUgyM5ZyM7Mzc3Nzc3NyXH7AFMBgQEL9HSTbV8g4w1sE1ABBNs8NwEIXwPbPDgEUon4Tds8+CjbPPhMASD5AMjPigBAy/9Z+FBVAsjPhYjPEwH6AnPPC2ohSEFAOQSg2zzMz4MByM+RHVlTcs7NyXD7APhM+E3bPPgo2zz4TAEg+QDIz4oAQMv/WfhQVQLIz4WIzxMB+gJzzwtqIds8zM+DAcjPkR1ZU3LOzclw+wA6QUA6ADTQ0gABk9IEMd7SAAGT0gEx3vQE9AT0BNFfAwBi+E0h+G1TAccFjiRci9wAAAAAAAAAAAAAAAAYyM5ZyM+QUfZy+s4ByM7Nzclw+wDfWwEE2zw9AQgw2zwwPgOOifhN2zwh+FFYyM+FiM4B+gJxzwtqAcjPkA6Ot17Ozclw+wD4TPhN2zwB+FFYyM+FiM4B+gJxzwtqAcjPkA6Ot17Ozclw+wBIPz8CTNs8+CjbPPkA+Cj6Qm8SyM+GQMoHy//J0PhEcG9ygEBvdHBvcfhkQUAAQnDIy/9wbYBA9EMBcViAQPQWyPQAyQHIz4SA9AD0AM+ByQIaiMjMEs7O+FLQAcnbPEdCAhYhizits1jHBYqK4kRDAQgB2zzJRQEmAdTUMBLQ2zzIz44rbNYSzM8RyUUBZtWLL0pA1yb0BNMJMSDXSpHUjoDiiy9KGNcmMAHIz4vSkPQAgCDPCwnPi9KGzBLMyM8RzkYBBIgBXAAGbmZ0AEOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQA4Qw+Eby4Ez4Qm7jANMf+ERYb3X4ZNHbPCSOKCbQ0wH6QDAxyM+HIM5xzwthXjDIz5JG/V2qy//OWcjOAcjOzc3NyXBZS0oBio48+EQgbxMhbxL4SVUCbxHIz4SAygDPhEDOAfoC9ABxzwtpXjDI+ERvFc8LH8v/zlnIzgHIzs3Nzcn4RG8U4vsA4wDyAFQALPhEcG9ygEBvdHBvcfhk+Ev4TfhO+EwDRDD4RvLgTPhCbuMAIZPU0dDe+kDU0dD6QPQE0ds8MNs88gBZTVgEUvhJ+E7HBfLgZ3B0+wL4Tl8z2zz4TiPbPFRwMiTbPAEggQEL9IKTbV8gUlFSTgJO4w2TIm6zjoDoXwUg+kJvE9cL/44QIMjPhQjOgG/PQMmBAIL7AN5bUE8BsCBvESb4TFOX+E34S1UGbxBVB3/Iz4WAygDPhEDOAfoCcc8LalVgyM+Qj2t5nsv/zlVAyM5VMMjOVSDIzlnIzszNzc3Nzclx+wBTAYEBC/R0k21fIOMNbBNQABAgWNN/1NFvAgBi+E4h+G5TAccFjiRci9wAAAAAAAAAAAAAAAAYyM5ZyM+Q5svwJs4ByM7Nzclw+wDfWwAEXwQD1DD4RvLgTPhCbuMA0x/4RFhvdfhk0ds8IY4ZI9DTAfpAMDHIz4cgzoIQg9WeZc8LgczJcI4u+EQgbxMhbxL4SVUCbxHIz4SAygDPhEDOAfoC9ACAas9A+ERvFc8LH8zJ+ERvFOL7AOMA8gBZVVQAKO1E0NP/0z8x+ENYyMv/yz/Oye1UACD4RHBvcoBAb3Rwb3H4ZPhSAAr4RvLgTAJ8IdYfMfhG8uBM+EJu4wBwdPsC0x8wghAj2t5nuo4d+En4TscFlPhN+G7e+E3Iz4WIzoBvz0DJgQCA+wDe2zxZWACw7UdwgB1vh4Aeb4IwgB1wZF8K+EP4QsjL/8s/z4P0AMv/gBFiyM5V8MjOVeDIzszLf8t/zMt/VYDIy3/Lf8t/y3/LB8t/y38BbyICyx/0AMsHzc3NzcntVADI7UTQ0//TP9MAMfQE0//U0dD6QNTR0PpA1NHQ+kDU03/Tf9TTf9TR0NN/03/Tf9N/0wfTf9N/0x/0BFlvAgHTB9Fw+ED4QfhC+EP4RPhF+Eb4R/hI+EmAE3pjgB1vgO1X+GP4YgIK9KQg9KFcWwAUc29sIDAuNTguMQAAAAwg+GHtHtk=",
    codeHash: "60fb122509a0697940d949544e2e0b83d4f992986e5607bf6f241af85897f248",
};
module.exports = { NftContract };