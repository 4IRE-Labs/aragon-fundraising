import Aragon from '@aragon/client'
const app = new Aragon();
import { combineLatest } from './rxjs'
import campaignContract from "../../build/contracts/Campaign"
import {empty} from 'rxjs/observable/empty'

console.log("Apiary script loaded");


function updateObservables(newObservables = [empty()]) {
  app.store(async (state, { event, returnValues }) => {

    console.log("!!!!!!! app.store: " + JSON.stringify(event));

    let nextState = {
      ...state,
    };

    switch (event) {
      case 'StartCampaign':
        nextState = await startCampaign(nextState, returnValues['campaignId']);
        break;
      case 'EthRaised':
        nextState = await updateCampaignEthRaised(nextState, returnValues['campaignId']);
        break;
      default:
        break
    }

    console.log("nextState: " + JSON.stringify(nextState));
    return nextState
  }, newObservables);
}

updateObservables();

/***********************
 *                     *
 *   Event Handlers    *
 *                     *
 ***********************/

async function startCampaign(state, campaignId) {

  const { campaigns = [] } = state;
  const campaignIndex = campaigns.findIndex(campaign => campaign.id === campaignId);

  let campaign = await loadCampaign(campaignId);
  if (campaignIndex === -1) {
    campaigns.push(campaign);
    const campaignInstance = app.external(campaign.campaignAddress, campaignContract.abi);
    updateObservables([campaignInstance.events()]);
  } else {
    campaigns[campaignIndex] = campaign;
  }

  return {
    ...state,
    campaigns: campaigns
  }
}

async function updateCampaignEthRaised(state, campaignId) {
  const { campaigns = [] } = state;
  const campaignIndex = campaigns.findIndex(campaign => campaign.id === campaignId);
  if (campaignIndex !== -1) {
    let campaign = await loadCampaign(campaignId);
    campaigns[campaignIndex] = campaign;
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
        campaign = marshallCampaign(campaignId, campaign, metadata);
        resolve(campaign);
      });
  });
}

function marshallCampaign (campaignId, {title, endDate, tokenPrice, target, cap, ethRaised, executed, creator, availableTokens, campaignAddress}, metadata) {

  return {
    id:               campaignId,
    executed:         executed,
    endDate:          parseInt(endDate, 10) * 1000,
    title:            title,
    metadata:         metadata,
    ethRaised:        parseFloat(ethRaised)  / 1000000000000000000.0,
    creator:          creator,
    target:           parseFloat(target)     / 100000000.0,
    cap:              parseFloat(cap)        / 100000000.0,
    tokenPrice:       parseFloat(tokenPrice) / 100000000.0,
    availableTokens:  availableTokens,
    campaignAddress:  campaignAddress
  }
}
