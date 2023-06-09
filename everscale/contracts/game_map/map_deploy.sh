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

everdev sol compile MapFarm.sol
everdev sol compile Profile.sol
everdev sol compile GameMap.sol

PROFILE_CODE=$(everdev js wrap Profile.sol -p | grep "code:" | cut -d "\"" -f 2)
MAPFARM_CODE=$(everdev js wrap MapFarm.sol -p | grep "code:" | cut -d "\"" -f 2)

NONCE=$(date +%s)

echo "Deploying map..."
MAP_ADDRESS=$(everdev contract deploy GameMap.abi.json -n $NWK -s $SIGNER -v 1000000000 -d _nonce:$NONCE | grep "Address:" | cut -d " " -f 4)
echo "Map address: ${MAP_ADDRESS}"
TMP=$(everdev contract run GameMap.abi.json -a $MAP_ADDRESS setHostAddress -i _hostAddress:\"0:e512476d3b2e2635cc2cc55ae478b55ea57f86b8d3bdf540d5f3298e39a9c7c9\" -n $NWK -s $SIGNER -d _nonce:$NONCE)
echo "Host address set"
TMP=$(everdev contract run GameMap.abi.json -a $MAP_ADDRESS setProfileCode -i _profileCode:\"$PROFILE_CODE\" -n $NWK -s $SIGNER -d _nonce:$NONCE)
TMP=$(everdev contract run GameMap.abi.json -a $MAP_ADDRESS setMapFarmCode -i _mapFarmCode:\"$MAPFARM_CODE\" -n $NWK -s $SIGNER -d _nonce:$NONCE)
echo "Code uploaded"

TMP=$(everdev contract run GameMap.abi.json -a $MAP_ADDRESS setStartGameId -i _gameId:1 -n $NWK -s $SIGNER -d _nonce:$NONCE)
echo "Game ID uploaded"

TMP=$(everdev contract run GameMap.abi.json -a $MAP_ADDRESS setMinerals -i _minerals:[0,2,1] -n $NWK -s $SIGNER -d _nonce:$NONCE)
echo "Minerals uploaded"
