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
                "name": "gameAddress",
                "type": "address"
            },
            {
                "name": "gameId",
                "type": "uint32"
            }
        ]
    },
    tvc: "te6ccgECFwEAAo0AAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAgaK2zUWBAQkiu1TIOMDIMD/4wIgwP7jAvILEwYFFQPE7UTQ10nDAfhmifhpIds80wABjh2BAgDXGCD5AQHTAAGU0/8DAZMC+ELiIPhl+RDyqJXTAAHyeuLTPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwH4I7zyudMfAds88jwPDQcDUu1E0NdJwwH4ZiLQ0wP6QDD4aak4ANwhxwDjAiHXDR/yvCHjAwHbPPI8EhIHAiggghBD06QduuMCIIIQR1ZU3LrjAhAIBHAw+EJu4wD4RvJzIZPU0dDe+kDR+EGIyM+OK2zWzM7J2zwgbvJ/0PpAMPhJxwXy4+v4APht2zzyAA0WCgkASPhO+E34TPhL+Er4Q/hCyMv/yz/Pg8t/y3/Lf1nIzssfzcntVAIY0CCLOK2zWMcFioriCwwBCtdN0Ns8DABC10zQiy9KQNcm9AQx0wkxiy9KGNcmINdKwgGS102SMG3iAhbtRNDXScIBjoDjDQ4RAY5w7UTQ9AVwXyCJcSWAQPQOk9cLH5Fw4vhu+G34bPhr+GqAQPQO8r3XC//4YnD4Y4IQEeGjAPhqghAL68IA+GuCEAvrwgD4bA8AQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABABTjDR2zz4TSGOG40EcAAAAAAAAAAAAAAAADD06QdgyM7OyXD7AN7yABEATO1E0NP/0z/TADHTf9N/03/U0dD6QNMf0fhu+G34bPhr+Gr4Y/hiAAr4RvLgTAIK9KQg9KEVFAAUc29sIDAuNTguMQAAAAwg+GHtHtk=",
    code: "te6ccgECFAEAAmAAAgaK2zUTAQQkiu1TIOMDIMD/4wIgwP7jAvILEAMCEgPE7UTQ10nDAfhmifhpIds80wABjh2BAgDXGCD5AQHTAAGU0/8DAZMC+ELiIPhl+RDyqJXTAAHyeuLTPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwH4I7zyudMfAds88jwMCgQDUu1E0NdJwwH4ZiLQ0wP6QDD4aak4ANwhxwDjAiHXDR/yvCHjAwHbPPI8Dw8EAiggghBD06QduuMCIIIQR1ZU3LrjAg0FBHAw+EJu4wD4RvJzIZPU0dDe+kDR+EGIyM+OK2zWzM7J2zwgbvJ/0PpAMPhJxwXy4+v4APht2zzyAAoTBwYASPhO+E34TPhL+Er4Q/hCyMv/yz/Pg8t/y3/Lf1nIzssfzcntVAIY0CCLOK2zWMcFioriCAkBCtdN0Ns8CQBC10zQiy9KQNcm9AQx0wkxiy9KGNcmINdKwgGS102SMG3iAhbtRNDXScIBjoDjDQsOAY5w7UTQ9AVwXyCJcSWAQPQOk9cLH5Fw4vhu+G34bPhr+GqAQPQO8r3XC//4YnD4Y4IQEeGjAPhqghAL68IA+GuCEAvrwgD4bAwAQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABABTjDR2zz4TSGOG40EcAAAAAAAAAAAAAAAADD06QdgyM7OyXD7AN7yAA4ATO1E0NP/0z/TADHTf9N/03/U0dD6QNMf0fhu+G34bPhr+Gr4Y/hiAAr4RvLgTAIK9KQg9KESEQAUc29sIDAuNTguMQAAAAwg+GHtHtk=",
    codeHash: "70fa92c671065b947abfdf60efd96e2732cab0bcb6c40980f885e27aac545ca9",
};
module.exports = { GameIndexContract };