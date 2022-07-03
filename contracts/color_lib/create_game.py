import json
import re
import subprocess
import sys
import time

PROD_DELAY = 45
DEV_DELAY = 5
PROD_MINUS = 30
DEV_MINUS = 0

IS_PROD = True

GAME_START_TIME = 1656694800
#GAME_START_TIME = 0

# TODO: Don't forget to fix game extra settings as necessary

if IS_PROD:
    # MAIN
    PLAYER_ADDRESS = '0:f5c963371539c05b54b07f7f757ccc74908e80afc41186717d94b9e5bb2df407'
    SIGNER_NAME = 'pile_signer'
    NETWORK = 'main'
    op_delay = PROD_DELAY
    op_minus = PROD_DELAY
else:
    # SE
    PLAYER_ADDRESS = '0:90cfad298cf3ec39d64bc77efa3a1941938bf46e46fbef7717609281c4e3b1e9'
    SIGNER_NAME = 'norton'
    NETWORK = 'se'
    op_delay = DEV_DELAY
    op_minus = DEV_MINUS

game_obj = {'0': [[3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 4, 2, 1, 1], [3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 4, 4, 4, 2, 4], [3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 4, 2, 4, 5, 5, 4], [3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 2, 4, 4, 4, 5, 5], [3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 4, 2, 2, 2], [3, 3, 3, 3, 3, 5, 5, 4, 4, 2, 4, 2, 2, 2, 2, 2], [3, 3, 3, 3, 3, 5, 5, 4, 4, 2, 2, 4, 2, 2, 2, 2], [3, 3, 3, 3, 5, 5, 5, 4, 4, 2, 4, 4, 4, 3, 2, 2]], '1': [[3, 3, 3, 3, 5, 5, 5, 4, 4, 4, 4, 4, 4, 2, 2, 2], [3, 3, 3, 3, 5, 5, 5, 4, 5, 5, 5, 4, 4, 4, 5, 5], [3, 3, 3, 4, 5, 5, 4, 5, 5, 5, 4, 4, 5, 5, 4, 4], [3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 4, 4, 2], [3, 3, 3, 5, 5, 5, 5, 5, 5, 4, 4, 5, 5, 4, 5, 3], [3, 3, 3, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 2, 4, 4], [3, 3, 3, 5, 5, 5, 5, 5, 5, 4, 4, 2, 2, 1, 1, 1], [3, 3, 3, 5, 4, 5, 5, 5, 5, 5, 4, 4, 2, 2, 1, 1]], '2': [[3, 3, 3, 4, 5, 4, 5, 5, 5, 5, 5, 4, 2, 2, 1, 1], [3, 3, 3, 2, 2, 5, 5, 5, 5, 5, 5, 5, 4, 3, 2, 2], [3, 3, 3, 2, 1, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 2], [3, 3, 3, 5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 4, 3, 2], [3, 3, 3, 5, 4, 2, 5, 5, 5, 5, 5, 5, 4, 4, 2, 2], [3, 3, 3, 3, 5, 2, 1, 5, 5, 5, 5, 5, 5, 4, 4, 2], [3, 3, 3, 3, 3, 5, 2, 1, 5, 5, 5, 5, 5, 4, 4, 4], [3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4]], '3': [[3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4], [3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], [3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5], [3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5], [3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5], [3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5], [3, 3, 3, 3, 3, 3, 3, 5, 4, 5, 5, 5, 5, 5, 5, 5], [3, 3, 3, 3, 3, 5, 5, 5, 5, 4, 5, 4, 5, 5, 5, 5]], '4': [[1, 2, 1, 2, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], [4, 2, 4, 4, 1, 1, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5], [5, 4, 5, 4, 5, 4, 2, 1, 4, 5, 5, 5, 5, 5, 5, 5], [4, 5, 4, 5, 5, 5, 5, 2, 4, 5, 5, 5, 5, 5, 5, 5], [1, 1, 1, 1, 1, 1, 5, 5, 4, 5, 5, 5, 5, 5, 5, 5], [1, 1, 1, 1, 1, 1, 1, 2, 5, 5, 5, 5, 5, 5, 5, 5], [1, 1, 1, 1, 1, 1, 1, 2, 2, 5, 5, 5, 5, 5, 5, 5], [2, 2, 1, 1, 1, 1, 1, 1, 2, 4, 5, 5, 5, 5, 5, 5]], '5': [[2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 5, 5, 5, 5, 5, 5], [5, 5, 4, 1, 1, 1, 1, 1, 1, 2, 3, 5, 5, 5, 5, 5], [5, 5, 5, 4, 2, 1, 2, 4, 5, 4, 4, 5, 5, 5, 5, 5], [1, 2, 4, 5, 2, 1, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5], [3, 3, 4, 5, 4, 1, 5, 3, 3, 3, 4, 4, 5, 5, 5, 5], [2, 1, 1, 2, 4, 1, 4, 5, 3, 3, 4, 5, 5, 5, 5, 5], [1, 1, 1, 2, 3, 2, 1, 5, 5, 5, 4, 5, 5, 5, 5, 5], [1, 1, 1, 2, 2, 4, 1, 1, 1, 2, 4, 5, 5, 5, 5, 5]], '6': [[1, 1, 1, 4, 5, 5, 3, 4, 1, 1, 1, 5, 5, 5, 5, 5], [1, 2, 2, 5, 5, 5, 5, 5, 1, 1, 2, 5, 5, 5, 5, 5], [1, 2, 2, 2, 2, 2, 2, 4, 2, 1, 2, 5, 5, 5, 5, 5], [2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 2, 5, 5, 5, 5, 5], [2, 5, 5, 5, 4, 5, 4, 2, 2, 2, 2, 5, 5, 5, 5, 5], [2, 2, 2, 1, 1, 1, 1, 2, 4, 2, 2, 5, 5, 5, 5, 5], [4, 4, 2, 2, 1, 2, 2, 1, 2, 2, 2, 5, 5, 5, 5, 5], [4, 4, 2, 2, 2, 1, 1, 1, 2, 2, 2, 5, 5, 5, 5, 5]], '7': [[5, 4, 4, 2, 2, 1, 2, 2, 2, 4, 4, 5, 5, 5, 5, 5], [5, 5, 4, 4, 4, 4, 2, 2, 3, 4, 4, 5, 5, 5, 5, 5], [5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5], [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], [5, 5, 5, 5, 5, 5, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5]]}

