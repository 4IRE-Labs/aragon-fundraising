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
      campaigns
    } = this.props;

    return (
        <Main>
          <Table
            header={
              <TableRow>
                <TableHeader title="Time Remaining" />
                <TableHeader title="Raise Name" align="right" />
                <TableHeader title="Amount Raised" />
                <TableHeader title="Target" />
                <TableHeader title="Token Price" />
                <TableHeader title="Available Tokens" />
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
                title={title}
                exchangeRate={tokenPrice}
                ethRaised={ethRaised}
                minEth={target}
                tokenPrice={tokenPrice}
                availableTokens={availableTokens}
                endDate={endDate}
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
