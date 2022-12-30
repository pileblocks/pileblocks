pragma ton-solidity >= 0.58.1;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "../PBConstants.sol";
import "./Profile.sol";
import "./MapFarm.sol";

contract GameMap is PBConstants {

    address public hostAddress;
    TvmCell public profileCode;
    TvmCell public mapFarmCode;

    uint64 static _nonce;

    modifier onlyHost() {
        require(msg.sender == hostAddress, CALLER_NOT_GAME_HOST);
        _;
    }

    /*
        STATE CHANGING FUNCTIONS
    */

    constructor () public {
        tvm.accept();
    }

    function setHostAddress(address _hostAddress) external onlyOwner {
        tvm.accept();
        hostAddress = _hostAddress;
    }

    function setMapFarmCode(TvmCell _mapFarmCode) external onlyOwner {
        tvm.accept();
        mapFarmCode = _mapFarmCode;
    }

    function setProfileCode(TvmCell _profileCode) external onlyOwner {
        tvm.accept();
        profileCode = _profileCode;
    }

    function deployMapFarm(address playerAddress, uint32 gameId) external view onlyHost {
        tvm.rawReserve(0, 4);
        address mapFarm = new MapFarm{
            stateInit: _buildFarmMapState(playerAddress, gameId),
            value: DEPLOY_VALUE
        }();
        tvm.log(format("New mapFarm: {}", mapFarm));
        msg.sender.transfer({value: 0, flag: 128});
    }

    function deployProfile(address playerAddress) external view {
        tvm.rawReserve(0, 4);
        address profile = new Profile{
            stateInit: _buildProfileState(playerAddress),
            value: DEPLOY_VALUE
        }();
        tvm.log(format("New profile: {}", profile));
        msg.sender.transfer({value: 0, flag: 128});
    }

    /*
        SERVICE FUNCTIONS
    */
    function prepareMapFarmCode(address playerAddress) public view returns (TvmCell) {
        TvmBuilder salt;
        salt.store(address(this), playerAddress);
        return tvm.setCodeSalt(mapFarmCode, salt.toCell());
    }

    function getMapFarmHash(address profileAddress) external view returns (string){
        return format("{:x}", tvm.hash(prepareMapFarmCode(profileAddress)));
    }

    function _buildProfileState(address playerAddress) internal view returns(TvmCell) {
        return tvm.buildStateInit({
            contr: Profile,
            varInit: {
                playerAddress: playerAddress,
                gameMapAddress: address(this)
            },
            pubkey: 0,
            code: profileCode
        });
    }

    function _buildFarmMapState(address playerAddress, uint32 gameId) internal view returns(TvmCell) {
        return tvm.buildStateInit({
            contr: MapFarm,
            varInit: {
                gameId: gameId
            },
            pubkey: 0,
            code: prepareMapFarmCode(playerAddress)
        });
    }

    function getProfileAddress(address playerAddress, TvmCell callbackData) external view responsible returns (address, TvmCell) {
        return{value: 0, flag: 64}(address(tvm.hash(_buildProfileState(playerAddress))), callbackData);
    }

    function getMapFarmAddress(address playerAddress, uint32 gameId, TvmCell callbackData) external view responsible returns (address, TvmCell) {
        return{value: 0, flag: 64}(address(tvm.hash(_buildFarmMapState(playerAddress, gameId))), callbackData);
    }
}