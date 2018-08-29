import React from "react";
import { Button, Field, TextInput, SidePanelSplit, Text, theme } from "@aragon/ui";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const initialState = {
  title: '',
  tokenPrice: 0.1,
  target: 100,
  cap: 1000,
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
  handleTokenPriceChange = event => {
    this.setState({ tokenPrice: event.target.value });
  };
  handleTargetChange = event => {
    this.setState({ target: event.target.value });
  };
  handleCapChange = event => {
    this.setState({ cap: event.target.value });
  };
  handleEndDateChange = event => {
    // this.setState({ endDate: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const {
      title, tokenPrice, target, cap, endDate
    } = this.state;

    this.props.onCreateRaisingCampaign({
      title: title,
      tokenPrice: tokenPrice,
      target: target,
      cap: cap,
      endDate: endDate
    });

  };

  render() {
    const {
      title, tokenPrice, target, cap, endDate
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
                value={tokenPrice}
                onChange={this.handleTokenPriceChange}
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
                  value={target}
                  onChange={this.handleTargetChange}
                  min={0.1}
                  step="any"
                  required
                  wide
                />
              </Field>
              <Field label="Maximum (Cap) IN ETH">
                <TextInput.Number
                  value={cap}
                  onChange={this.handleCapChange}
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