game_settings = {"_renderSettings": [4, 2, 1, 5, 16711422, 11186364, 12456217, 3093818, 1974824],
                 "_gameName": "The Homelander", "_gameStartTime": GAME_START_TIME}


def find_address(field, text):
    m = re.search("{0}\"\:\s\"([^\"]*)\"".format(field), str(text))
    if m:
        return m.group(1)


subprocess.call(
    ['C:/Users/home/AppData/Roaming/npm/tondev', 'contract', 'run', '../PlayerTest.abi.json', '-a', PLAYER_ADDRESS,
     '-s', SIGNER_NAME, '-n', NETWORK, 'deployGame', '-i', json.dumps(game_settings)], shell=True)

time.sleep(op_delay)

out = subprocess.run(
    ['C:/Users/home/AppData/Roaming/npm/tondev', 'contract', 'run-local', '../PlayerTest.abi.json', '-a',
     PLAYER_ADDRESS,
     '-s', SIGNER_NAME, '-n', NETWORK, 'gameAddress'], shell=True, stdout=subprocess.PIPE)

GAME_ADDRESS = find_address('gameAddress', out.stdout)
print("GAME ADDRESS: {}".format(GAME_ADDRESS))

for i in game_obj:
    print(json.dumps({"fragmentNum": int(i), "tiles": game_obj[i]}))

    subprocess.call(
        ['C:/Users/home/AppData/Roaming/npm/tondev', 'contract', 'run', '../PlayerTest.abi.json', '-a', PLAYER_ADDRESS,
         '-s', SIGNER_NAME, '-n', NETWORK, 'saveImageFragment', '-i',
         json.dumps({"fragmentNum": int(i), "tiles": game_obj[i]})], shell=True)
    time.sleep(op_delay - op_minus)

subprocess.call(
    ['C:/Users/home/AppData/Roaming/npm/tondev', 'contract', 'run', '../PlayerTest.abi.json', '-a', PLAYER_ADDRESS,
     '-s', SIGNER_NAME, '-n', NETWORK, 'setGameExtraSettings', '-i',
     '{"_extraSettings": [10, 100, 0]}'], shell=True)

time.sleep(op_delay - op_minus)

subprocess.call(
    ['C:/Users/home/AppData/Roaming/npm/tondev', 'contract', 'run', '../PlayerTest.abi.json', '-a', PLAYER_ADDRESS,
     '-s', SIGNER_NAME, '-n', NETWORK, 'setImageForReview'], shell=True)

print("tondev contract run-local PBGame.abi.json -a {game} -n {nwk} getInfo".format(game=GAME_ADDRESS, nwk=NETWORK))
