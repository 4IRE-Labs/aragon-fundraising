import React from "react";
import { Button, Field, SafeLink, SidePanelSplit, Text, theme, Countdown } from "@aragon/ui";
import styled from "styled-components";
import PropTypes from 'prop-types'
import provideNetwork from '../../utils/provideNetwork'
import ProgressBar from "../ProgressBar";

class CampaignPanelContent extends React.Component {

  static propTypes = {
    app: PropTypes.object.isRequired,
  };

  render() {
    const {
      network: { etherscanBaseUrl },
      campaign
    } = this.props;

    const {
        id,
        executed,
        endDate,
        title,
        metadata,
        ethRaised,
        creator,
        target,
        cap,
        tokenPrice,
        availableTokens,
        campaignAddress
    } = campaign;

    const progress = (ethRaised / target); //0.5

    return (
      <div>
        <SidePanelSplit>
          <div>
            <h2>
              <Label>Time Remaining:</Label>
            </h2>
            <Countdown end={endDate}/>
          </div>
          <div>
            <h2>
              <Label>Token Price:</Label>
            </h2>
            <div>{tokenPrice} ETH</div>
          </div>
        </SidePanelSplit>
        <div>
          <Part>
            <h2>
              <Label>Name:</Label>
            </h2>
            <div>{title}</div>
            <ProgressBar progress={progress} minValue={`0 ETH`} maxValue={`${target} ETH`}/>
          </Part>
        </div>
        <SidePanelSplit>
          <div>
            <h2>
              <Label>Available Tokens:</Label>
            </h2>
            <div>{`${availableTokens} ANT`}</div>
          </div>
          <div>
            <h2>
              <Label>Target:</Label>
            </h2>
            <div>{`${target} ETH`}</div>
          </div>
        </SidePanelSplit>
        <SidePanelSplit>
          <div>
            <h2>
              <Label>CAP:</Label>
            </h2>
            <div>{`${cap} ETH`}</div>
          </div>
          <div>
            <h2>
              <Label>Currently Raised:</Label>
            </h2>
            <div>{`${ethRaised} ETH`}</div>
          </div>
        </SidePanelSplit>
        <div>
          <Part>
            <h2>
              <Label>Address:</Label>
            </h2>
            <div>
                <p>
                  <SafeLink
                    href={`${etherscanBaseUrl}/address/${campaignAddress}`}
                    target="_blank"
                  >
                    {campaignAddress}
                  </SafeLink>
              </p>
            </div>
          </Part>
        </div>
      </div>
    );
  }
}

const Label = styled(Text).attrs({
  smallcaps: true,
  color: theme.textSecondary,
})`
  display: block;
  margin-bottom: 10px;
`;

const Part = styled.div`
  padding: 20px 0;
  h2 {
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }
  }
`;


export default provideNetwork(CampaignPanelContent)
