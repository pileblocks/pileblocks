pragma ton-solidity >= 0.57.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./PBConstants.sol";

contract GameQueue is PBConstants {

    mapping(uint128 => address) public games;
    uint128 public lastGameNumber;
    address public hostAddress;

    uint64 static _randomNonce;

    constructor (
                address _hostAddress
                )
    public
    {
        tvm.accept();
        lastGameNumber = 0;
        hostAddress = _hostAddress;
    }

    function addGame(address gameAddress) external externalMsg onlyOwner {
        tvm.accept();
        lastGameNumber += 1;
        games[lastGameNumber] = gameAddress;
    }

    function removeGame(uint128 gameNumber) external externalMsg onlyOwner {
        tvm.accept();
        delete games[gameNumber];
    }

    function getNextGame() external responsible returns(address) {
        require(msg.sender == hostAddress, INVALID_GAME_HOST);
        optional(uint128, address) nextGame = games.delMin();
        if (nextGame.hasValue()) {
            (, address tmmGameAddress) = nextGame.get();
            return{value: 0, flag: 64} tmmGameAddress;
        }
        return{value: 0, flag: 64} address(0);
    }


}
