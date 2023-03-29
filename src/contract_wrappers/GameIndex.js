const GameIndexContract = {
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
                        "name": "_gameAddress",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "gameAddress",
                "inputs": [],
                "outputs": [
                    {
                        "name": "gameAddress",
                        "type": "address"
                    }
                ]
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "gameId",
                "type": "uint32"
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
                "name": "gameAddress",
                "type": "address"
            },
            {
                "name": "gameId",
                "type": "uint32"
            }
        ]
    },
    tvc: "te6ccgECFwEAArEAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAgaK2zUWBAQkiu1TIOMDIMD/4wIgwP7jAvILEwYFFQPE7UTQ10nDAfhmifhpIds80wABjh2BAgDXGCD5AQHTAAGU0/8DAZMC+ELiIPhl+RDyqJXTAAHyeuLTPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwH4I7zyudMfAds88jwPDQcDUu1E0NdJwwH4ZiLQ0wP6QDD4aak4ANwhxwDjAiHXDR/yvCHjAwHbPPI8EhIHAiggghBD06QduuMCIIIQR1ZU3LrjAhAIBHAw+EJu4wD4RvJzIZPU0dDe+kDR+EGIyM+OK2zWzM7J2zwgbvJ/0PpAMPhJxwXy4+v4APhv2zzyAA0WCgkAWPhQ+E/4TvhN+Ez4S/hK+EP4QsjL/8s/z4PLf8t/y3/Lf8t/WcjOyx/Nye1UAhjQIIs4rbNYxwWKiuILDAEK103Q2zwMAELXTNCLL0pA1yb0BDHTCTGLL0oY1yYg10rCAZLXTZIwbeICFu1E0NdJwgGOgOMNDhEBtnDtRND0BXBfQIlxJ4BA9A6T1wsfkXDi+HD4b/hu+G34bPhr+GqAQPQO8r3XC//4YnD4Y4IQF9eEAPhqghAR4aMA+GuCEAvrwgD4bIIQC+vCAPhtghAF9eEA+G4PAEOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAU4w0ds8+E8hjhuNBHAAAAAAAAAAAAAAAAAw9OkHYMjOzslw+wDe8gARAFztRNDT/9M/0wAx03/Tf9N/03/Tf9TR0PpA0x/R+HD4b/hu+G34bPhr+Gr4Y/hiAAr4RvLgTAIK9KQg9KEVFAAUc29sIDAuNTguMQAAAAwg+GHtHtk=",
    code: "te6ccgECFAEAAoQAAgaK2zUTAQQkiu1TIOMDIMD/4wIgwP7jAvILEAMCEgPE7UTQ10nDAfhmifhpIds80wABjh2BAgDXGCD5AQHTAAGU0/8DAZMC+ELiIPhl+RDyqJXTAAHyeuLTPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwH4I7zyudMfAds88jwMCgQDUu1E0NdJwwH4ZiLQ0wP6QDD4aak4ANwhxwDjAiHXDR/yvCHjAwHbPPI8Dw8EAiggghBD06QduuMCIIIQR1ZU3LrjAg0FBHAw+EJu4wD4RvJzIZPU0dDe+kDR+EGIyM+OK2zWzM7J2zwgbvJ/0PpAMPhJxwXy4+v4APhv2zzyAAoTBwYAWPhQ+E/4TvhN+Ez4S/hK+EP4QsjL/8s/z4PLf8t/y3/Lf8t/WcjOyx/Nye1UAhjQIIs4rbNYxwWKiuIICQEK103Q2zwJAELXTNCLL0pA1yb0BDHTCTGLL0oY1yYg10rCAZLXTZIwbeICFu1E0NdJwgGOgOMNCw4BtnDtRND0BXBfQIlxJ4BA9A6T1wsfkXDi+HD4b/hu+G34bPhr+GqAQPQO8r3XC//4YnD4Y4IQF9eEAPhqghAR4aMA+GuCEAvrwgD4bIIQC+vCAPhtghAF9eEA+G4MAEOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAU4w0ds8+E8hjhuNBHAAAAAAAAAAAAAAAAAw9OkHYMjOzslw+wDe8gAOAFztRNDT/9M/0wAx03/Tf9N/03/Tf9TR0PpA0x/R+HD4b/hu+G34bPhr+Gr4Y/hiAAr4RvLgTAIK9KQg9KESEQAUc29sIDAuNTguMQAAAAwg+GHtHtk=",
    codeHash: "e5b082b62a3cae41e39b8bc7e10380cb8125fabfda847df64d56c753fc619a32",
};
module.exports = { GameIndexContract };