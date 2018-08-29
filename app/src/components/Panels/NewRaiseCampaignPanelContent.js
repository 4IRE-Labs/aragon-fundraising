import React from "react";
import { Button, Field, TextInput, SidePanelSplit, Text, theme } from "@aragon/ui";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const initialState = {
  title: "",
  exchangeRate: 0.1,
  minEth: 0,
  maxEth: 1000,
  endDate: moment()
};

class NewRaiseCampaignPanelContent extends React.Component {
  static defaultProps = {
    onCreateRaisingCampaign: () => { }
  };

  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  componentWillReceiveProps({ opened }) {
    if (!opened && this.props.opened) {
      // Finished closing the panel, so reset its state
      this.setState({ ...initialState });
    }
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };
  handleExchangeRateChange = event => {
    this.setState({ exchangeRate: event.target.value });
  };
  handleMinEthChange = event => {
    this.setState({ minEth: event.target.value });
  };
  handleMaxEthChange = event => {
    this.setState({ maxEth: event.target.value });
  };
  handleEndDateChange = event => {
    // this.setState({ endDate: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const {
      title, exchangeRate, minEth, maxEth, endDate
    } = this.state;

    this.props.onCreateRaisingCampaign({
      title: title,
      exchangeRate: exchangeRate,
      minEth: minEth,
      maxEth: maxEth,
      endDate: endDate
    });

  };

  render() {
    const {
      title, exchangeRate, minEth, maxEth, endDate
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Part>
            <Field label="CAMPAIGN NAME">
              <TextInput
                value={title}
                onChange={this.handleTitleChange}
                required
                wide
              />
            </Field>
            <Field label="PRICE IN ETH">
              <TextInput.Number
                value={exchangeRate}
                onChange={this.handleExchangeRateChange}
                min={0}
                step="any"
                required
                wide
              />
            </Field>
          </Part>
          <Part>
            <h1>
              <Label>Raise Bounds</Label>
            </h1>
            <SidePanelSplit>
              <Field label="Minimum (Target) in ETH">
                <TextInput.Number
                  value={minEth}
                  onChange={this.handleMinEthChange}
                  min={0.1}
                  step="any"
                  required
                  wide
                />
              </Field>
              <Field label="Maximum (Cap) IN ETH">
                <TextInput.Number
                  value={maxEth}
                  onChange={this.handleMaxEthChange}
                  min={0.1}
                  step="any"
                  required
                  wide
                />
              </Field>
            </SidePanelSplit>
          </Part>
          <Part>
            <Field label="Date">
              <DatePicker
                selected={endDate}
                onChange={this.handleEndDateChange}
              />
            </Field>
          </Part>
          <Button mode="strong" type="submit" wide>
            New Raise
          </Button>

        </form>
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

export default NewRaiseCampaignPanelContent;
