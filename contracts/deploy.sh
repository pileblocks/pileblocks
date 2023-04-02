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

everdev sol set --compiler 0.58.1 --linker 0.14.19

everdev sol compile TokenRoot.sol -i .
everdev sol compile TokenWallet.sol -i .
everdev sol compile PBGame.sol -i .
everdev sol compile GameHost.sol -i .
everdev sol compile GameIndex.sol -i .
everdev sol compile Genesis.sol -i .
everdev sol compile PlayerTest.sol -i .
everdev sol compile SaleToken.sol -i .
everdev sol compile FarmingWallet.sol -i .
everdev sol compile GameQueue.sol -i .

everdev js wrap TokenRoot.sol --output ../src/contract_wrappers/TokenRoot.js
everdev js wrap TokenWallet.sol --output ../src/contract_wrappers/TokenWallet.js
everdev js wrap PBGame.sol --output ../src/contract_wrappers/PBGame.js
everdev js wrap GameHost.sol --output ../src/contract_wrappers/GameHost.js
everdev js wrap GameIndex.sol --output ../src/contract_wrappers/GameIndex.js
everdev js wrap FarmingWallet.sol --output ../src/contract_wrappers/FarmingWallet.js

TW_CODE=$(cat ../src/contract_wrappers/TokenWallet.js | grep "code:" | cut -d "\"" -f 2)

GAME_CODE=$(cat ../src/contract_wrappers/PBGame.js | grep "code:" | cut -d "\"" -f 2)

INDEX_CODE=$(cat ../src/contract_wrappers/GameIndex.js | grep "code:" | cut -d "\"" -f 2)

FARMING_CODE=$(cat ../src/contract_wrappers/FarmingWallet.js | grep "code:" | cut -d "\"" -f 2)

NONCE=$(date +%s)
echo $GAME_CODE

COLLECTION="0:082928d28de2b521edd5554caa24c19586778462b33314766538639eaaf6e0c8"
ORACLE="0:533310eb9bf24a3289b6a0f45f704639b57dc9e1bf83bafdf67d787dbff5f3a1"

echo "Deploying genesis..."
GENESIS_ADDRESS=$(everdev contract deploy Genesis.abi.json -n $NWK -s $SIGNER -v 2400000000 -d _randomNonce:$NONCE | grep "Address:" | cut -d " " -f 4)
echo "Genesis address: ${GENESIS_ADDRESS}"

