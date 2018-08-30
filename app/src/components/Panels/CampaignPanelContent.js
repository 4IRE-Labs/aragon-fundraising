import React from "react";
import { Button, Field, SafeLink, SidePanelSplit, Text, theme, Countdown } from "@aragon/ui";
import styled from "styled-components";
import PropTypes from 'prop-types'
import provideNetwork from '../../utils/provideNetwork'

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
            <div>{tokenPrice}</div>
          </div>
        </SidePanelSplit>
        <div>
          <h2>
            <Label>Name:</Label>
          </h2>
          <div>{title}</div>
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


export default provideNetwork(CampaignPanelContent)
