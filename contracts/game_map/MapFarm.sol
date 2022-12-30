pragma ton-solidity >= 0.58.1;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "../PBConstants.sol";
import "../interfaces/IProfile.sol";

contract MapFarm is PBConstants {

    uint32 public static gameId;
    address public playerAddress;
    address public mapFarmAddress;

    modifier onlyPlayer() {
        require(msg.sender == playerAddress, WALLET_DOES_NOT_MATCH_OWNER);
        _;
    }

    constructor () public {
        optional(TvmCell) optSalt = tvm.codeSalt(tvm.code());
        require(optSalt.hasValue(), FAILED_TO_EXTRACT_DEPLOY_DATA);
        (address _mapFarmAddress, address _playerAddress) = optSalt
            .get()
            .toSlice()
            .decode(address, address);
        require(msg.sender == _mapFarmAddress, WRONG_SENDER);

        playerAddress = _playerAddress;
        mapFarmAddress = _mapFarmAddress;
    }

    function claim(address _profileAddress) external view onlyPlayer {
        tvm.rawReserve(0, 4);
        IProfile(_profileAddress).receiveCrystals{value: 0, flag: 128}(gameId);
    }

}