pragma ton-solidity >= 0.58.1;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "../PBConstants.sol";
import "../interfaces/IGameMap.sol";

contract Profile is PBConstants {
    address public static playerAddress;
    address public static gameMapAddress;
    uint128[] public minerals;

    constructor () public {
        minerals = [uint128(0), uint128(0), uint128(0), uint128(0)];
    }

    function receiveCrystals(uint32 gameId, uint8 mineralNumber, uint128 mineralValue) external view {
        tvm.rawReserve(0, 4);
        // A msg.sender pretends that they are a good MapFarm
        TvmCell opData = abi.encode(msg.sender, gameId, mineralNumber, mineralValue);
        IGameMap(gameMapAddress).getMapFarmAddress{value: 0, flag: 128, callback: onVerifyMapFarm}(playerAddress, gameId, opData);
    }

    function onVerifyMapFarm(address correctMapFarmAddress, TvmCell callbackData) public {
        tvm.rawReserve(0, 4);
        require(msg.sender == gameMapAddress, WRONG_SENDER);
        (address msgSender, uint32 gameId, uint8 mineralNumber, uint128 mineralValue) = abi.decode(callbackData, (address, uint32, uint8, uint128));
        tvm.log(format("USERLOG correctMapFarmAddress: {}", correctMapFarmAddress));
        tvm.log(format("USERLOG msgSender: {}", msgSender));
        tvm.log(format("USERLOG gameId: {}", gameId));
        require(correctMapFarmAddress == msgSender, WRONG_SENDER);
        minerals[mineralNumber] = mineralValue;
        playerAddress.transfer({value: 0, flag: 128});
    }

    function _getProfileAddress(address _playerAddress) public view returns (address){
        TvmCell profileState = tvm.buildStateInit({
                    contr: Profile,
                    varInit: {
                        playerAddress: _playerAddress,
                        gameMapAddress: gameMapAddress
                    },
                    pubkey: 0,
                    code: tvm.code()
        });
        return address(tvm.hash(profileState));
    }

    function p2pTransfer(address receiver, uint8 mineralNum, uint128 mineralValue) external internalMsg {
        tvm.rawReserve(0, 4);
        require(minerals[mineralNum] >= mineralValue, WRONG_AMOUNT);
        minerals[mineralNum] -= mineralValue;
        Profile(_getProfileAddress(receiver)).p2pAccept{value: 0, flag: 128}(msg.sender, mineralNum, mineralValue);
    }

    function p2pAccept(address _playerAddress, uint8 mineralNum, uint128 mineralValue) external internalMsg {
        require(msg.sender == _getProfileAddress(_playerAddress), WRONG_SENDER);
        tvm.rawReserve(0, 4);
        minerals[mineralNum] += mineralValue;
        _playerAddress.transfer({value: 0, flag: 128});
    }



}