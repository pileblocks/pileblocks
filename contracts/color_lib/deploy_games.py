import json
import re
import subprocess
import sys
import time

PROD_DELAY = 5
PROD_MINUS = 1

DEV_DELAY = 5
DEV_MINUS = 1


MAX_FIELDS = 16

# GAME CONFIG

ROWS = 4
COLUMNS = 2
ENV = 'main'
# dev se main

if ENV == 'main':
    # MAIN
    PLAYER_ADDRESS = '0:cc2802e7ecbe35201727a749692483b1ef9ddd358b58491fcb0aa479b92664e8'
    QUEUE = '0:37e101ec10914625d9377285dc4cca01c9da2d736169a8abb778435be21eccbd'
    ORACLE = "0:e1f5f16fc3828fe0e3aa1c2de912ed6333cef3940ccd4334a1e47426687857ef"
    SIGNER_NAME = 'pile_signer'
    NETWORK = 'main'
    op_delay = PROD_DELAY
    op_minus = PROD_DELAY

elif ENV == 'se':
    # SE
    PLAYER_ADDRESS = '0:09dd32678654fbb4aae11995199f714ccae5cf8493adfc3a1f5835e07c65bb3b'
    QUEUE = '0:6612675859adcfb2bc4c244f4d114cae8e8f742a68b6f5c30199d1c203c29948'
    ORACLE = "0:533310eb9bf24a3289b6a0f45f704639b57dc9e1bf83bafdf67d787dbff5f3a1"
    NETWORK = 'se'
    SIGNER_NAME = 'norton'
    op_delay = DEV_DELAY
    op_minus = DEV_MINUS

elif ENV == 'dev':
    # DEV
    PLAYER_ADDRESS = '0:09abcc263db0683a688394e36cf7987f9000a5508d7ed69e20f1dd8dd1717141'
    QUEUE = '0:b51b3cdc14e0045fd7534dac25063c4d27fcb85edb3632ce083db9c7997f995d'
    ORACLE = "0:0"
    SIGNER_NAME = 'norton'
    NETWORK = 'dev'
    op_delay = DEV_DELAY
    op_minus = DEV_MINUS
    #everdev contract run GameHost.abi.json -a 0:346c0d2bb427c72182ec887f9770bdefae7e9a3878fe188278067cecf4d56d19 -n dev

else:
    sys.exit()

def filter_gen():
    counter = 0
    n = 0
    while True:
        if 0 <= counter < 4:
            yield True
        if 4 <= counter < 8:
            yield False
        if counter == 8:
            counter = 0
            continue
        n += 1
        counter += 1

def find_address(field, text):
    m = re.search("{0}\"\:\s\"([^\"]*)\"".format(field), str(text))
    if m:
        return m.group(1)

RUN_COMMAND = ['C:/Users/home/AppData/Roaming/npm/everdev', 'contract', 'run', '../PlayerTest.abi.json', '-a', PLAYER_ADDRESS, '-s', SIGNER_NAME, '-n', NETWORK]
RUN_COMMAND_QUEUE = ['C:/Users/home/AppData/Roaming/npm/everdev', 'contract', 'run', '../GameQueue.abi.json', '-a', QUEUE, '-s', SIGNER_NAME, '-n', NETWORK]
RUN_LOCAL_COMMAND = ['C:/Users/home/AppData/Roaming/npm/everdev', 'contract', 'run-local', '../PlayerTest.abi.json', '-a', PLAYER_ADDRESS, '-s', SIGNER_NAME, '-n', NETWORK,]

del_filter = filter_gen()
filtered_values = [i for i in range(MAX_FIELDS) if next(del_filter)]

f = open("games.json", 'r')

games = json.loads(f.read())

GAME_START_TIMES = [1680706800, 0, 0, 0,
                    1680793200, 0, 0, 0,
                    1680879600, 0, 0, 0,
                    1680966000, 0, 0, 0]

