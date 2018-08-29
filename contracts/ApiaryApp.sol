pragma solidity ^0.4.0;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/os/contracts/lib/minime/MiniMeToken.sol";
import "@aragon/os/contracts/lib/zeppelin/math/SafeMath.sol";
import "@aragon/os/contracts/lib/zeppelin/math/SafeMath64.sol";

contract ApiaryApp is AragonApp {

    /// Libs
    using SafeMath for uint256;
    using SafeMath64 for uint64;

    /// ACL
    bytes32 constant public CREATE_CAMPAIGN = keccak256("CREATE_CAMPAIGN");

    /// Events
    event StartCampaign(uint256 indexed campaignId);

    struct Campaign {
        bool    executed;
        uint64  endDate;
        string  title;
        string  metadata;
        uint256 ethRaised;
        address creator;
        uint256 target;
        uint256 cap;
        uint256 tokenPrice;
        uint256 availableTokens;
    }

    Campaign[] campaigns;
    MiniMeToken public token;

    function initialize(
        MiniMeToken _token
    ) onlyInit external
    {
        initialized();
        token = _token;
        campaigns.length ++;
    }

    function createCampaign(string _title, uint64 _endDate, uint256 _tokenPrice, uint256 _target, uint256 _cap) auth(CREATE_CAMPAIGN) external returns (uint256 campaignId) {
        require(_endDate > now);

        campaignId = campaigns.length++;
        Campaign storage campaign = campaigns[campaignId];
        campaign.creator     = msg.sender;
        campaign.title       = _title;
        campaign.endDate     = _endDate;
        campaign.tokenPrice  = _tokenPrice;
        campaign.target      = _target;
        campaign.cap         = _cap;

        StartCampaign(campaignId);
    }

    function getCampaign(uint256 _campaignId) public view returns (string title, uint64 endDate, uint256 tokenPrice, uint256 target, uint256 cap, uint256 ethRaised, bool executed, address creator, uint256 availableTokens) {
        Campaign storage campaign = campaigns[_campaignId];
        title           = campaign.title;
        endDate         = campaign.endDate;
        tokenPrice      = campaign.tokenPrice;
        target          = campaign.target;
        cap             = campaign.cap;
        ethRaised       = campaign.ethRaised;
        executed        = campaign.executed;
        creator         = campaign.creator;
        availableTokens = campaign.availableTokens;
    }

    function getCampaignMetadata(uint256 _campaignId) public view returns (string) {
        return campaigns[_campaignId].metadata;
    }
}
