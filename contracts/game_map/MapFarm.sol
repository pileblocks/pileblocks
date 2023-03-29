pragma ton-solidity >= 0.58.1;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "../PBConstants.sol";
import "../interfaces/IProfile.sol";
import "../libraries/ExpMath.sol";
import "../structures/PBStructs.sol";

contract MapFarm is PBConstants {

    uint32 public static gameId;
    address playerAddress;
    address gameMapAddress;

    // Farming values
    uint8 mineralNumber;
    uint128 farmingSpeed;
    uint128 maxSupply;
    uint128 usedSupply;
    uint64 claimTime;

    modifier onlyPlayer() {
        require(msg.sender == playerAddress, WALLET_DOES_NOT_MATCH_OWNER);
        _;
    }

    constructor (uint8 _mineralNumber, uint128 _farmingSpeed, uint128 _maxSupply) public {
        optional(TvmCell) optSalt = tvm.codeSalt(tvm.code());
        require(optSalt.hasValue(), FAILED_TO_EXTRACT_DEPLOY_DATA);
        (address _gameMapAddress, address _playerAddress) = optSalt
            .get()
            .toSlice()
            .decode(address, address);
        require(msg.sender == _gameMapAddress, WRONG_SENDER);

        playerAddress = _playerAddress;
        gameMapAddress = _gameMapAddress;
        mineralNumber = _mineralNumber;
        farmingSpeed = _farmingSpeed;
        maxSupply = _maxSupply;
        claimTime = now;
    }

    function calcFarming() public view returns (uint128) {
        uint64 time = now - claimTime;
        return  math.min((time * (100 + 6 * ExpMath.getNumPower(time)) * ExpMath.log_2(1 + time)) * farmingSpeed / (1000 * 100 * 8), maxSupply - usedSupply);
    }

    function claim(address _profileAddress) external onlyPlayer {
        tvm.rawReserve(0, 4);
        uint128 mineralValue = calcFarming();
        usedSupply += mineralValue;
        claimTime = now;
        IProfile(_profileAddress).receiveCrystals{value: 0, flag: 128}(gameId, mineralNumber, mineralValue);
    }

    function getMapFarmInfo() external view returns(MapFarmInfo) {
        return MapFarmInfo(
            playerAddress,
            gameMapAddress,
            mineralNumber,
            farmingSpeed,
            usedSupply,
            maxSupply
        );
    }

}