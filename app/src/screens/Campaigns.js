import React from 'react'
import styled from 'styled-components'
import { Table, TableHeader, TableRow } from '@aragon/ui'
import CampaignRow from '../components/CampaignRow'

class Campaigns extends React.Component {
  static defaultProps = {
    campaigns: [],
  };
  render() {
    const {
      campaigns,
      onCampaignDetails
    } = this.props;

    return (
        <Main>
          <Table
            header={
              <TableRow>
                <TableHeader title="Time Remaining" />
                <TableHeader title="Raise Name" />
                <TableHeader title="Amount Raised" />
                <TableHeader title="Target" />
                <TableHeader title="Token Price" />
                <TableHeader title="Available Tokens" />
                <TableHeader title="Actions" />
              </TableRow>
            }
          >
            {campaigns.map(({
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
                            }) => (
              <CampaignRow
                campaignId={id}
                title={title}
                exchangeRate={tokenPrice}
                ethRaised={ethRaised}
                minEth={target}
                tokenPrice={tokenPrice}
                availableTokens={availableTokens}
                endDate={endDate}
                onCampaignDetails={onCampaignDetails}
              />
            ))}
          </Table>
        </Main>
    )
  }
}

const Main = styled.div`
  width: 100%;
`;

export default Campaigns
