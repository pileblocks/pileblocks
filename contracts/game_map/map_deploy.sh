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

everdev-windows sol compile MapFarm.sol
everdev-windows sol compile Profile.sol
everdev-windows sol compile GameMap.sol

PROFILE_CODE=$(everdev-windows js wrap Profile.sol -p | grep "code:" | cut -d "\"" -f 2)
MAPFARM_CODE=$(everdev-windows js wrap MapFarm.sol -p | grep "code:" | cut -d "\"" -f 2)

NONCE=$(date +%s)

echo "Deploying map..."
MAP_ADDRESS=$(everdev-windows contract deploy GameMap.abi.json -n $NWK -s $SIGNER -v 1000000000 -d _nonce:$NONCE | grep "Address:" | cut -d " " -f 4)
echo "Map address: ${MAP_ADDRESS}"
TMP=$(everdev-windows contract run GameMap.abi.json -a $MAP_ADDRESS setHostAddress -i _hostAddress:\"0:e512476d3b2e2635cc2cc55ae478b55ea57f86b8d3bdf540d5f3298e39a9c7c9\" -n $NWK -s $SIGNER -d _nonce:$NONCE)
echo "Host address set"
TMP=$(everdev-windows contract run GameMap.abi.json -a $MAP_ADDRESS setProfileCode -i _profileCode:\"$PROFILE_CODE\" -n $NWK -s $SIGNER -d _nonce:$NONCE)
TMP=$(everdev-windows contract run GameMap.abi.json -a $MAP_ADDRESS setMapFarmCode -i _mapFarmCode:\"$MAPFARM_CODE\" -n $NWK -s $SIGNER -d _nonce:$NONCE)
echo "Code uploaded"
