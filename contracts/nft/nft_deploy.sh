#!/usr/bin/env bash

NWK=se

#se
#dev
#main

if [ $NWK == "se" ]
then
    NETWORK=127.0.0.1
    SIGNER=norton
    PUBKEY=0x1bdfe03401657bfb1aae235be487b9641f0056965eb5573c17ed3685750e375a
elif [ $NWK == "dev" ]
then
    NETWORK=net.ton.dev
    SIGNER=norton
    PUBKEY=0x1bdfe03401657bfb1aae235be487b9641f0056965eb5573c17ed3685750e375a
else
    NETWORK=main.ton.dev
    SIGNER=pile_signer
    PUBKEY=0xc2cc1115bc700536f0dc756623777cde6f241a38be7e60cb11bc80fc4c43879c
fi

everdev-windows sol compile Collection.sol -i ../../node_modules
everdev-windows sol compile Nft.sol -i ../../node_modules

NFT_CODE=$(everdev-windows js wrap Nft.sol -p | grep "code:" | cut -d "\"" -f 2)
INDEX_CODE="te6ccgECHQEAA1UAAgaK2zUcAQQkiu1TIOMDIMD/4wIgwP7jAvILGQMCGwOK7UTQ10nDAfhmifhpIds80wABn4ECANcYIPkBWPhC+RDyqN7TPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwHbPPI8DgsEA3rtRNDXScMB+GYi0NMD+kAw+GmpOAD4RH9vcYIImJaAb3Jtb3Nwb3T4ZNwhxwDjAiHXDR/yvCHjAwHbPPI8GBgEAzogggujrde64wIgghAWX5bBuuMCIIIQR1ZU3LrjAhMPBQRCMPhCbuMA+EbycyGT1NHQ3vpA0fhBiMjPjits1szOyds8CxwIBgJqiCFus/LoZiBu8n/Q1PpA+kAwbBL4SfhKxwXy4GT4ACH4a/hs+kJvE9cL/5Mg+GvfMNs88gAHFAA8U2FsdCBkb2Vzbid0IGNvbnRhaW4gYW55IHZhbHVlAhjQIIs4rbNYxwWKiuIJCgEK103Q2zwKAELXTNCLL0pA1yb0BDHTCTGLL0oY1yYg10rCAZLXTZIwbeICFu1E0NdJwgGOgOMNDBcCSnDtRND0BXEhgED0Do6A34kg+Gz4a/hqgED0DvK91wv/+GJw+GMNDgECiQ4AQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAD/jD4RvLgTPhCbuMA0x/4RFhvdfhk0ds8I44mJdDTAfpAMDHIz4cgznHPC2FeIMjPkll+WwbOWcjOAcjOzc3NyXCOOvhEIG8TIW8S+ElVAm8RyM+EgMoAz4RAzgH6AvQAcc8LaV4gyPhEbxXPCx/OWcjOAcjOzc3NyfhEbxTi+wAXEhABCOMA8gARACjtRNDT/9M/MfhDWMjL/8s/zsntVAAi+ERwb3KAQG90+GT4S/hM+EoDNjD4RvLgTPhCbuMAIZPU0dDe+kDR2zww2zzyABcVFAA6+Ez4S/hK+EP4QsjL/8s/z4POWcjOAcjOzc3J7VQBMoj4SfhKxwXy6GXIz4UIzoBvz0DJgQCg+wAWACZNZXRob2QgZm9yIE5GVCBvbmx5AELtRNDT/9M/0wAx+kDU0dD6QNTR0PpA0fhs+Gv4avhj+GIACvhG8uBMAgr0pCD0oRsaABRzb2wgMC41OC4yAAAADCD4Ye0e2Q=="
INDEX_BASIS_CODE="te6ccgECFAEAAmQABCSK7VMg4wMgwP/jAiDA/uMC8gsRAgETA4rtRNDXScMB+GaJ+Gkh2zzTAAGfgQIA1xgg+QFY+EL5EPKo3tM/AfhDIbnytCD4I4ED6KiCCBt3QKC58rT4Y9MfAds88jwKBwMDeu1E0NdJwwH4ZiLQ0wP6QDD4aak4APhEf29xggiYloBvcm1vc3BvdPhk3CHHAOMCIdcNH/K8IeMDAds88jwQEAMDOiCCC6Ot17rjAiCCEGi1Xz+64wIgghBswcwMuuMCCwYEA+Iw+Eby4Ez4Qm7jANMf+ERYb3X4ZNHbPCGOHSPQ0wH6QDAxyM+HIM5xzwthAcjPk7MHMDLOzclwjjH4RCBvEyFvEvhJVQJvEcjPhIDKAM+EQM4B+gL0AHHPC2kByPhEbxXPCx/Ozcn4RG8U4vsA4wDyAA8FDAAa+ERwb3KAQG90+GT4SgM2MPhCbuMA+Ebyc9GI+En4SscF8uhl+ADbPPIABw4MAhbtRNDXScIBjoDjDQgPAT5w7UTQ9AVxIYBA9A6OgN/4aoBA9A7yvdcL//hicPhjCQECiQoAQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABADNjD4RvLgTPhCbuMAIZPU0dDe+kDR2zww2zzyAA8NDAAi+Er4Q/hCyMv/yz/Pg87J7VQBNoj4SfhKxwXy6GX4AMjPhQjOgG/PQMmBAKD7AA4ANE1ldGhvZCBmb3IgY29sbGVjdGlvbiBvbmx5ACbtRNDT/9M/0wAx+kDR+Gr4Y/hiAAr4RvLgTAIK9KQg9KETEgAUc29sIDAuNTguMgAA"

JSON='{\"type\":\"Basic NFT\",\"name\":\"Sample Name\",\"description\":\"Hello world!\",\"preview\":{\"source\":\"https://everscale.network/images/Backgrounds/Main/main-hero.png\",\"mimetype\":\"image/png\"},\"files\":[{\"source\":\"https://everscale.network/images/Backgrounds/Main/main-hero.png\",\"mimetype\":\"image/png\"}],\"external_url\":\"https://everscale.network\"}'
NONCE=$(date +%s)

echo "Deploying collection..."
COLLECTION_ADDRESS=$(everdev-windows contract deploy Collection.abi.json -n $NWK -s $SIGNER -v 5000000000 -d _nonce:$NONCE -i "{\"codeNft\": \"$NFT_CODE\", \"codeIndex\": \"$INDEX_CODE\", \"codeIndexBasis\": \"$INDEX_BASIS_CODE\", \"ownerPubkey\":\"$PUBKEY\", \"json\": \"$JSON\", \"mintingFee\":0}" | grep "Address:" | cut -d " " -f 4)
echo "Collection address: ${COLLECTION_ADDRESS}"