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
        string  metadata;
        uint64  startDate;
        uint64  endDate;
        uint256 ethRaised;
        bool    executed;
        address creator;
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

    function createCampaign(string _metadata, uint64 _startDate, uint64 _endDate) auth(CREATE_CAMPAIGN) external returns (uint256 campaignId) {
        require(_startDate > now);
        require(_endDate > _startDate);

        campaignId = campaigns.length++;
        Campaign storage campaign = campaigns[campaignId];
        campaign.metadata = _metadata;
        campaign.creator = msg.sender;
        campaign.startDate = _startDate;
        campaign.endDate = _endDate;

        StartCampaign(campaignId);
    }

    function getCampaign(uint256 _campaignId) public view returns (uint64 startDate, uint64 endDate, uint256 ethRaised, bool executed, address creator) {
        Campaign storage campaign = campaigns[_campaignId];

        startDate = campaign.startDate;
        endDate = campaign.endDate;
        ethRaised = campaign.ethRaised;
        executed = campaign.executed;
        creator = campaign.creator;
    }

    function getCampaignMetadata(uint256 _campaignId) public view returns (string) {
        return campaigns[_campaignId].metadata;
    }
}
