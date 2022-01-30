pragma ton-solidity >= 0.47.0;

import "./PBGame.sol";

contract GameHost is PBConstants {

    uint64 static _randomNonce;

    uint32 public currentGameId;
    TvmCell public gameCode;
    TvmCell walletCode;
    address tokenRootAddress;

    constructor (
                 TvmCell _gameCode,
                 TvmCell _walletCode,
                 address _tokenRootAddress
                )
    public
    {
		require(tvm.pubkey() != 0, PUBLIC_KEY_MISSING);
		require(tvm.pubkey() == msg.pubkey(), WRONG_PUBLIC_KEY);
        tvm.accept();
        gameCode = _gameCode;
        walletCode = _walletCode;
        tokenRootAddress = _tokenRootAddress;
        currentGameId = 0;
    }

    function getGameCode(uint32 gameId) public view returns (TvmCell) {
        TvmBuilder salt;
        salt.store(gameId);
        return tvm.setCodeSalt(gameCode, salt.toCell());
    }

    function deployGame(address imageOwner, uint8[][] tmp) public returns (address) {
        //TODO: Remove after testing in favor of msg.value
        // imageOwner we then can take from msg.sender
        require(tvm.pubkey() == msg.pubkey(), WRONG_PUBLIC_KEY);
        tvm.accept();
        //tvm.rawReserve(address(this).balance - msg.value, 2);
        TvmCell stateInit = tvm.buildStateInit({
            contr: PBGame,
            varInit: {
                walletCode: walletCode,
                tokenRootAddress: tokenRootAddress,
                created: now,
                imageOwner: imageOwner
            },
            pubkey: tvm.pubkey(),
            code: getGameCode(currentGameId + 1)
        });
        address game = new PBGame{
            stateInit: stateInit,
            value: 0,
            flag: 128
        }(address(this), tmp);
        tvm.log(format("New game: {}", game));
        return game;
    }

    function getGameAddress(GameInfo gameInfo) private inline view returns (address) {
        TvmCell stateInit = tvm.buildStateInit({
            contr: PBGame,
            varInit: {
                walletCode: walletCode,
                tokenRootAddress: gameInfo.tokenRootAddress,
                created: gameInfo.created,
                imageOwner: gameInfo.imageOwner
            },
            pubkey: tvm.pubkey(),
            code: getGameCode(gameInfo.gameId)
        });

        return address(tvm.hash(stateInit));
    }

}
