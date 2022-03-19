#!/usr/bin/env bash

NWK=dev

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
tondev sol compile Genesis.sol
tondev sol compile PlayerTest.sol
tondev sol compile SaleToken.sol

tondev js wrap TokenRoot.sol --output ../src/contract_wrappers/TokenRoot.js
tondev js wrap TokenWallet.sol --output ../src/contract_wrappers/TokenWallet.js
tondev js wrap PBGame.sol --output ../src/contract_wrappers/PBGame.js
tondev js wrap GameHost.sol --output ../src/contract_wrappers/GameHost.js
tondev js wrap GameIndex.sol --output ../src/contract_wrappers/GameIndex.js

TW_CODE=$(tonos-cli decode stateinit --tvc TokenWallet.tvc | tail -n +5 | ../node_modules/node-jq/bin/jq -r .code)

GAME_CODE=$(tonos-cli decode stateinit --tvc PBGame.tvc | tail -n +5 | ../node_modules/node-jq/bin/jq -r .code)

INDEX_CODE=$(tonos-cli decode stateinit --tvc GameIndex.tvc | tail -n +5 | ../node_modules/node-jq/bin/jq -r .code)

NONCE=$(date +%s)
#echo $GAME_CODE

echo "Deploying genesis..."
GENESIS_ADDRESS=$(tondev contract deploy Genesis.abi.json -n $NWK -s $SIGNER -v 4000000000 -d _randomNonce:$NONCE | grep "Address:" | cut -d " " -f 4)
echo "Genesis address: ${GENESIS_ADDRESS}"

