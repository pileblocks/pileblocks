pragma ton-solidity >= 0.47.0;

pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./PBGame.sol";
import "./GameIndex.sol";
import "./interfaces/IGameQueue.sol";
import "./interfaces/IGameMap.sol";

contract GameHost is PBConstants {

    uint64 static _randomNonce;

    uint32 public currentGameId;
    TvmCell public indexCode;
    TvmCell gameCode;
    TvmCell farmingCode;
    TvmCell walletCode;
    address tokenRootAddress;
    address walletAddress;

    address public queueAddress;
    bool public isQueueFinished;

    address public gameMap;

    constructor (
                TvmCell _indexCode,
                TvmCell _walletCode,
                address _tokenRootAddress
                )
    public
    {
		require(tvm.pubkey() != 0, PUBLIC_KEY_MISSING);
		require(tvm.pubkey() == msg.pubkey(), WRONG_PUBLIC_KEY);
        tvm.accept();
        indexCode = _indexCode;
        walletCode = _walletCode;
        tokenRootAddress = _tokenRootAddress;

        currentGameId = 1;
        isQueueFinished = true;

        ITokenRoot(tokenRootAddress).walletOf{value: 0.3 ton, callback: GameHost.onGetWalletAddress}(address(this));

        ITokenRoot(tokenRootAddress).deployWallet{value: 0, flag: 128, callback: GameHost.onDeploy}(
            address(this),
            0.3 ton
        );
    }

    function onDeploy(address gameWallet) external {
    }

    function onGetWalletAddress(address _walletAddress) external internalMsg {
        require(msg.sender == tokenRootAddress, WRONG_ROOT_TOKEN_ADDRESS);
        walletAddress = _walletAddress;
        tvm.log(format("Host wallet: {}", walletAddress));
    }

    function setGameMap(address _gameMap) external externalMsg onlyOwner {
        tvm.accept();
        gameMap = _gameMap;
    }

    /*
        @notice Provides the code to deploy a game with a particular ID
        @param gameId - ID of a game one wants to deploy
    */
    function getGameCode() public view returns (TvmCell) {
        TvmBuilder salt;
        //We Salt also with the game host address to distinguish between games of different hosts
        salt.store(address(this));
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
    function getGameHash() external view returns (uint256) {
        TvmBuilder salt;
        salt.store(address(this));
        return tvm.hash(tvm.setCodeSalt(gameCode, salt.toCell()));
    }

    /*
        @notice Updates the game code without changing the game host address.
        @dev Use this to launch modified games under the same host.
        @param _gameCode - the new game code
    */
    function setGameCode(TvmCell _gameCode) external externalMsg onlyOwner {
        tvm.accept();
        gameCode = _gameCode;
    }

    function setFarmingCode(TvmCell _farmingCode) external externalMsg onlyOwner {
        tvm.accept();
        farmingCode = _farmingCode;
    }

    function deployGame(uint24[] _renderSettings, string _gameName, uint64 _gameStartTime) external view responsible returns (address) {
        address imageOwner = msg.sender;
        TvmCell stateInit = tvm.buildStateInit({
            contr: PBGame,
            varInit: {
                walletCode: walletCode,
                tokenRootAddress: tokenRootAddress,
                farmingCode: farmingCode,
                created: now,
                imageOwner: imageOwner
            },
            pubkey: 0,
            code: getGameCode()
        });
        address game = new PBGame{
            stateInit: stateInit,
            value: 1 ton
        }(_renderSettings, _gameName, _gameStartTime);
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
            value: 0.2 ton,
            flag: 1
        }(gameAddress);
        tvm.log(format("New index: {}", index));
        return index;
    }

    function runGameInQueue() external view externalMsg onlyOwner {
        tvm.accept();
        IGameQueue(queueAddress).getNextGame{value: 1 ton, callback: GameHost.onGetNextGame}();
    }

    function setGameStatus(address gameAddress, uint8 newStatus) external pure externalMsg onlyOwner {
        tvm.accept();
        IPBGame(gameAddress).setGameStatus{value: 0.1 ton}(newStatus);
    }

    function onGetNextGame(address newGameAddress) external internalMsg {
        require(msg.sender == queueAddress, WALLET_DOES_NOT_MATCH_OWNER);

        tvm.accept();

        if (newGameAddress.value != 0) {
            isQueueFinished = false;
            IPBGame(newGameAddress).setGameStatus{value: 0.1 ton}(STATUS_GAME_ACTIVE);
            IPBGame(newGameAddress).setGameId{value: 0.1 ton}(currentGameId);
            deployIndex(currentGameId, newGameAddress);
            tvm.log(format("Deployed a game: {}", newGameAddress));
            currentGameId += 1;
        } else {
            isQueueFinished = true;
        }
    }

    function onGameCompleted(GameInfo gameInfo) external view internalMsg {
        require(getGameAddress(gameInfo) == msg.sender, WRONG_GAME_ADDRESS);
        require(gameInfo.gameHost == address(this), INVALID_GAME_HOST);
        require(gameInfo.status == STATUS_GAME_COMPLETED, WRONG_GAME_STATUS);

        tvm.accept();
        IPBGame(msg.sender).completeGame{value: 1 ton}();
        IGameQueue(queueAddress).getNextGame{value: DEPLOY_VALUE, callback: GameHost.onGetNextGame}();
    }
    /* @notice Triggers when a game winner is defined. We need this to create a farming wallet

    */
    function onWinnerSet(GameInfo gameInfo, address winnerAddress) external view internalMsg {
        require(getGameAddress(gameInfo) == msg.sender, WRONG_GAME_ADDRESS);
        require(gameInfo.gameHost == address(this), INVALID_GAME_HOST);
        require(gameInfo.status == STATUS_GAME_COMPLETED, WRONG_GAME_STATUS);
        tvm.accept();
        IGameMap(gameMap).deployMapFarm{value: DEPLOY_VALUE}(winnerAddress, gameInfo.gameId);
    }

    function getGameAddress(GameInfo gameInfo) public view returns (address) {
        TvmCell stateInit = tvm.buildStateInit({
            contr: PBGame,
            varInit: {
                walletCode: walletCode,
                tokenRootAddress: gameInfo.tokenRootAddress,
                created: gameInfo.created,
                farmingCode: farmingCode,
                imageOwner: gameInfo.imageOwner
            },
            pubkey: 0,
            code: getGameCode()
        });

        return address(tvm.hash(stateInit));
    }

    function getIndexAddress(uint32 _gameId) external view returns (address) {
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

    function setQueueAddress(address _queueAddress) external externalMsg onlyOwner {
        tvm.accept();
        queueAddress = _queueAddress;
    }

//
//  DRAIN functions
//

    /*
        @notice Returns the host's EVERs to receiver
    */
    function drain(address receiver) onlyOwner external view {
        tvm.accept();
        tvm.rawReserve(0.1 ton, 0);
        receiver.transfer({ value: 0, flag: 128 });
    }

    /*
        @notice Returns a game's EVERs to the host
    */
    function drainGame(address gameAddress) onlyOwner external pure {
        tvm.accept();
        IPBGame(gameAddress).drainByHost{value: 0.1 ton}();
    }

    /*
        @notice Drains host's tokens
    */
    function drainTokens(uint128 value, address receiver) onlyOwner external view {
        tvm.accept();
        TvmCell payload;
        ITokenWallet(walletAddress).transfer{value: 0.5 ton}(
            value,
            receiver,
            0.3 ton,
            address(this),
            false,
            payload
            );
    }

    /*
        @notice Returns a game's tokens to the host
    */
    function drainGameTokens(address gameAddress, uint128 value) onlyOwner external pure {
        tvm.accept();
        IPBGame(gameAddress).drainTokens{value: 0.5 ton}(value);
    }

}
