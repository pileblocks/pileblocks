pragma solidity ^0.8.0;

import "../PBGame.sol"

contract PBGameTest is PBGame {
//
//    Functions for testing
//
    function addFakePlayer(address playerAddress, address playerWallet, bool isLast, bool isPrelast) external onlyOwner {
        //TODO: Remove this in prod!
        tvm.accept();
        uint16[] colTiles = [uint16(1000),uint16(1000),uint16(1000),uint16(1000),uint16(1000)];
        playerColors[playerAddress] = colTiles;
        players[playerAddress] = PlayerInfo(playerWallet, 0, isLast, isPrelast, 0);
    }

    function saveImageFragmentTest(uint8 fragmentNum, uint8[][] tiles) external onlyOwner {
        //TODO: Remove this in prod!
        require(status == STATUS_GAME_DRAFT, WRONG_GAME_STATUS);
        require(fragmentNum < uint8(vertFragments * horizFragments), WRONG_FRAGMENT_COUNT);
        require(tiles.length == ROW_COUNT, WRONG_NUM_ROWS);
        tvm.accept();
        for (uint8 i=0; i < ROW_COUNT; i++) {
            require(tiles[i].length == COL_COUNT, WRONG_NUM_COLS);
            for (uint8 j=0; j < COL_COUNT; j++) {
                require(tiles[i][j] > 0 && tiles[i][j] <= maxColors, WRONG_TILE_COLOR);
            }
        }
        template[fragmentNum] = tiles;
    }

    function generateFakePlayers(uint16 playerNum) public {
        tvm.accept();
        rnd.shuffle();
        //TODO: Remove this in prod!

        bool isLast;
        bool isPrelast;

        for (uint8 i=0; i < playerNum; i++) {
            isLast = false;
            isPrelast = false;
            uint256 addr = rnd.next();
            uint64 lastPut = rnd.next(uint64(100));
            uint16 captured = rnd.next(uint16(100));
            if (remainingTiles < captured) {
                captured = remainingTiles;
                remainingTiles = 0;
            }
            else {
                remainingTiles -= captured;
            }
            address playerAddress= address.makeAddrStd(0, addr);
            if (i == 0) {
                isPrelast = true;
            }
            if (i == 1) {
                isLast = true;
            }

            players[playerAddress] = PlayerInfo(playerAddress, captured, isLast, isPrelast, lastPut, 0);

            rnd.shuffle();
            if (remainingTiles == 0) {
                return;
            }
        }
    }
    function cGame(uint128 totalReward) external {
        //TODO: Remove this in prod!
        tvm.accept();
        uint16 _totalTiles = uint16(ROW_COUNT) * uint16(COL_COUNT) * uint16(vertFragments * horizFragments);
        rewardLastPlayer(totalReward);
        rewardPrelastPlayer(totalReward);
        totalReward = (totalReward / 100) * 85;
        calculateRewards(totalReward, _totalTiles);
    }


    function addFakePlayer(address playerAddress, address playerWallet, bool isLast, bool isPrelast) external {
        //TODO: Remove this in prod!
        tvm.accept();
        players[playerAddress] = PlayerInfo(playerWallet, 0, isLast, isPrelast, 0, 0);
    }
}