echo "Deploying the root token contract..."
ROOT_TOKEN_ADDRESS=$(tondev contract deploy TokenRoot.abi.json -n $NWK -s $SIGNER -v 2000000000 -d randomNonce_:$NONCE,deployer_:\"0:0000000000000000000000000000000000000000000000000000000000000000\",name_:"50696c65426c6f636b732e636f6d2047616d65466920506c61792d746f2d4561726e",symbol_:"50494c45",decimals_:9,rootOwner_:\"$GENESIS_ADDRESS\",walletCode_:\"$TW_CODE\" -i initialSupplyTo:\"0:0000000000000000000000000000000000000000000000000000000000000000\",initialSupply:0,deployWalletValue:0,mintDisabled:false,burnByRootDisabled:false,burnPaused:false,remainingGasTo:\"0:0000000000000000000000000000000000000000000000000000000000000000\" | grep "Address:" | cut -d " " -f 4)
echo "Root token address: ${ROOT_TOKEN_ADDRESS}"

echo "Deploying Token Sale"
SALE_TOKEN_ADDRESS=$(tondev contract deploy SaleToken.abi.json -n $NWK -s $SIGNER -v 2000000000 -d _randomNonce:$NONCE -i tokenRootAddress:\"$ROOT_TOKEN_ADDRESS\" | grep "Address:" | cut -d " " -f 4)
echo "Sale token address: ${SALE_TOKEN_ADDRESS}"

echo "Deploying game host..."
GAME_HOST=$(tondev contract deploy GameHost.abi.json -n $NWK -s $SIGNER -v 3000000000 -d _randomNonce:$NONCE -i _indexCode:\"$INDEX_CODE\",_gameCode:\"$GAME_CODE\",_walletCode:\"$TW_CODE\",_tokenRootAddress:\"$ROOT_TOKEN_ADDRESS\" | grep "Address:" | cut -d " " -f 4)
echo "Host address: ${GAME_HOST}"

PLAYER1_ADDRESS=$(tondev contract deploy PlayerTest.abi.json -n $NWK -s $SIGNER -v 10000000000 -d _randomNonce:$NONCE -i "{\"_rootAddress\": \"$ROOT_TOKEN_ADDRESS\", \"_genesis\": \"$GENESIS_ADDRESS\", \"_gameHost\": \"$GAME_HOST\"}" | grep "Address:" | cut -d " " -f 4)

echo "Player1 address: ${PLAYER1_ADDRESS}"

NONCE=$(date +%s)

PLAYER2_ADDRESS=$(tondev contract deploy PlayerTest.abi.json -n $NWK -s $SIGNER -v 1000000000 -d _randomNonce:$NONCE -i "{\"_rootAddress\": \"$ROOT_TOKEN_ADDRESS\", \"_genesis\": \"$GENESIS_ADDRESS\", \"_gameHost\": \"$GAME_HOST\"}" | grep "Address:" | cut -d " " -f 4)

echo "Player2 address: ${PLAYER2_ADDRESS}"

TEMP=$(tondev contract run PlayerTest.abi.json -a $PLAYER1_ADDRESS -n $NWK -s $SIGNER deployGame -i '{"_renderSettings": [1, 2, 25, 5, 16711422, 11186364, 12456217, 3093818, 1974824], "_gameName": "Follow the White Rabbit 🐇"}')

GAME_ADDRESS=$(tondev contract run-local PlayerTest.abi.json -n $NWK -s $SIGNER -a $PLAYER1_ADDRESS gameAddress | grep "gameAddress" | cut -d " " -f 10 | tr -d '"')
echo "GAME address: $GAME_ADDRESS"

#TEMP=$(tondev contract run PlayerTest.abi.json -a $PLAYER1_ADDRESS -n $NWK -s $SIGNER setGameAddress -i "{\"_gameAddress\": \"$GAME_ADDRESS\"}")
#TEMP=$(tondev contract run PlayerTest.abi.json -a $PLAYER2_ADDRESS -n $NWK -s $SIGNER setGameAddress -i "{\"_gameAddress\": \"$GAME_ADDRESS\"}")
#echo "Game address set!"

TEMP=$(tondev contract run PlayerTest.abi.json -a $PLAYER1_ADDRESS -n $NWK -s $SIGNER saveImageFragment -i '{"fragmentNum":0, "tiles": [[4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 4, 4], [4, 4, 4, 4, 4, 4, 2, 4, 5, 5, 4, 1, 1, 2, 1, 1], [4, 4, 4, 5, 4, 4, 4, 4, 5, 5, 1, 1, 1, 2, 2, 2], [4, 4, 5, 5, 5, 4, 3, 5, 5, 1, 1, 1, 2, 2, 1, 1], [4, 5, 5, 5, 3, 4, 5, 5, 3, 1, 1, 1, 2, 2, 1, 5], [5, 5, 5, 5, 5, 3, 3, 3, 5, 1, 1, 2, 2, 1, 2, 5], [5, 5, 5, 5, 5, 3, 3, 3, 1, 1, 1, 2, 1, 1, 2, 4], [5, 5, 4, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5, 4]]}')
TEMP=$(tondev contract run PlayerTest.abi.json -a $PLAYER1_ADDRESS -n $NWK -s $SIGNER saveImageFragment -i '{"fragmentNum":1, "tiles": [[4, 4, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 5], [5, 5, 5, 1, 1, 1, 3, 3, 2, 1, 1, 1, 1, 4, 5, 4], [4, 4, 2, 1, 1, 1, 5, 3, 2, 2, 1, 1, 1, 3, 3, 3], [5, 4, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 3, 3, 3, 1], [4, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1], [5, 5, 5, 2, 2, 2, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1], [5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 3, 3, 1, 1, 1, 1], [4, 5, 5, 5, 5, 5, 4, 5, 2, 2, 3, 1, 1, 1, 1, 1]]}')

echo "Template provided!"

echo "tondev contract run-local PBGame.abi.json -a $GAME_ADDRESS -n $NWK -s $SIGNER template"

TEMP=$(tondev contract run PlayerTest.abi.json -a $PLAYER1_ADDRESS -n $NWK -s $SIGNER setImageForReview)

echo "The image is set for review"

echo "tondev contract run-local PBGame.abi.json -a $GAME_ADDRESS -n $NWK -s $SIGNER getInfo"

TEMP=$(tondev contract run GameHost.abi.json -n $NWK -s $SIGNER -a $GAME_HOST activateGame -i "{\"gameAddress\": \"$GAME_ADDRESS\"}")

echo "The game is active!"

PLAYER1_WALLET=$(tondev contract run-local PlayerTest.abi.json -n $NWK -s $SIGNER -a $PLAYER1_ADDRESS walletAddress | grep "walletAddress" | cut -d " " -f 10 | tr -d '"')
echo "Player1 wallet: $PLAYER1_WALLET"
PLAYER2_WALLET=$(tondev contract run-local PlayerTest.abi.json -n $NWK -s $SIGNER -a $PLAYER2_ADDRESS walletAddress | grep "walletAddress" | cut -d " " -f 10 | tr -d '"')
echo "Player2 wallet: $PLAYER2_WALLET"

TEMP=$(tondev contract run Genesis.abi.json -n $NWK -s $SIGNER -a $GENESIS_ADDRESS mint -i "{\"tokenRoot\":\"$ROOT_TOKEN_ADDRESS\", \"amount\":100000000000000,\"recipient\":\"$GAME_HOST\"}")

echo "Added to host"

TEMP=$(tondev contract run Genesis.abi.json -n $NWK -s $SIGNER -a $GENESIS_ADDRESS mint -i "{\"tokenRoot\":\"$ROOT_TOKEN_ADDRESS\", \"amount\":100000000000000,\"recipient\":\"$SALE_TOKEN_ADDRESS\"}")

echo "Added to sales point"


TEMP=$(tondev contract run Genesis.abi.json -n $NWK -s $SIGNER -a $GENESIS_ADDRESS mint -i "{\"tokenRoot\":\"$ROOT_TOKEN_ADDRESS\", \"amount\":1000000000000,\"recipient\":\"$PLAYER1_ADDRESS\"}")

echo "Added to Player1"

TEMP=$(tondev contract run Genesis.abi.json -n $NWK -s $SIGNER -a $GENESIS_ADDRESS mint -i "{\"tokenRoot\":\"$ROOT_TOKEN_ADDRESS\", \"amount\":1000000000000,\"recipient\":\"$PLAYER2_ADDRESS\"}")

echo "Added to Player2"
