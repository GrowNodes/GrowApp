import React, { Component } from 'react';
import {connect} from 'react-redux';
import ProvisioningNetworkConfigForm from './ProvisioningNetworkConfigForm'
import ProvisioningVerifyNetworkPage from './ProvisioningVerifyNetworkPage'
import MainPage from '../components/MainPage';
import * as provisioningActions from '../actions/provisioning'
import _ from 'lodash'
import ons from 'onsenui';
import NavBar from '../components/NavBar';
import {
  Page,
  Toolbar,
  Button,
  Notification
} from 'react-onsenui';

class ProvisioningNetworkConfigPage extends React.Component {
	constructor(props) {
		super(props);
		this.navigator = props.navigator
	}

// https://github.com/OnsenUI/react-onsenui/issues/82#issuecomment-237746900
  handleSubmit(values) {
    console.log(values);
    this.props.setPsk(values.psk)
    this.props.sendTestCreds(this.props.selectedNetwork, values.psk)
    this.props.navigator.pushPage({component: ProvisioningVerifyNetworkPage})
  }


  render() {
    return (
      <Page renderToolbar={() => <NavBar title={"Connect"} navigator={this.props.navigator} backButton={true}/>}>
          Selected wifi network: {this.props.selectedNetwork}
          <ProvisioningNetworkConfigForm onSubmit={this.handleSubmit.bind(this)} />
      </Page>
    );
  }
}


const mapStateToProps = (state) => ({
  selectedNetwork: state.provisioning.objToSend.wifi.ssid
});

export default connect(mapStateToProps, provisioningActions)(ProvisioningNetworkConfigPage);
