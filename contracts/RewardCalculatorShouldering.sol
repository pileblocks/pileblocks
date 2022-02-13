pragma ton-solidity >= 0.57.0;

import "./interfaces/IPBGame.sol";

abstract contract RewardCalculatorShouldering  {

    mapping(address => PlayerInfo) public fakePlayers;
    mapping (Sortable => address)  mSortablePlayers;

    uint128 rewardCoeff;
    uint16 lastTile;

    struct Sortable {
        uint16 value;
        int64 created;
    }

    function generateFakePlayers(uint16 playerNum) public {
        tvm.accept();
        rnd.shuffle();

        uint16 remainingTiles = 2048;

        for (uint8 i=0; i < playerNum; i++) {
            uint256 addr = rnd.next();
            uint64 lastPut = rnd.next(uint64(100));
            uint16 captured = rnd.next(uint16(600));
            if (remainingTiles < captured) {
                captured = remainingTiles;
                remainingTiles = 0;
            }
            else {
                remainingTiles -= captured;
            }
            address playerAddress= address.makeAddrStd(0, addr);
            fakePlayers[playerAddress] = PlayerInfo(playerAddress, captured, false, false, lastPut);
            rnd.shuffle();
            if (remainingTiles == 0) {
                return;
            }
        }
    }
    function calculateRewards(uint128 totalReward) external returns(address[]){
        //TODO: remove on prod + make internal
        tvm.accept();

        rewardCoeff = (totalReward / 10235) * 10;
        lastTile = 0;

        RewardCalculatorShouldering(this).fillSortable{value: 0, flag: 128}(address(0));
    }

    function fillSortable(address startPlayerAddress) external internalMsg {
        require(msg.sender == address(this), 1110);
        bool success;
        optional(address, PlayerInfo) fPlayer;

        if (startPlayerAddress.value == 0) {
            fPlayer = fakePlayers.min();
        }
        else {
            fPlayer = fakePlayers.next(startPlayerAddress);
        }
        success = fPlayer.hasValue();

        for (uint8 i=0; i < 64; i++) {
            if (success) {
                (address pAddress, PlayerInfo pInfo) = fPlayer.get();
                mSortablePlayers[Sortable(pInfo.captured, -int64(pInfo.lastPutTime))] = pAddress;
                fPlayer = fakePlayers.next(pAddress);
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
             //TODO: Drain the remaining balance to host
            return;
        }
        RewardCalculatorShouldering(this).distributeRewards{value: 0, flag: 128}(startSortable);
    }

    function getRewardPerCaptured(uint16 capturedTiles) internal returns (uint128) {
        uint128 reward = uint128(capturedTiles) * (2048 * 2 - uint128(capturedTiles + 1 + 2 * lastTile)) * (rewardCoeff / (2048 * 2));
        lastTile += capturedTiles;
        return reward;
    }

    function sendReward(address playerAddress, uint128 rewardValue) virtual internal;
}

