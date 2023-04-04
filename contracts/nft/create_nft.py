import json
import re
import subprocess
import sys
import time

PROD_DELAY = 5
DEV_DELAY = 5
PROD_MINUS = 25
DEV_MINUS = 25

ENVIRON = 'main'
# se dev main
NUM_NFT = 35

op_delay = 0
op_minus = 0
nft_json = {}


if ENVIRON == 'main':
    COLLECTION_ADDRESS = '0:507d46537d8e007949a7c4eec637c22a2fe27b1afbb09f1e0dfc6dfd37967ef3'
    NFT_CREATOR_ADDRESS = '0:89804795f2d7712d89e1b677be57302b8b80e731af5435626b16e4f003063497'
    SIGNER_NAME = 'pile_signer'
    NETWORK = 'main'
    op_delay = PROD_DELAY
    op_minus = PROD_DELAY

elif ENVIRON == 'se':
    # SE
    COLLECTION_ADDRESS = '0:082928d28de2b521edd5554caa24c19586778462b33314766538639eaaf6e0c8'
    NFT_CREATOR_ADDRESS = '0:557c4ada26e4bac1677695dce33b5d404f9924a31eb78f64303b5cdc519f4c0f'
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
    print("Created NFT: {}".format(i))