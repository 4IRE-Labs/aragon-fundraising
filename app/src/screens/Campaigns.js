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
            {campaigns.map(({ title, exchangeRate, minEth, maxEth, endDate }) => (
              <CampaignRow
                title={title}
                exchangeRate={exchangeRate}
                minEth={minEth}
                maxEth={maxEth}
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
