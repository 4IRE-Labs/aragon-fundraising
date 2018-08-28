import React from 'react'
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

class App extends React.Component {
  state = {
    newRaiseConfig: {},
    sidepanelOpened: false,
    tokenSettingsLoaded: false,
  };

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

  handleNewRaise = ({  }) => {
    this.handleSidepanelClose()
  };

  render() {
    const {
      newRaiseConfig,
      sidepanelOpened
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
