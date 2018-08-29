import Aragon from '@aragon/client'
import { combineLatest } from './rxjs'

const app = new Aragon();

app.store(async (state, { event, returnValues }) => {
  let nextState = {
    ...state,
  };

  switch (event) {
    case 'StartCampaign':
      nextState = await startCampaign(nextState, returnValues);
      break;
    default:
      break
  }

  return nextState
});

/***********************
 *                     *
 *   Event Handlers    *
 *                     *
 ***********************/

async function startCampaign(state, { campaignId }) {
  return updateState(state, campaignId, campaign => campaign)
}

/***********************
 *                     *
 *       Helpers       *
 *                     *
 ***********************/

async function loadCampaignDescription(campaign) {
  return campaign
}

function loadCampaignData(campaignId) {
  return new Promise(resolve => {
    combineLatest(
      app.call('getCampaign', campaignId),
      app.call('getCampaignMetadata', campaignId)
    )
      .first()
      .subscribe(([campaign, metadata]) => {
        loadCampaignDescription(campaign).then(campaign => {
          resolve({
            ...marshallCampaign(campaign),
            metadata,
          })
        })
      })
  })
}

async function updateCampaigns(campaigns, campaignId, transform) {
  const campaignIndex = campaigns.findIndex(campaign => campaign.campaignId === campaignId);

  if (campaignIndex === -1) {
    // If we can't find it, load its data, perform the transformation, and concat
    return campaigns.concat(
      await transform({
        campaignId,
        data: await loadCampaignData(campaignId),
      })
    )
  } else {
    const nextCampaigns = Array.from(campaigns);
    nextCampaigns[campaignIndex] = await transform(nextCampaigns[campaignIndex]);
    return nextCampaigns
  }
}

async function updateState(state, campaignId, transform) {
  const { campaigns = [] } = state;
  return {
    ...state,
    campaigns: await updateCampaigns(campaigns, campaignId, transform),
  }
}


// Apply transmations to a campaign received from web3
function marshallCampaign({
                            startDate,
                            endDate,
                            ethRaised,
                            executed,
                            creator
                      }) {
  return {
    startDate: parseInt(startDate, 10) * 1000,
    endDate: parseInt(endDate, 10) * 1000,
    ethRaised,
    executed,
    creator
  }
}
