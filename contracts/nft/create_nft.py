import json
import re
import subprocess
import sys
import time

PROD_DELAY = 45
DEV_DELAY = 5
PROD_MINUS = 30
DEV_MINUS = 25

ENVIRON = 'se'
# se dev main
NUM_NFT = 5

op_delay = 0
op_minus = 0
nft_json = {}


if ENVIRON == 'main':
    COLLECTION_ADDRESS = '0:2fe4baae0aa7bc92c919590b9db34c6272fd49161faaf4336ac2efb8c2228e62'
    NFT_CREATOR_ADDRESS = '0:2fe4baae0aa7bc92c919590b9db34c6272fd49161faaf4336ac2efb8c2228e62'
    SIGNER_NAME = 'pile_signer'
    NETWORK = 'main'
    op_delay = PROD_DELAY
    op_minus = PROD_DELAY

elif ENVIRON == 'se':
    # SE
    COLLECTION_ADDRESS = '0:082928d28de2b521edd5554caa24c19586778462b33314766538639eaaf6e0c8'
    NFT_CREATOR_ADDRESS = '0:dd0acda7edb8866ef5736d914f8256c63edebdd9265a224d31234178092a7665'
    NETWORK = 'se'
    SIGNER_NAME = 'norton'
    op_delay = DEV_DELAY

elif ENVIRON == 'dev':
    # DEV
    COLLECTION_ADDRESS = '0:09abcc263db0683a688394e36cf7987f9000a5508d7ed69e20f1dd8dd1717141'
    NFT_CREATOR_ADDRESS = '0:2fe4baae0aa7bc92c919590b9db34c6272fd49161faaf4336ac2efb8c2228e62'
    SIGNER_NAME = 'norton'
    NETWORK = 'dev'
    op_delay = DEV_DELAY
    op_minus = DEV_MINUS


def find_address(field, text):
    m = re.search("{0}\"\:\s\"([^\"]*)\"".format(field), str(text))
    if m:
        return m.group(1)


print('NETWORK: {}'.format(NETWORK))
print('SIGNER: {}'.format(SIGNER_NAME))

subprocess.call(
    ['C:/Users/home/AppData/Roaming/npm/everdev', 'contract', 'run', 'Collection.abi.json', '-a', COLLECTION_ADDRESS,
     '-s', SIGNER_NAME, '-n', NETWORK, 'setMintAddress', '-i', json.dumps({'_mintAddress': NFT_CREATOR_ADDRESS})],
    shell=True, stdout=subprocess.DEVNULL)

time.sleep(op_delay)
print('NFT_CREATOR_ADDRESS set to {}'.format(NFT_CREATOR_ADDRESS))


#CREATE NFT
for i in range(NUM_NFT):
    subprocess.run(
        ['C:/Users/home/AppData/Roaming/npm/everdev', 'contract', 'run', 'NftCreator.abi.json', '-a',
         NFT_CREATOR_ADDRESS,
         '-s', SIGNER_NAME, '-n', NETWORK, 'mintNft', '-i', json.dumps({'json': '{}'})], shell=True, stdout=subprocess.DEVNULL)