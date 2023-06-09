pragma ton-solidity >= 0.58.1;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./oracles/NftOracle.sol";

contract Oracle is NftOracle {
    uint64 static _nonce;
}