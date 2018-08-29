import Aragon from '@aragon/client'
const app = new Aragon();

app.store(async (state, { event, returnValues }) => {

  let nextState = {
    ...state,
  };

  switch (event) {
    case 'StartCampaign':
      nextState = await startCampaign(nextState, returnValues['campaignId']);
      break;
    default:
      break
  }

  console.log("nextState: " + JSON.stringify(nextState));

  return nextState
});

/***********************
 *                     *
 *   Event Handlers    *
 *                     *
 ***********************/

async function startCampaign(state, campaignId) {

  const { campaigns = [] } = state;
  const campaignIndex = campaigns.findIndex(campaign => campaign.id === campaignId);

  if (campaignIndex === -1) {
    var campaign = await loadCampaign(campaignId);
    campaigns.push(campaign);
  }

  return {
    ...state,
    campaigns: campaigns
  }
}

/***********************
 *                     *
 *       Helpers       *
 *                     *
 ***********************/

function loadCampaign(campaignId) {
  console.log("load campaign: " + JSON.stringify(campaignId));
  return new Promise(resolve => {
    app
      .call("getCampaign", campaignId)
      .first()
      .subscribe(campaign => {
        resolve(marshallCampaign(campaignId, campaign));
      });
  });
}

function marshallCampaign (campaignId, {startDate, endDate, ethRaised, executed, creator}) {
  return {
    id: campaignId,
    startDate: startDate,
    endDate: endDate,
    ethRaised: ethRaised,
    executed: executed,
    creator: creator
  }
}
