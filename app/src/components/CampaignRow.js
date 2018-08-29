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
    exchangeRate: 0.1,
    minEth: 0.1,
    maxEth: 100.0,
    endDate: Date.now()
  };

  render() {
    const {
      title,
      exchangeRate,
      minEth,
      maxEth,
      endDate,
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
          <Text>0 ETH</Text>
        </TableCell>
        <TableCell>
          <Text>{maxEth} ETH</Text>
        </TableCell>
        <TableCell>
          <Text>{exchangeRate}</Text>
        </TableCell>
        <TableCell>
          <Text>TBC</Text>
        </TableCell>
      </TableRow>
    )
  }
}

export default CampaignRow
