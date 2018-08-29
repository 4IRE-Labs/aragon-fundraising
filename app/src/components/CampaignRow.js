import React from 'react'
import styled from 'styled-components'
import {
  TableRow,
  TableCell,
  Text,
  Countdown
} from '@aragon/ui'

class CampaignRow extends React.Component {
  static defaultProps = {
    title: '',
    ethRaised: 0,
    minEth: 0,
    tokenPrice: 0,
    availableTokens: 0,
    endDate: 0
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
      </TableRow>
    )
  }
}

export default CampaignRow
