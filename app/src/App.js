import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  AragonApp,
  AppBar,
  Button,
  SidePanel,
  observe,
} from '@aragon/ui'
import AppLayout from './components/AppLayout'
import NewRaiseCampaignPanelContent from './components/Panels/NewRaiseCampaignPanelContent'
import EmptyState from './screens/EmptyState'
import Campaigns from './screens/Campaigns'

class App extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
  };
  static defaultProps = {
  };
  state = {
    newRaiseConfig: {},
    sidepanelOpened: false,
    campaigns: []
  };

  componentWillReceiveProps(nextProps) {

  }

  handleAppBarLaunchNewRaise = () => this.handleLaunchNewRaise();
  handleLaunchNewRaise = () => {
    this.setState({
      newRaiseConfig: { },
      sidepanelOpened: true,
    })
  };

  handleSidepanelClose = () => {
    this.setState({
      newRaiseConfig: {},
      sidepanelOpened: false,
    })
  };

  handleNewRaise = ({ title, minEth, maxEth, startDate, endDate }) => {
    const { app } = this.props;
    app.createCampaign(title, Date.now(), Date.now() + 3600);
    this.handleSidepanelClose()
  };

  render() {
    const {
      newRaiseConfig,
      sidepanelOpened,
      campaigns
    } = this.state;

    return (
      <AragonApp publicUrl="./aragon-ui/">
        <AppLayout>
          <AppLayout.Header>
            <AppBar
              title={
                <Title>
                  <span>Apiary</span>
                </Title>
              }
              endContent={
                <Button mode="strong"
                        onClick={this.handleAppBarLaunchNewRaise}
                >
                  New Raise
                </Button>
              }
            />
          </AppLayout.Header>
          <AppLayout.ScrollWrapper>
            <AppLayout.Content>
              {campaigns.length > 0 ? (<Campaigns campaigns={campaigns} />) : (<EmptyState onActivate={this.handleLaunchNewRaise} />)}
            </AppLayout.Content>
          </AppLayout.ScrollWrapper>
        </AppLayout>
        <SidePanel
          title="New Raise Campaign"
          opened={sidepanelOpened}
          onClose={this.handleSidepanelClose}
        >
          <NewRaiseCampaignPanelContent
            onCreateRaisingCampaign={this.handleNewRaise}
            opened={sidepanelOpened}
            {...newRaiseConfig}
          />
        </SidePanel>
      </AragonApp>
    )
  }
}

const Title = styled.span`
	display: flex;
	align-items: center;
	& > span:first-child {
		margin-right: 10px;
	}
`;

export default observe(
  observable => observable.map(state => ({ ...state })),
  {}
)(App)
