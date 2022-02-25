pragma ton-solidity >= 0.47.0;

contract AContract {
    TvmCell code;

    function salt() public virtual {
        tvm.accept();
        TvmBuilder salt;
        bool a = false;
        salt.store(a);
        tvm.log(format("Old code: {}", tvm.hash(tvm.code())));
        tvm.log(format("New code: {}", tvm.hash(tvm.setCodeSalt(tvm.code(), salt.toCell()))));
        tvm.setcode(tvm.setCodeSalt(tvm.code(), salt.toCell()));
        tvm.log(format("After code: {}", tvm.hash(tvm.code())));
    }

    function resalt() public virtual {
        tvm.accept();
        TvmBuilder salt;
        tvm.log(format("Old code: {}", tvm.hash(tvm.code())));
        tvm.log(format("New code: {}", tvm.hash(tvm.setCodeSalt(tvm.code(), salt.toCell()))));
        tvm.setcode(tvm.setCodeSalt(tvm.code(), salt.toCell()));
        tvm.log(format("After code: {}", tvm.hash(tvm.code())));
    }

    function getColoredTiles(uint16 tilesNum) private pure returns(uint16[] colorArr) {

        uint16 share = (tilesNum * 8) / 10;
        uint16 rest = tilesNum - (share / 5) * 5;

        for (uint8 i=0; i<5; i++) {
            colorArr.push(share / 5);
        }

        for (uint8 i=0; i<4; i++) {
            uint16 rn = rnd.next(rest);
            rnd.shuffle();
            colorArr[i] += rn;
            rest -= rn;
        }
        colorArr[4] += rest;
    }

    function checkMath(uint16 tilesNum) public returns (uint16[]) {
        uint16[] arr = new uint16[](5);
        uint16[] coloredTiles = getColoredTiles(tilesNum);

        for (uint16 i=0; i<5; i++) {
             arr[i] = math.min(coloredTiles[i] + arr[i], 1024);
        }

        return arr;
    }

    function checkMathInt() public returns (uint) {
        uint a = 123;
        uint b = 5;
        return a / b * 5;
    }

}
