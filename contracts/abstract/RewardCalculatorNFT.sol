pragma ton-solidity >= 0.57.0;

import "../interfaces/IPBGame.sol";
import "../abstract/GameEvents.sol";

abstract contract RewardCalculatorNFT is GameEvents {

    mapping (Sortable => address) mSortablePlayers;

    struct Sortable {
        uint16 value;
        int64 created;
    }

    function calculateRewards() internal pure {
        RewardCalculatorNFT(this).fillSortable{value: 0, flag: 128}(address(0));
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
            RewardCalculatorNFT(this).drawNFT{value: 0, flag: 128}();
            return;
        }
        RewardCalculatorNFT(this).fillSortable{value: 0, flag: 128}(startPlayerAddress);
    }

    function drawNFT() external internalMsg {
        require(msg.sender == address(this), 1110);

        optional(Sortable, address) sPlayer;
        bool success;
        Sortable startSortable;
        sPlayer = mSortablePlayers.max();

        uint128[] winnersShare = new uint128[](3);
        address[] winnersAddress = new address[](3);

        uint128 totalWinnersValue = 0;

        success = sPlayer.hasValue();
        for (uint8 i=0; i < 3; i++) {
            if (success) {
                (Sortable s, address saddr) = sPlayer.get();
                startSortable = s;
                winnersShare[i] = s.value;
                totalWinnersValue += s.value;
                winnersAddress[i] = saddr;
                sPlayer = mSortablePlayers.prev(s);
                success = sPlayer.hasValue();
            }
            else {
                break;
            }
        }
        for (uint8 i=0; i < 3; i++) {
            winnersShare[i] = math.divr(winnersShare[i] * 100, totalWinnersValue);
            tvm.log(format("Place: {}, initial share: {}", i, winnersShare[i]));
        }

        for (uint8 i = 0; i < 3; i++) {
            for (uint j = i + 1; j < 3; j++) {
                winnersShare[i] += winnersShare[j];
            }
            tvm.log(format("Place: {}, final share: {}", i, winnersShare[i]));
        }

        rnd.shuffle();
        uint8 chance = rnd.next(100);

        tvm.log(format("Chance: {}", chance));

        for (uint8 i=2; i >= 0; i--) {
            if (chance < winnersShare[i]) {
                assignReward(winnersAddress[i]);
                break;
            }
        }

        emit RewardsCalculated(now);
        drain();
        return;
    }

    function assignReward(address playerAddress) virtual internal;

    function drain() virtual internal view;

    function getPlayers() virtual internal returns(mapping(address => PlayerInfo));
}

