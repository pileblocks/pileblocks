tondev sol set --compiler 0.47.0 --linker 0.13.73

tondev sol compile ADebot.sol

ICON_BYTES=$(base64 -w 0 logo.png)
ICON=$(echo -n "data:image/png;base64,$ICON_BYTES" | xxd -ps -c 20000)
DEBOT_ABI=$(cat ADebot.abi.json | xxd -ps -c 20000)

tondev contract deploy ADebot.abi.json -v 1000000000
DEBOT_ADDRESS=$(tondev contract info ADebot -n se | grep "Address:" | cut -d " " -f 4)
tondev contract run ADebot.abi.json --address $DEBOT_ADDRESS setABI -i "{\"dabi\":\"$DEBOT_ABI\"}"
tondev contract run ADebot.abi.json --address $DEBOT_ADDRESS setIcon -i "{\"icon\":\"$ICON\"}"