import json
import re
import subprocess
import sys
import time

# MAIN
PLAYER_ADDRESS = '0:f5c963371539c05b54b07f7f757ccc74908e80afc41186717d94b9e5bb2df407'
SIGNER_NAME = 'pile_signer'
NETWORK = 'main'

# SE
#PLAYER_ADDRESS = '0:5e4e7b03c0878e90afb2fa877fc6f16093f164169b4fb6e32ee6e44c4f01281b'
#SIGNER_NAME = 'norton'
#NETWORK = 'se'

GAME_START_TIME = 1655568000

game_obj = {'0': [[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
                  [3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], [5, 3, 3, 3, 5, 5, 3, 3, 3, 3, 3, 3, 3, 5, 3, 5],
                  [5, 3, 3, 3, 5, 5, 3, 3, 3, 3, 3, 3, 3, 5, 3, 5], [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 5, 3, 3, 3],
                  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 3], [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 5]],
            '1': [[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 5], [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 5],
                  [1, 5, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5], [1, 5, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 1, 5, 2, 5],
                  [1, 5, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 1, 5, 2, 5], [1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 5, 5, 5],
                  [1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 3, 3, 3, 5, 2, 5], [1, 1, 2, 2, 5, 1, 1, 1, 1, 1, 2, 2, 5, 5, 2, 5]],
            '2': [[1, 1, 2, 2, 5, 1, 1, 1, 1, 1, 2, 2, 5, 5, 2, 5], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 2, 5],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 2, 5], [1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 5, 2, 5],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 2, 5], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 2, 5],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 2, 5], [1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 1, 1, 1, 5, 2, 5]],
            '3': [[5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 2, 2, 2], [5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 2, 2, 2],
                  [5, 1, 1, 1, 5, 1, 1, 1, 1, 1, 5, 5, 2, 2, 2, 2], [5, 1, 1, 1, 1, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 2],
                  [5, 1, 1, 1, 1, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [5, 1, 1, 1, 1, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                  [5, 1, 1, 1, 1, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [5, 1, 1, 1, 1, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]],

            '4': [[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
                   [3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3], [3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 3, 3, 5, 5, 5, 3],
                   [3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 3, 3, 5, 5, 5, 3], [5, 5, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3],
                   [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3], [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]],
            '5': [[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                   [4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 5, 4, 4, 5, 5], [4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 5, 4, 4, 5, 5],
                   [4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 5, 4, 4, 5, 5], [4, 4, 4, 4, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5],
                   [3, 3, 3, 4, 4, 4, 4, 3, 3, 3, 3, 4, 4, 4, 5, 5], [5, 5, 1, 4, 4, 4, 4, 4, 5, 5, 1, 4, 4, 4, 4, 5]],
            '6': [[5, 5, 5, 4, 4, 4, 4, 4, 5, 5, 5, 4, 4, 4, 4, 5], [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
                   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 2], [4, 4, 4, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 2, 5],
                   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 2], [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 2],
                   [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 1], [4, 4, 4, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 5, 1]],
            '7': [[5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 1, 1], [5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 1, 1],
                   [2, 2, 5, 4, 4, 4, 4, 4, 5, 5, 4, 4, 5, 5, 1, 1], [2, 2, 2, 5, 5, 5, 5, 5, 4, 4, 4, 4, 5, 5, 1, 1],
                   [2, 2, 2, 2, 2, 2, 2, 5, 4, 4, 4, 4, 5, 5, 1, 1], [2, 2, 2, 2, 2, 2, 2, 5, 4, 4, 4, 4, 5, 5, 1, 1],
                   [2, 2, 2, 2, 2, 2, 2, 5, 4, 4, 4, 4, 5, 5, 1, 1], [2, 2, 2, 2, 2, 2, 2, 5, 4, 4, 4, 4, 5, 5, 1, 1]]

            }

game_settings = {"_renderSettings": [2, 4, 25, 5, 16711422, 11186364, 12456217, 3093818, 1974824],
                 "_gameName": "Punkus Infernus", "_gameStartTime": GAME_START_TIME}


def find_address(field, text):
    m = re.search("{0}\"\:\s\"([^\"]*)\"".format(field), str(text))
    if m:
        return m.group(1)


subprocess.call(
    ['C:/Users/home/AppData/Roaming/npm/tondev', 'contract', 'run', '../PlayerTest.abi.json', '-a', PLAYER_ADDRESS,
     '-s', SIGNER_NAME, '-n', NETWORK, 'deployGame', '-i', json.dumps(game_settings)], shell=True)

time.sleep(25)

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
    time.sleep(5)

subprocess.call(
    ['C:/Users/home/AppData/Roaming/npm/tondev', 'contract', 'run', '../PlayerTest.abi.json', '-a', PLAYER_ADDRESS,
     '-s', SIGNER_NAME, '-n', NETWORK, 'setGameExtraSettings', '-i',
     '{"_extraSettings": [10, 100, 100]}'], shell=True)

time.sleep(5)

subprocess.call(
    ['C:/Users/home/AppData/Roaming/npm/tondev', 'contract', 'run', '../PlayerTest.abi.json', '-a', PLAYER_ADDRESS,
     '-s', SIGNER_NAME, '-n', NETWORK, 'setImageForReview'], shell=True)

print("tondev contract run-local PBGame.abi.json -a {game} -n {nwk} getInfo".format(game=GAME_ADDRESS, nwk=NETWORK))
