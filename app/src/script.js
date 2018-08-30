import Aragon from '@aragon/client'
const app = new Aragon();
import { combineLatest } from './rxjs'

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
    combineLatest(
      app.call("getCampaign", campaignId),
      app.call("getCampaignMetadata", campaignId)
    )
      .first()
      .subscribe(([campaign, title, metadata]) => {
        resolve(marshallCampaign(campaignId, campaign, metadata));
      });
  });
}

function marshallCampaign (campaignId, {title, endDate, tokenPrice, target, cap, ethRaised, executed, creator, availableTokens, campaignAddress}, metadata) {
  console.log("marshall campaign: " + JSON.stringify(metadata));

  return {
    id: campaignId,
    executed: executed,
    endDate: parseInt(endDate, 10) * 1000,
    title: title,
    metadata: metadata,
    ethRaised: ethRaised,
    creator: creator,
    target: target,
    cap: cap,
    tokenPrice: tokenPrice,
    availableTokens: availableTokens,
    campaignAddress: campaignAddress
  }
}
