import json
import random
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
                },
                limit: 50
            ) {id}
}
'''
# 4. Get the array under accounts

nft_indexes = [{"id":"0:073c13d438581db8ecd1f02af8cd297082adb039ee9816613d1f182073ea001d"},{"id":"0:10b07d67221ce843cf2d832d3b903e799dd25532c7d00adadf569d11c1219469"},{"id":"0:1481a6855ba2caffbea500dcc0d1cc35935ace1148133fd4bf8084127d204d3a"},{"id":"0:1ae9d92c253db58e26ff8f17553a8a4b4b570a68e4fa10e0d4ac856fceaea5ae"},{"id":"0:1ca180e96d61551363cc974df7cec8b15becfda36495e5b7cf0f81a6452acabc"},{"id":"0:206dd99952ed8da594798b6ef783a3c9355d26844272deb96385683aaf02c650"},{"id":"0:3bc348263a2cb97303a42ecc03b3d415dbf7b08ef4ad1e55ae1e1288e5c1d9e2"},{"id":"0:3d05bddd6cbfabfe19cae371ccd85b164d916f9ae68e4d03f0b9cdd69be9b1df"},{"id":"0:40d86b3009742005121736f297e841b836ddbfe5e7c68b86168ead68ab04838e"},{"id":"0:463e2eeee03eeca6410570da4bb3f5ff6d9ade9f179735549ccc5d13f530ab10"},{"id":"0:51776cccd618e7a4caee0dbabac47aacce9f91a96eba276bf0a3f8f306b58721"},{"id":"0:5e18d8378fcb4c3d533e3eeb9574cbc3c0887f7d5cf97110951b48b7c7f3d44d"},{"id":"0:67e7736f89ac451b76d71e92f138bc8f0d1c5c10934ebf955f287f5a1b8f4fe6"},{"id":"0:6b5e4aa57aa4999d7214495a527b5e3d01d65b2ad87bc461f71d0e6f258cd2d8"},{"id":"0:75cddec67745d986dc89bbde031ff4f9ea75b71fca2cad8ad8bc134f9aa06b72"},{"id":"0:763f2ef71ba320bb2f748f9a4ab9c41111fa220d9c08f91e88bad2f7fe2b1268"},{"id":"0:795f4ceefa3ba15d4405ae3e8d33a128b1da857ed04d351db0d2700d5d404138"},{"id":"0:8573e4318e60c161762ca9d88ea8566177a7e468253faffcf3894df3f61f15df"},{"id":"0:869ece9b59e160688b742345343224c3cb48c0c5d7978d079359e489ffff69df"},{"id":"0:86ae02f1c0cce66da8f2537ca29a92f2018ff47cd4930ec447b03355c3b03cd0"},{"id":"0:8d310867ddff6409183fc661f24915bc3e40ee7dd57b87cc70f0090df0ef9c35"},{"id":"0:a33bb7bdee0c8d8fe5558e6acf795f50f38d1a08dcaa35164329f05a22ea7b2a"},{"id":"0:a5bc012f010f63c33420e3cb0452bedab749adba843bd8de4bf0a319b37a229c"},{"id":"0:ae8726cb6df9c61b308755a42bafff4eb65d3fe63dfd23ca6f66498974662209"},{"id":"0:c0f95e437d33440c340ad9e7042d7ffdd429e36d5f0295e728564ee936150117"},{"id":"0:c134e0b53fc75d62143bc045464ba2d5a55759f3062c7b02c8c4ada379def79c"},{"id":"0:c19b392184c17b77d5b574436a3ac2b3a2c87bd9353f6861867272630db98a79"},{"id":"0:cfca4fe8cd1417ac4c35803db39171f6529ed943919e19a6a88dc4f7052f1635"},{"id":"0:d27353b320a3bd30ef0c17daaee7058ed4a583d5030164bbd54a02dfb6edb1d2"},{"id":"0:dad2795dedc8df67abb971471ec11b40460f2a46f3be1db196749723c0d980fd"},{"id":"0:e040852d66be9c75788b3b4e3f094d93ea71b1f407404a7d51a95f8567c8a242"},{"id":"0:e5430c4b4d28338cf073b22488c404de39d771fab0003616a4b06ce8207ec355"},{"id":"0:e6fb4df33ca7ca36a1556b3cec1929c5dfdd43fe8e957c90860b50f3202380b3"},{"id":"0:ed124d43eb2ceed3ce795bd7a361e16bd5000287a82c56f524b224f59a747610"},{"id":"0:f50b116d86229f8918120a74b43e45fdd1d5347f5992a71ecc9ca034d0af588a"}]

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

OWNERS = ["0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:9708ed8579b44bebdcb9be9a113b56fa490a8684b6cd736cb761f867c8b101cb",
"0:910710c94984a2edccb12ae2d7c8ffd0ddaf539683b105f6b7c2cd2a045a29f7",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:1ea4b13ddeadac8bc8442f58ecd62aceb3995a8f8283e08bcb55b9bc6b0c0e5f",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:75fc22db7d729f7cd5eaa4a7e749be4332c96be2d16fb5f37bf256f54538e6fc",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:12c6153adddd1e8634a546b1e1639e6c7592f229cc1583fe210b9dd426774c6a",
"0:cd75a8d346fc2aaadb8b88e8d6bc23eb0bd2b1f6c28806967f1d30c2266add1d",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:2daddfafb8ef0912e502c7a5323816cbea8cd6c5af4e671f43bb384a7aae019f",
"0:9708ed8579b44bebdcb9be9a113b56fa490a8684b6cd736cb761f867c8b101cb",
"0:747ef1ebd74aff375de27a78427e8823428a74a646c81a64ba1187f2eb120f69",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2",
"0:757db1a8121dbe2fc4f21ba1f16b359b29291642aa2b9bd9ce714d69682733d2"]

for idx, index in enumerate(nft_indexes):
    config = random.choice(CONFIGURATIONS)
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
         '-s', SIGNER_NAME, '-n', NETWORK, 'transferNft', '-i', json.dumps({'nftAddress': nft_address, 'to': OWNERS[idx]})], shell=True,
        stdout=subprocess.DEVNULL)
    print("Send to address: {}".format(OWNERS[idx]))