pragma ton-solidity >= 0.47.0;

contract PBConstants {

    uint16 constant WALLET_DOES_NOT_MATCH_OWNER = 1001;
    uint16 constant PUBLIC_KEY_MISSING = 1002;
    uint16 constant WRONG_PUBLIC_KEY = 1003;
    uint16 constant WRONG_NUM_ROWS = 1004;
    uint16 constant WRONG_NUM_COLS = 1005;
    uint16 constant WRONG_TILE_COLOR = 1006;
    uint16 constant NOT_ENOUGH_TOKENS_TO_PUT_TILE = 1007;
    uint16 constant INVALID_TOKENS_PER_PUT = 1008;
    uint16 constant TOKEN_BALANCE_LOW = 1009;
    uint16 constant FAILED_FETCH_GAME_ID = 1010;
    uint16 constant INVALID_GAME_HOST = 1011;
    uint16 constant WRONG_GAME_STATUS = 1012;
    uint16 constant CALLER_NOT_GAME_HOST = 1013;
    uint16 constant WRONG_INDEX_OWNER = 1014;
    uint16 constant CALLER_NOT_IMAGE_OWNER = 1015;
    uint16 constant WRONG_FRAGMENT_COUNT = 1016;
    uint16 constant MAX_TILES_EXCEEDED = 1017;
    uint16 constant WRONG_ROOT_TOKEN_ADDRESS = 1018;
    uint16 constant WRONG_GAME_ADDRESS = 1019;

    // Game status
    uint8 constant STATUS_GAME_DRAFT = 1;
    uint8 constant STATUS_GAME_IMAGE_READY = 4;
    uint8 constant STATUS_GAME_ACTIVE = 2;
    uint8 constant STATUS_GAME_COMPLETED = 3;

    // Game cell is 16 x 8
    uint8 constant ROW_COUNT = 8;
    uint8 constant COL_COUNT = 16;

    uint8 constant MAX_COLORS = 5;

    // How to position fragments
    uint8 constant VERT_FRAGMENTS = 2;
    uint8 constant HORIZ_FRAGMENTS = 1;

    uint128 constant MIN_PUT_AMOUNT = 1_799_000_000;
    uint128 constant SERVICE_FEE = 500_000_000;

    uint8 constant MAX_PUT_PER_TURN = 50;


}
