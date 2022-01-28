pragma ton-solidity >= 0.47.0;

contract GameHost {

    uint64 static nonce;

    uint32 public currentGameId;

    constructor (
                 TvmCell gameCode,
                 TvmCell walletCode,
                 address rootTokenAddress
                )
    public
    {

    }
}
