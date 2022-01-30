pragma ton-solidity >= 0.47.0;

import "./PBConstants.sol";

contract GameIndex is PBConstants {

    address public gameAddress;
    uint32 static gameId;

    constructor(address _gameAddress) public {
        optional(TvmCell) optSalt = tvm.codeSalt(tvm.code());
        require(optSalt.hasValue(), WRONG_INDEX_OWNER);
        (address hostAddress) = optSalt
            .get()
            .toSlice()
            .decode(address);
        require(msg.sender == hostAddress);
        tvm.accept();
        gameAddress = _gameAddress;
    }

}
