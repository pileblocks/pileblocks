# PileBlocks 1.0

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Enable NFTs

For NFTs:
1. Deploy the collection and oracle from /contracts/nft/nft_deploy.sh
2. Deploy NftCreator
3. Set up the script /contracts/nft/create_nft.py and create the number of NFTs you need
4. Configure the NFTs using /contracts/nft/configure_nft.py

+ When creating games, provide the oracle to the game config