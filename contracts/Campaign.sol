pragma solidity ^0.4.0;

import "@aragon/os/contracts/lib/minime/MiniMeToken.sol";
import "@aragon/os/contracts/lib/zeppelin/math/SafeMath.sol";
import "@aragon/os/contracts/lib/zeppelin/math/SafeMath64.sol";

contract Campaign {

    /// Libs
    using SafeMath for uint256;
    using SafeMath64 for uint64;

    MiniMeToken public token;

    bool    public executed;
    uint64  public endDate;
    string  public title;
    string  public metadata;
    uint256 public ethRaised;
    address public creator;
    uint256 public target;
    uint256 public cap;
    uint256 public tokenPrice;
    uint256 public availableTokens;
    uint256 public campaignId;

    event EthRaised(
        uint256 indexed campaignId
    );

    function Campaign(MiniMeToken _token, string _title, uint64 _endDate, uint256 _tokenPrice, uint256 _target, uint256 _cap, uint256 _campaignId){
        token       = _token;
        creator     = msg.sender;
        title       = _title;
        endDate     = _endDate;
        tokenPrice  = _tokenPrice;
        target      = _target;
        cap         = _cap;
        campaignId  = _campaignId;
    }

    function() public payable {
        uint256 weiAmount = msg.value;
        ethRaised = ethRaised.add(weiAmount);
        EthRaised(campaignId);
    }
}
