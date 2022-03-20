pragma ton-solidity >= 0.57.0;

pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./interfaces/IGameHost.sol";
import "./interfaces/ITokenRoot.sol";
import "./interfaces/IPBWallet.sol";
import "./interfaces/IPBGame.sol";
import "./interfaces/PBStructs.sol";

contract PlayerTest {

    uint64 static _randomNonce;

    address public walletAddress;
    address public rootAddress;
    address public genesis;
    address public gameHost;
    address public gameAddress;

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

    function claimTiles() onlyOwner external {
        tvm.accept();
        IPBWallet(walletAddress).claimTiles{value: 1 ton}(gameAddress);
    }

    function putTiles(ColorTile[] tiles) onlyOwner external {
        tvm.accept();
        IPBWallet(walletAddress).putTiles{value: 2 ton}(genesis, gameHost, gameAddress, 25 * 1e9, tiles);
    }

//
//    GAME OPERATIONS
//

    function deployGame(uint24[] _renderSettings, string _gameName) onlyOwner external returns(address) {
        tvm.accept();
        IGameHost(gameHost).deployGame{value: 2 ton, callback: PlayerTest.setGameAddress}(_renderSettings, _gameName);
    }

    function setGameAddress(address _gameAddress) external ownerOrHost {
        tvm.accept();
        tvm.log(format("Player receives: {}", _gameAddress));
        gameAddress = _gameAddress;
    }

    function saveImageFragment(uint8 fragmentNum, uint8[][] tiles) onlyOwner external {
        tvm.accept();
        IPBGame(gameAddress).saveImageFragment{value: 2 ton}(fragmentNum, tiles);
    }

    function setImageForReview() onlyOwner external {
        tvm.accept();
        IPBGame(gameAddress).setImageForReview{value: 2 ton}();
    }
}
