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
    SIGNER=prod_signer
    PUBKEY=0xfd4f7a9caa84e540dd0879b49f391eab9d77444821ec3029b5beeaa89959a638
fi

tondev sol set --compiler 0.57.0 --linker 0.14.19

tondev sol compile TokenRoot.sol
tondev sol compile TokenWallet.sol
tondev sol compile PBGame.sol
tondev sol compile GameHost.sol
tondev sol compile GameIndex.sol

TW_CODE=$(tonos-cli decode stateinit --tvc TokenWallet.tvc | tail -n +5 | ../node_modules/node-jq/bin/jq -r .code)

GAME_CODE=$(tonos-cli decode stateinit --tvc PBGame.tvc | tail -n +5 | ../node_modules/node-jq/bin/jq -r .code)

INDEX_CODE=$(tonos-cli decode stateinit --tvc GameIndex.tvc | tail -n +5 | ../node_modules/node-jq/bin/jq -r .code)

NONCE=$(date +%s)
#echo $GAME_CODE

echo "Deploying the root token contract..."

ROOT_TOKEN_ADDRESS=$(tondev contract deploy TokenRoot.abi.json -n $NWK -s $SIGNER -v 2000000000 -d randomNonce_:$NONCE,deployer_:\"0:0000000000000000000000000000000000000000000000000000000000000000\",name_:"576562206d756c7469736967204669646f736166652e636f6d",symbol_:"4649444f",decimals_:9,rootOwner_:\"0:0000000000000000000000000000000000000000000000000000000000000000\",walletCode_:\"$TW_CODE\" -i initialSupplyTo:\"0:0000000000000000000000000000000000000000000000000000000000000000\",initialSupply:0,deployWalletValue:0,mintDisabled:false,burnByRootDisabled:false,burnPaused:false,remainingGasTo:\"0:0000000000000000000000000000000000000000000000000000000000000000\" | grep "Address:" | cut -d " " -f 4)
echo "Root token address: ${ROOT_TOKEN_ADDRESS}"

echo "Deploying game host..."
GAME_HOST=$(tondev contract deploy GameHost.abi.json -n $NWK -s $SIGNER -v 3000000000 -d _randomNonce:$NONCE -i _indexCode:\"$INDEX_CODE\",_gameCode:\"$GAME_CODE\",_walletCode:\"$TW_CODE\",_tokenRootAddress:\"$ROOT_TOKEN_ADDRESS\" | grep "Address:" | cut -d " " -f 4)
echo "Game host address: ${GAME_HOST}"

GAME_ADDRESS=$(tondev contract run GameHost.abi.json deployGame -a $GAME_HOST -n $NWK -s $SIGNER -i '{"imageOwner": "0:0000000000000000000000000000000000000000000000000000000000000000", "_renderSettings": [1, 1, 30, 5, 16711422, 11186364, 6318459, 3093818, 1974824]}' | grep "value0" | cut -d " " -f 10)

echo "Game address: ${GAME_ADDRESS}"