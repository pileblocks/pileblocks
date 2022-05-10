const FarmingCalculatorContract = {
    abi: {
        "ABI version": 2,
        "version": "2.2",
        "header": [
            "time"
        ],
        "functions": [
            {
                "name": "log_2",
                "inputs": [
                    {
                        "name": "x",
                        "type": "uint128"
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
                "name": "calcFarming",
                "inputs": [
                    {
                        "name": "time",
                        "type": "uint128"
                    },
                    {
                        "name": "tokenBalance",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "farmValue",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "constructor",
                "inputs": [],
                "outputs": []
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "_randomNonce",
                "type": "uint64"
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
                "name": "_randomNonce",
                "type": "uint64"
            }
        ]
    },
    tvc: "te6ccgECFAEAArEAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgBCSK7VMg4wMgwP/jAiDA/uMC8gsRBQQTAoTtRNDXScMB+GYh2zzTAAGfgQIA1xgg+QFY+EL5EPKo3tM/AfhDIbnytCD4I4ED6KiCCBt3QKC58rT4Y9MfAds88jwIBgNK7UTQ10nDAfhmItDXCwOpOADcIccA4wIh1w0f8rwh4wMB2zzyPBAQBgM8IIIQTkcKfbrjAiCCEGQxTt264wIgghBotV8/uuMCCwoHAiIw+EJu4wD4RvJz0fgA2zzyAAgMAVztRNDXScIBjiNw7UTQ9AVxIYBA9A6T1ws/kXDi+GqAQPQO8r3XC//4YnD4Y+MNCQAm7UTQ0//TP9MAMdM/0fhq+GP4YgJ6MPhG8uBM03/R2zwhjigj0NMB+kAwMcjPhyDOjQQAAAAAAAAAAAAAAAAOQxTt2M8Wy3/JcPsAkTDi4wDyAA4MAn4w+Eby4EzTf9N/0ds8IY4oI9DTAfpAMDHIz4cgzo0EAAAAAAAAAAAAAAAADORwp9jPFst/yXD7AJEw4uMA8gANDAAk+Er4Q/hCyMv/yz/Pg8s/ye1UAl4hcViCEDuaygCpBaC1f9s8qLV/IYEcIKC1f6kEpxO1f3FYgQOEqQSgtX/bPKi1fw4OAfwgwgDy4GRwIYJxAAAAAAAAAAAAAAAAAAAAAL6aIat/MoEAgKC1f94hgjEAAAAAAAAAAL6YIas/MqZAtX/eIYIRAAAAAL6YIasfMqYgtX/eIYIBAAC+mCGrDzKmELV/3iGBAQC+mCGrBzKmCLV/3iHCD5ghqwMypgS1f94hwgMPACSYIasBMqYCtX/eAcIBk6S1f94ACvhG8uBMAgr0pCD0oRMSABRzb2wgMC41Ny4wAAA=",
    code: "te6ccgECEQEAAoQABCSK7VMg4wMgwP/jAiDA/uMC8gsOAgEQAoTtRNDXScMB+GYh2zzTAAGfgQIA1xgg+QFY+EL5EPKo3tM/AfhDIbnytCD4I4ED6KiCCBt3QKC58rT4Y9MfAds88jwFAwNK7UTQ10nDAfhmItDXCwOpOADcIccA4wIh1w0f8rwh4wMB2zzyPA0NAwM8IIIQTkcKfbrjAiCCEGQxTt264wIgghBotV8/uuMCCAcEAiIw+EJu4wD4RvJz0fgA2zzyAAUJAVztRNDXScIBjiNw7UTQ9AVxIYBA9A6T1ws/kXDi+GqAQPQO8r3XC//4YnD4Y+MNBgAm7UTQ0//TP9MAMdM/0fhq+GP4YgJ6MPhG8uBM03/R2zwhjigj0NMB+kAwMcjPhyDOjQQAAAAAAAAAAAAAAAAOQxTt2M8Wy3/JcPsAkTDi4wDyAAsJAn4w+Eby4EzTf9N/0ds8IY4oI9DTAfpAMDHIz4cgzo0EAAAAAAAAAAAAAAAADORwp9jPFst/yXD7AJEw4uMA8gAKCQAk+Er4Q/hCyMv/yz/Pg8s/ye1UAl4hcViCEDuaygCpBaC1f9s8qLV/IYEcIKC1f6kEpxO1f3FYgQOEqQSgtX/bPKi1fwsLAfwgwgDy4GRwIYJxAAAAAAAAAAAAAAAAAAAAAL6aIat/MoEAgKC1f94hgjEAAAAAAAAAAL6YIas/MqZAtX/eIYIRAAAAAL6YIasfMqYgtX/eIYIBAAC+mCGrDzKmELV/3iGBAQC+mCGrBzKmCLV/3iHCD5ghqwMypgS1f94hwgMMACSYIasBMqYCtX/eAcIBk6S1f94ACvhG8uBMAgr0pCD0oRAPABRzb2wgMC41Ny4wAAA=",
    codeHash: "c5e0809a27685f11f3d20ad1f30ebf4bd23f9a30e98d630758d3cca6dc4e246f",
};
module.exports = { FarmingCalculatorContract };