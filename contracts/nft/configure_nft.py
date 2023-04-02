import json
import random
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

op_delay = 0
op_minus = 0
nft_json = {}

OP_SET_BLOCK_COLOR = 1
OP_CHANGE_FARM_SPEED = 2
# _paramValue default = 100, x2 = 50, x0.5 = 200
OP_MINUS_CAPTURED_TILES = 3
OP_PLUS_CAPTURED_TILES = 4
OP_MINUS_COLORS = 5
# _paramIndex = [0..4]

NORTON_ADDRESS = '0:e512476d3b2e2635cc2cc55ae478b55ea57f86b8d3bdf540d5f3298e39a9c7c9'

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

PB_JSON = {
    "type": "Basic NFT",
    "id": 0,
    "name": "PileBlocks 04/2023 #{}",
    "description": "",
    "nftType": 0,
    "preview": {
        "source": "https://github.com/pileblocks/sbf-trust/raw/d7010577a440e3d722dce4174d3c268565cd8cf8/app/public/assets/img/portrait_black.png",
        "mimetype": "image/png"
    },
    "files": [{
        "source": "https://github.com/pileblocks/sbf-trust/raw/d7010577a440e3d722dce4174d3c268565cd8cf8/app/public/assets/img/portrait_black.png",
        "mimetype": "image/png"
    }],
    "attributes": [],
    "external_url": "https://pileblocks.com/"
}

# 1. Open the collection address in bytye
# 2. Run nftOwnerCodeHash with the NFT creator address (b54e61cb19daf1f93a78e19c33ff2268f10b1f01a7a487688fb5ef77602115c6)
# 3. Get the codeHash and put it into the query
'''
query {
            accounts(
                filter: {
                  code_hash: {eq: "b54e61cb19daf1f93a78e19c33ff2268f10b1f01a7a487688fb5ef77602115c6"
                  }
                }
            ) {id}
}
'''
# 4. Get the array under accounts

nft_indexes = [
      {
        "id": "0:1b2a83859f51d96f17de7840dfc37b82b288f87af7f777ca92b110e8a5a4c66b"
      },
      {
        "id": "0:942cce0a809248e6df1a3436437180630f24a43531f266861c1193bc4ef0aa4d"
      },
      {
        "id": "0:a7c8f0b00d946f98a580721c6fc468a2efb8d97fd868ac0c9db4784b141d2fd9"
      },
      {
        "id": "0:b3d39b24e5987344503bb5dbab298b39f771f0bb6cdef6d72a7a0696a55f64b5"
      },
      {
        "id": "0:e387a8f4dd8233c9561b4cb3e30f7aff19d07ccbb93ef3df11367a69bf0f0a54"
      }
    ]

CONFIGURATIONS = [
    {
        "name": "The Techno Bowine # Farming x2",
        "image": "https://pileblocks.github.io/img/OP_CHANGE_FARM_SPEED_x2.png",
        "thumbnail": "https://pileblocks.github.io/img/OP_CHANGE_FARM_SPEED_x2_512.png",
        "attributes": [{"trait_type": "Action Type", "value": "Farming Speed"}],
        "params": {'nftAddress': '',
                 '_paramType': OP_CHANGE_FARM_SPEED,
                 '_paramIndex': 0,
                 '_paramValue': 250,
                 '_paramArray': [],
                 '_applyNumTimes': 1
                 }
    },
    {
        "name": "The Global Worming # Farming x0.5",
        "image": "https://pileblocks.github.io/img/OP_CHANGE_FARM_SPEED_x05.png",
        "thumbnail": "https://pileblocks.github.io/img/OP_CHANGE_FARM_SPEED_x05_512.png",
        "attributes": [{"trait_type": "Action Type", "value": "Farming Speed"}],
        "params": {'nftAddress': '',
                   '_paramType': OP_CHANGE_FARM_SPEED,
                   '_paramIndex': 0,
                   '_paramValue': 1000,
                   '_paramArray': [],
                   '_applyNumTimes': 1
                   }
    },
    {
        "name": "Kitten Saver # Points +100",
        "image": "https://pileblocks.github.io/img/OP_PLUS_CAPTURED_TILES_100.png",
        "thumbnail": "https://pileblocks.github.io/img/OP_PLUS_CAPTURED_TILES_100_512.png",
        "attributes": [{"trait_type": "Action Type", "value": "Points"}],
        "params": {'nftAddress': '',
                   '_paramType': OP_PLUS_CAPTURED_TILES,
                   '_paramIndex': 0,
                   '_paramValue': 100,
                   '_paramArray': [],
                   '_applyNumTimes': 1
                   }
    },
    {
        "name": "Fishy Smuggling # Points -100",
        "image": "https://pileblocks.github.io/img/OP_MINUS_CAPTURED_TILES_100.png",
        "thumbnail": "https://pileblocks.github.io/img/OP_MINUS_CAPTURED_TILES_100_512.png",
        "attributes": [{"trait_type": "Action Type", "value": "Points"}],
        "params": {'nftAddress': '',
                   '_paramType': OP_MINUS_CAPTURED_TILES,
                   '_paramIndex': 0,
                   '_paramValue': 100,
                   '_paramArray': [],
                   '_applyNumTimes': 1
                   }
    },
    {
        "name": "Unexpected Circumstances # Trap 1.3 colors",
        "image": "https://pileblocks.github.io/img/OP_SET_BLOCK_COLOR_13.png",
        "thumbnail": "https://pileblocks.github.io/img/OP_SET_BLOCK_COLOR_13_512.png",
        "attributes": [{"trait_type": "Action Type", "value": "Trap"}],
        "params": {'nftAddress': '',
                   '_paramType': OP_SET_BLOCK_COLOR,
                   '_paramIndex': 0,
                   '_paramValue': 0,
                   '_paramArray': [1,0,1,0,0],
                   '_applyNumTimes': 1
                   }
    },
    {
        "name": "Moronic Wobbles # Color 3, -40",
        "image": "https://pileblocks.github.io/img/OP_MINUS_COLORS_2_40.png",
        "thumbnail": "https://pileblocks.github.io/img/OP_MINUS_COLORS_2_40_512.png",
        "attributes": [{"trait_type": "Action Type", "value": "Tiles"}],
        "params": {'nftAddress': '',
                   '_paramType': OP_MINUS_COLORS,
                   '_paramIndex': 2,
                   '_paramValue': 40,
                   '_paramArray': [],
                   '_applyNumTimes': 1
                   }
    }

]

