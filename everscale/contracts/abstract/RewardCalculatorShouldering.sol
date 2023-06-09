pragma ton-solidity >= 0.57.0;

import "../interfaces/IPBGame.sol";

abstract contract RewardCalculatorShouldering  {

    mapping (Sortable => address)  mSortablePlayers;

    uint128 rewardCoeff;
    uint16 lastTile;
    uint16 numberOfTiles;

    struct Sortable {
        uint16 value;
        int64 created;
    }

    event RewardsCalculated(uint64 timestamp);

    function calculateRewards(uint128 totalReward, uint16 _numberOfTiles) internal returns(address[]){
        numberOfTiles = _numberOfTiles;
        rewardCoeff = totalReward * 2 / (numberOfTiles - 1);
        tvm.log(format("rewardCoeff: {}", rewardCoeff));
        lastTile = 0;
        RewardCalculatorShouldering(this).fillSortable{value: 0, flag: 128}(address(0));
    }

    function fillSortable(address startPlayerAddress) external internalMsg {
        require(msg.sender == address(this), 1110);
        bool success;
        optional(address, PlayerInfo) fPlayer;
        mapping(address => PlayerInfo) tempPlayers = getPlayers();

        if (startPlayerAddress.value == 0) {
            fPlayer = tempPlayers.min();
        }
        else {
            fPlayer = tempPlayers.next(startPlayerAddress);
        }
        success = fPlayer.hasValue();

        for (uint8 i=0; i < 64; i++) {
            if (success) {
                (address pAddress, PlayerInfo pInfo) = fPlayer.get();
                mSortablePlayers[Sortable(pInfo.captured, -int64(pInfo.lastPutTime))] = pAddress;
                fPlayer = tempPlayers.next(pAddress);
                startPlayerAddress = pAddress;
                success = fPlayer.hasValue();
            }
            else {
                break;
            }
        }
        if (!success) {
            RewardCalculatorShouldering(this).distributeRewards{value: 0, flag: 128}(Sortable(0, 0));
            return;
        }
        RewardCalculatorShouldering(this).fillSortable{value: 0, flag: 128}(startPlayerAddress);
    }


    function distributeRewards(Sortable startPlayerSortable) external internalMsg {
        require(msg.sender == address(this), 1110);

        optional(Sortable, address) sPlayer;
        bool success;
        Sortable startSortable;

        if (startPlayerSortable.value == 0) {
            sPlayer = mSortablePlayers.max();
        }
        else {
            sPlayer = mSortablePlayers.prev(startPlayerSortable);
        }
        success = sPlayer.hasValue();
        for (uint8 i=0; i < 5; i++) {
            if (success) {
                (Sortable s, address saddr) = sPlayer.get();
                startSortable = s;
                sendReward(saddr, getRewardPerCaptured(s.value));
                sPlayer = mSortablePlayers.prev(s);
                success = sPlayer.hasValue();
            }
            else {
                break;
            }
        }
         if (!success) {
             emit RewardsCalculated(now);
             drain();
             return;
        }
        RewardCalculatorShouldering(this).distributeRewards{value: 0, flag: 128}(startSortable);
    }

    function getRewardPerCaptured(uint16 capturedTiles) internal returns (uint128) {
        uint128 reward = uint128(capturedTiles) * (numberOfTiles * 2 - uint128(capturedTiles + 1 + 2 * lastTile)) * (rewardCoeff / (numberOfTiles * 2));
        lastTile += capturedTiles;
        return reward;
    }

    function sendReward(address playerAddress, uint128 rewardValue) virtual internal;

    function drain() virtual internal view;

    function getPlayers() virtual internal returns(mapping(address => PlayerInfo));
}

