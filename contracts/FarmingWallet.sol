pragma ton-solidity >= 0.57.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./PBConstants.sol";
import "./interfaces/ITokenRoot.sol";
import "./interfaces/ITokenWallet.sol";
import "./interfaces/IPBGame.sol";
import "./interfaces/IGenesis.sol";
import "./interfaces/IAcceptTokensTransferCallback.sol";
import "./libraries/ExpMath.sol";
import "./abstract/GameEvents.sol";

contract FarmingWallet is PBConstants, IAcceptTokensTransferCallback, GameEvents {

    address static game;
    address static owner;
    address static tokenRootAddress;

    address public tokenWallet;
    uint128 public farmingSpeed;

    // Farming
    uint128 public _balance;
    uint128 public tilesNum;
    uint128 public tilesChangeTime;

    modifier onlyOwnerSender() {
        require(msg.sender == owner, WALLET_DOES_NOT_MATCH_OWNER);
        _;
    }

    constructor () public {
        tvm.rawReserve(MIN_MESSAGE, 0);
        farmingSpeed = 100;
        ITokenRoot(tokenRootAddress).deployWallet{value: 0, flag: 128, callback: FarmingWallet.onDeploy}(
            address(this),
            DEPLOY_VALUE
        );
    }

    function onDeploy(address gWallet) external {
        require(msg.sender == tokenRootAddress, WALLET_DOES_NOT_MATCH_OWNER);
        tvm.rawReserve(0, 4);
        tokenWallet = gWallet;
        tvm.log(format("Farming account: {}", address(this)));
        tvm.log(format("Farming wallet: {}", tokenWallet));
        IPBGame(game).askFarmingSpeed{value: 0.1 ton}(owner);
        emit OperationCompleted("farmingWalletCreated", owner, 0, now, 0);
        owner.transfer({ value: 0, flag: 128 });

    }

    function onAcceptTokensTransfer(
        address,
        uint128 amount,
        address sender,
        address ,
        address ,
        TvmCell
    ) override external {
        require(msg.sender == tokenWallet, WRONG_NOTIFICATION_SENDER);
        tvm.rawReserve(0, 4);
        notifyBalanceChange();
        _balance += amount;
        emit OperationCompleted("farmingBalanceUpdated", sender, 0, now, _balance);
        IPBGame(game).notifyBalanceChange{value: 0, flag: 128}(owner, _balance);
    }

    function releaseTokens(uint128 amount) external onlyOwnerSender {
        tvm.rawReserve(0, 4);
        notifyBalanceChange();
        _balance -= amount;
        TvmCell payload;
        ITokenWallet(tokenWallet).transfer{value: 0.3 ton}(
            amount,
            owner,
            0 ton,
            owner,
            true,
            payload
        );
        emit OperationCompleted("farmingBalanceUpdated", owner, 0, now, _balance);
        IPBGame(game).notifyBalanceChange{value: 0, flag: 128}(owner, _balance);
    }

    function setFarmingSpeed(uint128 newSpeed) external internalMsg {
        require(msg.sender == game, WALLET_DOES_NOT_MATCH_OWNER);
        tvm.rawReserve(0, 4);
        farmingSpeed = newSpeed;
        tvm.log(format("Farming speed: {}", farmingSpeed));
        owner.transfer({value: 0, flag: 128});
    }

    //
    // Farming functions
    //

    function notifyBalanceChange() private {
        tilesNum = showTiles();
        tilesChangeTime = now;
    }

    function calcFarming(uint128 time, uint128 tokenBalance) public view returns (uint128) {
        if (tokenBalance == 0) {
            return 0;
        }
        return  (time * (100 + 6 * ExpMath.getNumPower(math.divr(tokenBalance, 1e9))) * ExpMath.log_2(1 + math.divr(tokenBalance, 1e9))) / (8 * farmingSpeed);
    }

    function cropTiles(uint128 pNum) private pure returns (uint16) {
        if (pNum > 1024) {
            return 1024;
        }
        return uint16(pNum);
    }

    function showTiles() public view returns (uint16) {
        return cropTiles(tilesNum + calcFarming(now - tilesChangeTime, _balance));
    }

    function claimTiles(address genesis) external onlyOwnerSender {
        tvm.rawReserve(0, 4);
        uint16 existingTiles = showTiles();
        tilesNum = 0;
        tilesChangeTime = now;
        IGenesis(genesis).giveHomage();
        IPBGame(game).onClaimTilesFarming{value: 0, flag: 128, bounce: false}(owner, existingTiles);
    }

}