for idx, index in enumerate(nft_indexes):
    config = CONFIGURATIONS[idx]
    out = subprocess.run(
        ['C:/Users/home/AppData/Roaming/npm/everdev', 'contract', 'run-local', 'Index.abi.json', '-a',
         index['id'],
         '-s', SIGNER_NAME, '-n', NETWORK, 'getInfo', '-i', json.dumps({'answerId': '1'})], shell=True,
        stdout=subprocess.PIPE)
    nft_address = find_address('nft', out.stdout)
    print("NFT ADDRESS: {}".format(nft_address))
    config["params"]["nftAddress"] = nft_address

    out = subprocess.run(
        ['C:/Users/home/AppData/Roaming/npm/everdev', 'contract', 'run-local', 'Nft.abi.json', '-a',
         nft_address,
         '-s', SIGNER_NAME, '-n', NETWORK, 'getInfo', '-i', json.dumps({'answerId': '1'})], shell=True,
        stdout=subprocess.PIPE)
    nft_id = int(find_address('id', out.stdout), 16)
    print("NFT ID: {}".format(nft_id))

    subprocess.run(
        ['C:/Users/home/AppData/Roaming/npm/everdev', 'contract', 'run', 'NftCreator.abi.json', '-a', NFT_CREATOR_ADDRESS,
         '-s', SIGNER_NAME, '-n', NETWORK, 'setNftParams', '-i', json.dumps(config["params"])],
        shell=True,
        stdout=subprocess.DEVNULL)

    nft_json = PB_JSON.copy()
    nft_json["id"] = nft_id
    nft_json["nftType"] = config["params"]["_paramType"]
    nft_json["name"] = nft_json["name"].format(nft_id)
    nft_json["preview"]["source"] = config["thumbnail"]
    nft_json["files"][0]["source"] = config["image"]
    nft_json["attributes"] = config["attributes"]
    nft_json["description"] = config["name"]

    subprocess.run(
        ['C:/Users/home/AppData/Roaming/npm/everdev', 'contract', 'run', 'NftCreator.abi.json', '-a', NFT_CREATOR_ADDRESS,
         '-s', SIGNER_NAME, '-n', NETWORK, 'setNftJson', '-i', json.dumps({'nftAddress': nft_address, 'json': json.dumps(nft_json)})], shell=True,
        stdout=subprocess.DEVNULL)

    subprocess.run(
        ['C:/Users/home/AppData/Roaming/npm/everdev', 'contract', 'run', 'NftCreator.abi.json', '-a', NFT_CREATOR_ADDRESS,
         '-s', SIGNER_NAME, '-n', NETWORK, 'transferNft', '-i', json.dumps({'nftAddress': nft_address, 'to': NORTON_ADDRESS})], shell=True,
        stdout=subprocess.DEVNULL)