echo "Deploying the root token contract..."
ROOT_TOKEN_ADDRESS=$(everdev contract deploy TokenRoot.abi.json -n $NWK -s $SIGNER -v 2000000000 -d randomNonce_:$NONCE,deployer_:\"0:0000000000000000000000000000000000000000000000000000000000000000\",name_:"PileBlocks.com GameFi Play-to-Earn",symbol_:"PILE",decimals_:9,rootOwner_:\"$GENESIS_ADDRESS\",walletCode_:\"$TW_CODE\" -i initialSupplyTo:\"0:0000000000000000000000000000000000000000000000000000000000000000\",initialSupply:0,deployWalletValue:0,mintDisabled:false,burnByRootDisabled:false,burnPaused:false,remainingGasTo:\"0:0000000000000000000000000000000000000000000000000000000000000000\" | grep "Address:" | cut -d " " -f 4)
echo "Root token address: ${ROOT_TOKEN_ADDRESS}"

echo "Deploying Token Sale"
SALE_TOKEN_ADDRESS=$(everdev contract deploy SaleToken.abi.json -n $NWK -s $SIGNER -v 2000000000 -d _randomNonce:$NONCE -i tokenRootAddress:\"$ROOT_TOKEN_ADDRESS\" | grep "Address:" | cut -d " " -f 4)
echo "Sale token address: ${SALE_TOKEN_ADDRESS}"

echo "Deploying game host..."
GAME_HOST=$(everdev contract deploy GameHost.abi.json -n $NWK -s $SIGNER -v 3000000000 -d _randomNonce:$NONCE -i _indexCode:\"$INDEX_CODE\",_walletCode:\"$TW_CODE\",_tokenRootAddress:\"$ROOT_TOKEN_ADDRESS\" | grep "Address:" | cut -d " " -f 4)
echo "Host address: ${GAME_HOST}"

TEMP=$(everdev contract run GameHost.abi.json -a $GAME_HOST -n $NWK -s $SIGNER setGameCode -i _gameCode:\"$GAME_CODE\")
echo "Setting game code"

TEMP=$(everdev contract run GameHost.abi.json -a $GAME_HOST -n $NWK -s $SIGNER setFarmingCode -i  _farmingCode:\"$FARMING_CODE\")
echo "Farming code set"

PLAYER1_ADDRESS=$(everdev contract deploy PlayerTest.abi.json -n $NWK -s $SIGNER -v 10000000000 -d _randomNonce:$NONCE -i "{\"_rootAddress\": \"$ROOT_TOKEN_ADDRESS\", \"_genesis\": \"$GENESIS_ADDRESS\", \"_gameHost\": \"$GAME_HOST\"}" | grep "Address:" | cut -d " " -f 4)

echo "Player1 address: ${PLAYER1_ADDRESS}"

NONCE=$(date +%s)

GAMESTARTDATE=$(expr $(date +%s) + 1000)
GAMESTARTDATE=0

PLAYER2_ADDRESS=$(everdev contract deploy PlayerTest.abi.json -n $NWK -s $SIGNER -v 1000000000 -d _randomNonce:$NONCE -i "{\"_rootAddress\": \"$ROOT_TOKEN_ADDRESS\", \"_genesis\": \"$GENESIS_ADDRESS\", \"_gameHost\": \"$GAME_HOST\"}" | grep "Address:" | cut -d " " -f 4)
echo "Player2 address: ${PLAYER2_ADDRESS}"

TEMP=$(everdev contract run PlayerTest.abi.json -a $PLAYER1_ADDRESS -n $NWK -s $SIGNER deployGame -i  "{\"_renderSettings\": [2, 1, 5, 5, 16711422, 11186364, 12456217, 3093818, 1974824], \"_gameName\": \"Follow the White Rabbit 🐇\", \"_gameStartTime\": $GAMESTARTDATE}")

sleep 2

GAME_ADDRESS=$(everdev contract run-local PlayerTest.abi.json -n $NWK -s $SIGNER -a $PLAYER1_ADDRESS gameAddress | grep "gameAddress" | cut -d " " -f 10 | tr -d '"')
echo "GAME address: $GAME_ADDRESS"

#TEMP=$(everdev contract run PlayerTest.abi.json -a $PLAYER1_ADDRESS -n $NWK -s $SIGNER setGameAddress -i "{\"_gameAddress\": \"$GAME_ADDRESS\"}")
TEMP=$(everdev contract run PlayerTest.abi.json -a $PLAYER2_ADDRESS -n $NWK -s $SIGNER setGameAddress -i "{\"_gameAddress\": \"$GAME_ADDRESS\"}")
echo "Game address set for Player 2!"

TEMP=$(everdev contract run PlayerTest.abi.json -a $PLAYER1_ADDRESS -n $NWK -s $SIGNER saveImageFragment -i '{"fragmentNum":0, "tiles": [[4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 4, 4], [4, 4, 4, 4, 4, 4, 2, 4, 5, 5, 4, 1, 1, 2, 1, 1], [4, 4, 4, 5, 4, 4, 4, 4, 5, 5, 1, 1, 1, 2, 2, 2], [4, 4, 5, 5, 5, 4, 3, 5, 5, 1, 1, 1, 2, 2, 1, 1], [4, 5, 5, 5, 3, 4, 5, 5, 3, 1, 1, 1, 2, 2, 1, 5], [5, 5, 5, 5, 5, 3, 3, 3, 5, 1, 1, 2, 2, 1, 2, 5], [5, 5, 5, 5, 5, 3, 3, 3, 1, 1, 1, 2, 1, 1, 2, 4], [5, 5, 4, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5, 4]]}')
TEMP=$(everdev contract run PlayerTest.abi.json -a $PLAYER1_ADDRESS -n $NWK -s $SIGNER saveImageFragment -i '{"fragmentNum":1, "tiles": [[4, 4, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 5], [5, 5, 5, 1, 1, 1, 3, 3, 2, 1, 1, 1, 1, 4, 5, 4], [4, 4, 2, 1, 1, 1, 5, 3, 2, 2, 1, 1, 1, 3, 3, 3], [5, 4, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 3, 3, 3, 1], [4, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1], [5, 5, 5, 2, 2, 2, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1], [5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 3, 3, 1, 1, 1, 1], [4, 5, 5, 5, 5, 5, 4, 5, 2, 2, 3, 1, 1, 1, 1, 1]]}')

echo "Template provided!"

echo "everdev contract run-local PBGame.abi.json -a $GAME_ADDRESS -n $NWK -s $SIGNER template"
#_extraSettings = [farmingSpeed]
TEMP=$(everdev contract run PlayerTest.abi.json -a $PLAYER1_ADDRESS -n $NWK -s $SIGNER setGameExtraSettings -i '{"_extraSettings": [500, 100]}')
echo "Extra settings provided!"

TEMP=$(everdev contract run PlayerTest.abi.json -a $PLAYER1_ADDRESS -n $NWK -s $SIGNER setOracleAddress -i _oracleAddress:\"$ORACLE\")

echo "Oracle address set"

TEMP=$(everdev contract run PlayerTest.abi.json -a $PLAYER1_ADDRESS -n $NWK -s $SIGNER setImageForReview)

echo "The image is set for review"

echo "everdev contract run-local PBGame.abi.json -a $GAME_ADDRESS -n $NWK -s $SIGNER getInfo"

PLAYER1_WALLET=$(everdev contract run-local PlayerTest.abi.json -n $NWK -s $SIGNER -a $PLAYER1_ADDRESS walletAddress | grep "walletAddress" | cut -d " " -f 10 | tr -d '"')
echo "Player1 wallet: $PLAYER1_WALLET"


PLAYER2_WALLET=$(everdev contract run-local PlayerTest.abi.json -n $NWK -s $SIGNER -a $PLAYER2_ADDRESS walletAddress | grep "walletAddress" | cut -d " " -f 10 | tr -d '"')
echo "Player2 wallet: $PLAYER2_WALLET"

TEMP=$(everdev contract run Genesis.abi.json -n $NWK -s $SIGNER -a $GENESIS_ADDRESS mint -i "{\"tokenRoot\":\"$ROOT_TOKEN_ADDRESS\", \"amount\":100000000000000,\"recipient\":\"$GAME_HOST\"}")
echo "Added to host"

TEMP=$(everdev contract run Genesis.abi.json -n $NWK -s $SIGNER -a $GENESIS_ADDRESS mint -i "{\"tokenRoot\":\"$ROOT_TOKEN_ADDRESS\", \"amount\":100000000000000,\"recipient\":\"$SALE_TOKEN_ADDRESS\"}")
echo "Added to sales point"


TEMP=$(everdev contract run Genesis.abi.json -n $NWK -s $SIGNER -a $GENESIS_ADDRESS mint -i "{\"tokenRoot\":\"$ROOT_TOKEN_ADDRESS\", \"amount\":100000000000000,\"recipient\":\"$PLAYER1_ADDRESS\"}")
echo "Added to Player1"

TEMP=$(everdev contract run Genesis.abi.json -n $NWK -s $SIGNER -a $GENESIS_ADDRESS mint -i "{\"tokenRoot\":\"$ROOT_TOKEN_ADDRESS\", \"amount\":100000000000000,\"recipient\":\"$PLAYER2_ADDRESS\"}")
echo "Added to Player2"

GAME_QUEUE=$(everdev contract deploy GameQueue.abi.json -n $NWK -s $SIGNER -v 1000000000 -d _randomNonce:$NONCE -i "{\"_hostAddress\":\"$GAME_HOST\"}" | grep "Address:" | cut -d " " -f 4 )
echo "Added GameQueue": $GAME_QUEUE

TEMP=$(everdev contract run GameHost.abi.json -a $GAME_HOST -n $NWK -s $SIGNER setQueueAddress -i _queueAddress:\"$GAME_QUEUE\")
echo "GameHost: queue is set"

TEMP=$(everdev contract run GameQueue.abi.json -a $GAME_QUEUE -n $NWK -s $SIGNER addGame -i gameAddress:\"$GAME_ADDRESS\")
echo "GameQueue: game is added"

TEMP=$(everdev contract run GameHost.abi.json -a $GAME_HOST -n $NWK -s $SIGNER runGameInQueue)
echo "GameHost: run next game in queue"