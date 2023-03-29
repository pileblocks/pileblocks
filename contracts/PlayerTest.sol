pragma ton-solidity >= 0.57.0;

pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./interfaces/IGameHost.sol";
import "./interfaces/ITokenRoot.sol";
import "./interfaces/ITokenWallet.sol";
import "./interfaces/IPBWallet.sol";
import "./interfaces/IPBGame.sol";
import "./interfaces/IFarmingWallet.sol";
import "./structures/PBStructs.sol";

contract PlayerTest {

    uint64 static _randomNonce;

    address public walletAddress;
    address public rootAddress;
    address public genesis;
    address public gameHost;
    address public gameAddress;
    address public farmingWallet;

    modifier onlyOwner() {
        require(tvm.pubkey() == msg.pubkey(), 101);
        _;
    }

    modifier ownerOrHost() {
        require(tvm.pubkey() == msg.pubkey() || msg.sender == gameHost, 101);
        _;
    }

    constructor(address _rootAddress, address _genesis, address _gameHost) public {
        tvm.accept();
        rootAddress = _rootAddress;
        genesis = _genesis;
        gameHost = _gameHost;
        ITokenRoot(rootAddress).walletOf{value: 0.1 ton, callback: PlayerTest.onGetWalletAddress}(address(this));
    }

    function onGetWalletAddress(address _walletAddress) external {
        require(msg.sender == rootAddress, 101);
        tvm.accept();
        walletAddress = _walletAddress;
    }



//
//    WALLET OPERATIONS
//

    function claimTiles() onlyOwner external view {
        tvm.accept();
        IFarmingWallet(farmingWallet).claimTiles{value: 1 ton}(genesis);
    }

    function releaseTokens(uint128 amount) onlyOwner external view {
        tvm.accept();
        IFarmingWallet(farmingWallet).releaseTokens{value: 1 ton}(amount);
    }

    function putTiles(ColorTile[] tiles, uint128 amount) onlyOwner external view {
        tvm.accept();
        ITokenWallet(walletAddress).transfer{value: 2 ton}(amount, gameAddress, 0, address(this), true, abi.encode(tiles));
    }

//
//    GAME OPERATIONS
//

    function deployGame(uint24[] _renderSettings, string _gameName, uint64 _gameStartTime) onlyOwner external view returns(address) {
        tvm.accept();
        IGameHost(gameHost).deployGame{value: 2 ton, callback: PlayerTest.setGameAddress}(_renderSettings, _gameName, _gameStartTime);
    }

    function setGameAddress(address _gameAddress) external ownerOrHost {
        tvm.accept();
        tvm.log(format("Player receives: {}", _gameAddress));
        gameAddress = _gameAddress;
    }

    function saveImageFragment(uint8 fragmentNum, uint8[][] tiles) onlyOwner external view {
        tvm.accept();
        IPBGame(gameAddress).saveImageFragment{value: 2 ton}(fragmentNum, tiles);
    }

    function setImageForReview() onlyOwner external view {
        tvm.accept();
        IPBGame(gameAddress).setImageForReview{value: 2 ton}();
    }

    function deployFarming() onlyOwner external view {
        tvm.accept();
        IPBGame(gameAddress).deployFarmingWallet{value: 2 ton}();
    }

    function setFarmingWallet(address _farmingWallet) onlyOwner external {
        tvm.accept();
        farmingWallet = _farmingWallet;
    }

    function setGameExtraSettings(uint128[] _extraSettings) external view {
        tvm.accept();
        IPBGame(gameAddress).setGameExtraSettings{value: 1 ton}(_extraSettings);
    }

    function setOracleAddress(address _oracleAddress) external view {
        tvm.accept();
        IPBGame(gameAddress).setOracleAddress{value: 1 ton}(_oracleAddress);
    }

}
