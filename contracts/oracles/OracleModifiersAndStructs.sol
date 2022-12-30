pragma ton-solidity >= 0.58.1;

abstract contract OracleModifiersAndStructs {

    uint32 constant WRONG_ORACLE_PUBLIC_KEY = 11000;

    modifier onlyOwner() {
        require(tvm.pubkey() == msg.pubkey(), WRONG_ORACLE_PUBLIC_KEY);
        _;
    }

}