for idx, game in enumerate(games):

    #game_obj = {"0":[["1","5","4","3","3","4","5","5","4","3","3","3","2","2","2","3"],["2","5","4","3","3","3","4","4","3","3","3","3","2","2","2","3"],["3","5","4","3","3","3","3","3","3","3","3","3","1","2","3","3"],["3","5","4","3","3","3","3","3","3","3","3","3","1","2","3","3"],["4","5","4","3","3","3","3","3","3","3","3","3","1","2","3","3"],["4","5","4","3","3","3","3","3","3","3","3","3","2","3","3","3"],["4","5","4","3","3","3","3","3","3","3","3","3","3","3","3","3"],["4","5","3","3","3","3","3","3","3","3","3","3","3","3","3","3"]],"1":[["4","5","3","3","3","3","3","3","3","3","3","3","3","3","3","3"],["5","4","3","3","3","3","3","3","2","3","3","3","3","3","3","3"],["5","4","3","3","3","3","3","2","2","3","3","3","3","3","4","3"],["5","3","3","3","3","4","3","2","2","2","3","3","3","3","4","4"],["5","3","3","3","4","5","2","2","2","2","2","3","3","3","4","4"],["4","3","3","4","5","4","2","2","2","2","2","2","3","3","3","2"],["3","3","4","4","5","2","2","2","2","2","2","2","2","2","2","2"],["3","4","4","5","4","2","2","2","2","2","2","2","2","2","2","2"]],"2":[["4","4","5","5","2","2","2","2","2","2","2","2","2","2","2","2"],["4","4","5","2","2","2","2","4","2","2","2","2","2","2","2","2"],["4","5","4","1","2","2","2","4","5","2","2","2","2","2","2","2"],["4","5","1","1","2","2","2","3","5","4","2","2","2","2","2","4"],["5","4","1","1","2","2","2","2","5","5","2","2","3","5","5","5"],["5","1","1","1","2","2","2","2","4","5","5","5","5","4","4","4"],["5","1","1","1","2","2","2","2","5","5","5","4","3","3","4","4"],["5","5","1","1","2","2","4","5","5","5","4","3","3","4","4","4"]],"3":[["5","5","5","4","4","5","5","4","4","5","4","3","3","4","4","4"],["5","4","5","5","5","4","4","3","4","5","4","3","3","4","4","5"],["5","5","4","4","4","3","3","3","4","5","4","3","4","5","5","5"],["5","5","4","4","4","3","3","3","4","5","3","4","5","5","5","5"],["4","5","4","4","4","3","3","3","4","4","4","5","5","5","5","5"],["5","5","4","4","4","3","3","3","3","4","5","5","5","5","5","5"],["5","4","4","4","4","3","3","3","3","5","5","5","5","5","5","5"],["5","3","4","4","4","3","3","3","4","5","5","5","5","5","5","5"]],"4":[["2","2","2","2","2","2","2","2","2","4","5","5","5","4","4","4"],["2","2","2","2","2","2","2","2","2","4","5","5","5","4","4","4"],["2","2","2","2","2","2","2","2","2","4","5","5","5","4","4","4"],["2","1","2","2","2","2","2","2","2","4","5","5","5","5","4","4"],["2","1","1","2","2","2","2","2","2","4","5","5","5","5","4","4"],["2","1","1","2","2","2","2","2","2","4","5","4","5","5","4","4"],["2","1","1","2","2","2","2","2","3","4","5","4","4","5","4","4"],["2","1","2","2","2","2","2","2","3","4","5","4","2","5","5","4"]],"5":[["2","2","2","2","2","2","2","2","3","4","5","4","1","5","5","4"],["2","2","2","2","2","2","2","2","3","4","5","4","1","5","5","4"],["2","2","2","2","2","2","2","2","4","4","5","4","1","5","5","4"],["2","2","2","2","2","2","2","2","4","4","5","4","1","5","5","4"],["2","2","2","2","2","2","2","3","4","4","5","2","1","4","5","4"],["2","2","2","2","2","2","2","3","4","4","5","1","1","4","5","4"],["2","2","2","2","2","2","3","4","4","5","5","1","2","4","5","4"],["2","2","2","2","2","3","3","4","4","5","5","1","2","3","5","5"]],"6":[["2","2","2","2","2","3","4","4","4","5","2","2","2","2","5","5"],["2","2","2","2","3","4","4","4","5","5","2","2","2","2","5","5"],["2","2","4","4","5","5","5","5","5","4","2","2","2","2","5","5"],["5","5","5","5","4","4","4","5","5","2","2","2","2","2","5","5"],["5","4","4","4","4","4","5","5","2","2","2","2","2","2","5","5"],["4","4","5","5","5","5","4","2","2","2","2","2","2","2","3","5"],["4","5","5","4","3","2","2","2","2","2","2","2","2","2","2","5"],["4","5","5","1","1","1","2","2","2","2","2","2","2","2","2","2"]],"7":[["4","5","5","2","1","1","1","1","1","1","1","2","2","2","2","2"],["5","5","5","5","4","1","1","1","1","2","2","2","2","2","3","3"],["5","5","5","5","5","5","5","5","3","2","3","3","3","3","3","3"],["5","5","5","5","4","4","4","5","5","5","5","4","4","3","3","3"],["5","5","5","5","4","4","4","4","4","4","5","5","5","4","3","2"],["5","5","5","5","5","4","4","4","3","3","3","4","4","4","5","4"],["5","5","5","5","5","5","5","4","4","4","4","4","4","4","4","4"],["5","5","5","5","5","5","5","5","5","5","5","5","5","4","4","4"]]}
    # This is a demo image for the test environment
    game_obj = game['data']
    print("GAME {}".format(game['id']))
    #COLORS_NEW = [15788447, 12957817, 9602122, 3944982, 1379078]
    COLORS = game['colors']
    GAME_NAME = "Crypto Spring Will Come #{}".format(int(game['id']) + 1)
    GAME_START_TIME = GAME_START_TIMES[idx]

    game_extra_settings = [500, 100]

    game_settings = {"_renderSettings": [ROWS, COLUMNS, 1, 5, *COLORS],
                     "_gameName": GAME_NAME, "_gameStartTime": GAME_START_TIME}

    subprocess.call([*RUN_COMMAND, 'deployGame', '-i', json.dumps(game_settings)], shell=True, stdout=subprocess.DEVNULL)
    time.sleep(op_delay)
    out = subprocess.run([*RUN_LOCAL_COMMAND, 'gameAddress'], shell=True, stdout=subprocess.PIPE)

    GAME_ADDRESS = find_address('gameAddress', out.stdout)
    print("GAME ADDRESS: {}".format(GAME_ADDRESS))
    print("Start time: {}".format(GAME_START_TIME))

    for fragment_counter, i in enumerate(game_obj):

        print(json.dumps({"fragmentNum": fragment_counter, "tiles": game_obj[i]}))
        subprocess.call([*RUN_COMMAND, 'saveImageFragment', '-i',
             json.dumps({"fragmentNum": fragment_counter, "tiles": game_obj[i]})], shell=True, stdout=subprocess.DEVNULL)
        time.sleep(op_delay - op_minus)

    subprocess.call(
        [*RUN_COMMAND, 'setGameExtraSettings', '-i',
         json.dumps({'_extraSettings': game_extra_settings})], shell=True, stdout=subprocess.DEVNULL)
    print(json.dumps({'_extraSettings': game_extra_settings}))

    subprocess.call(
        [*RUN_COMMAND, 'setOracleAddress', '-i',
         json.dumps({'_oracleAddress': ORACLE})], shell=True, stdout=subprocess.DEVNULL)
    print("Oracle set")

    time.sleep(op_delay - op_minus)

    subprocess.call(
        [*RUN_COMMAND, 'setImageForReview'], shell=True, stdout=subprocess.DEVNULL)
    print("Game sent for review")
    subprocess.call(
        [*RUN_COMMAND_QUEUE, 'addGame', '-i', json.dumps({'gameAddress': GAME_ADDRESS})], shell=True, stdout=subprocess.DEVNULL)
    print("Game added to queue")