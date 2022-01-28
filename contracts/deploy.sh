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

tondev sol set --compiler 0.55.0 --linker 0.14.19

tondev sol compile RootTokenContract.sol
tondev sol compile PBWallet.sol
tondev sol compile PBGame.sol

TW_CODE=$(tonos-cli decode stateinit --tvc PBWallet.tvc | tail -n +5 | ../node_modules/node-jq/bin/jq -r .code)

NONCE=$(date +%s)
echo $TW_CODE

echo "Deploying the root token contract..."
ROOT_TOKEN_ADDRESS=$(tondev contract deploy RootTokenContract.abi.json -n $NWK -s $SIGNER -v 1000000000 -d _randomNonce:$NONCE,name:"576562206d756c7469736967204669646f736166652e636f6d",symbol:"4649444f",decimals:9,wallet_code:\"$TW_CODE\" -i root_public_key_:$PUBKEY,root_owner_address_:\"0:0000000000000000000000000000000000000000000000000000000000000000\" | grep "Address:" | cut -d " " -f 4)
echo "Root token address: ${ROOT_TOKEN_ADDRESS}"

echo "Deploying the game contract..."
GAME_ADDRESS=$(tondev contract deploy PBGame.abi.json -n $NWK -s $SIGNER -v 1000000000 -d walletCode:\"$TW_CODE\",tokenRootAddress:\"$ROOT_TOKEN_ADDRESS\",gameId:$NONCE -i '{"tmp": [[1,2,3],[4,5,4],[1,2,1]]}' | grep "Address:" | cut -d " " -f 4)
echo "Game address: ${GAME_ADDRESS}"