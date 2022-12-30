pragma ton-solidity >= 0.58.1;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "../PBConstants.sol";
import "../interfaces/IGameMap.sol";

contract Profile is PBConstants {
    address public static playerAddress;
    address public static gameMapAddress;
    uint8 public someValue;

    constructor () public {
    }

    function receiveCrystals(uint32 gameId) external view {
        tvm.rawReserve(0, 4);
        // A msg.sender pretends that they are a good MapFarm
        TvmCell opData = abi.encode(msg.sender, gameId);
        IGameMap(gameMapAddress).getMapFarmAddress{value: 0, flag: 128, callback: onVerifyMapFarm}(playerAddress, gameId, opData);
    }

    function onVerifyMapFarm(address correctMapFarmAddress, TvmCell callbackData) public {
        tvm.rawReserve(0, 4);
        require(msg.sender == gameMapAddress, WRONG_SENDER);
        (address _msgSender, uint32 _gameId) = abi.decode(callbackData, (address, uint32));
        tvm.log(format("correctMapFarmAddress: {}", correctMapFarmAddress));
        tvm.log(format("_msgSender: {}", _msgSender));
        tvm.log(format("_gameId: {}", _gameId));
        require(correctMapFarmAddress == _msgSender, WRONG_SENDER);
        someValue += 1;
        playerAddress.transfer({value: 0, flag: 128});
    }

}