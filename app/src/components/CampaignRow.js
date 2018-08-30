import React from 'react'
import styled from 'styled-components'
import {
  TableRow,
  TableCell,
  Text,
  Countdown,
  IconSettings,
  ContextMenu,
  ContextMenuItem
} from '@aragon/ui'

class CampaignRow extends React.Component {
  static defaultProps = {
    campaignId: 0,
    title: '',
    ethRaised: 0,
    minEth: 0,
    tokenPrice: 0,
    availableTokens: 0,
    endDate: 0,
    onCampaignDetails: () => {},
  };
  handleCampaignDetails = () => {
    const { campaignId, onCampaignDetails } = this.props;
    onCampaignDetails(campaignId);
  };
  render() {
    const {
      title,
      ethRaised,
      minEth,
      tokenPrice,
      availableTokens,
      endDate
    } = this.props;

    return (
      <TableRow>
        <TableCell>
          <Countdown end={endDate}/>
        </TableCell>
        <TableCell>
          <Text>{title}</Text>
        </TableCell>
        <TableCell>
          <Text>{ethRaised} ETH</Text>
        </TableCell>
        <TableCell>
          <Text>{minEth} ETH</Text>
        </TableCell>
        <TableCell>
          <Text>{tokenPrice}</Text>
        </TableCell>
        <TableCell>
          <Text>{availableTokens}</Text>
        </TableCell>
        <TableCell>
          <ContextMenu>
            <ContextMenuItem onClick={this.handleCampaignDetails}>
              <IconSettings />
              <ActionLabel>Details</ActionLabel>
            </ContextMenuItem>
          </ContextMenu>
        </TableCell>
      </TableRow>
    )
  }
}

const ActionLabel = styled.span`
  margin-left: 15px;
`

export default CampaignRow
