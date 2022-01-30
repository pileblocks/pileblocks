pragma ton-solidity >= 0.47.0;

import "./PBGame.sol";
import "./GameIndex.sol";

contract GameHost is PBConstants {

    uint64 static _randomNonce;

    uint32 public currentGameId;
    TvmCell public indexCode;
    TvmCell gameCode;
    TvmCell walletCode;
    address tokenRootAddress;

    modifier onlyOwner() {
        require(tvm.pubkey() == msg.pubkey(), WRONG_PUBLIC_KEY);
        _;
    }

    constructor (
                TvmCell _indexCode,
                TvmCell _gameCode,
                TvmCell _walletCode,
                address _tokenRootAddress
                )
    public
    {
		require(tvm.pubkey() != 0, PUBLIC_KEY_MISSING);
		require(tvm.pubkey() == msg.pubkey(), WRONG_PUBLIC_KEY);
        tvm.accept();
        indexCode = _indexCode;
        gameCode = _gameCode;
        walletCode = _walletCode;
        tokenRootAddress = _tokenRootAddress;
        currentGameId = 1;
    }

    /*
        @notice Provides the code to deploy a game with a particular ID
        @param gameId - ID of a game one wants to deploy
    */
    function getGameCode(uint32 gameId) public view returns (TvmCell) {
        TvmBuilder salt;
        salt.store(gameId);
        return tvm.setCodeSalt(gameCode, salt.toCell());
    }

    function getIndexCode() private view returns (TvmCell) {
        TvmBuilder salt;
        salt.store(address(this));
        return tvm.setCodeSalt(indexCode, salt.toCell());
    }

    /*
        @notice Provides the code hash of a particular game code
        @dev Client apps should filter the contracts by this code and check game address
        @dev to find the upcoming games
        @param gameId - ID of a game one wants to deploy
    */
    function getGameHash(uint32 gameId) public view returns (uint256) {
        TvmBuilder salt;
        salt.store(gameId);
        return tvm.hash(tvm.setCodeSalt(gameCode, salt.toCell()));
    }

    /*
        @notice Updates the game code without changing the game host address.
        @dev Use this to launch modified games under the same host.
        @param gameId - ID of a game one wants to deploy
    */
    function setGameCode(TvmCell _gameCode) public externalMsg onlyOwner {
        tvm.accept();
        gameCode = _gameCode;
    }

    /*
        @notice Activates a game (without it, getting colored / putting tiles is not possible).
        @param game - The address of a game to activate
    */
    function activateGame(address game) public externalMsg onlyOwner {
        tvm.accept();
        IPBGame(game).setGameStatus(STATUS_GAME_ACTIVE);
        deployIndex(currentGameId, game);
        currentGameId += 1;
    }

    function deployGame(address imageOwner, mapping(uint8 => uint8[][]) tmp) public returns (address) {
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
            code: getGameCode(currentGameId)
        });
        address game = new PBGame{
            stateInit: stateInit,
            value: 0,
            flag: 128
        }(address(this), tmp);
        tvm.log(format("New game: {}", game));
        return game;
    }

    function deployIndex(uint32 _gameId, address gameAddress) private view returns (address) {
        TvmCell stateInit = tvm.buildStateInit({
            contr: GameIndex,
            varInit: {
                gameId: _gameId
            },
            pubkey: tvm.pubkey(),
            code: getIndexCode()
        });
        address index = new GameIndex{
            stateInit: stateInit,
            value: 0.1 ton,
            flag: 1
        }(gameAddress);
        tvm.log(format("New index: {}", index));
        return index;
    }

    function getGameAddress(GameInfo gameInfo) public view returns (address) {
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

    function getIndexAddress(uint32 _gameId) public view returns (address) {
        TvmCell stateInit = tvm.buildStateInit({
            contr: GameIndex,
            varInit: {
                gameId: _gameId
            },
            pubkey: tvm.pubkey(),
            code: getIndexCode()
        });

        return address(tvm.hash(stateInit));
    }

}
