pragma ton-solidity >= 0.47.0;

import "./PBConstants.sol";

contract GameIndex is PBConstants {

    address public gameAddress;
    uint32 static gameId;

    constructor(address _gameAddress) public {
        require(msg.pubkey() == tvm.pubkey(), WRONG_PUBLIC_KEY);
        tvm.accept();
        gameAddress = _gameAddress;
    }

}
