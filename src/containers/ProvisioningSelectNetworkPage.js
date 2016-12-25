import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import NetworksList from '../components/NetworksList';

import NavBar from '../components/NavBar';

import * as provisioningActions from '../actions/provisioning';

import {
  Page,
  Button
} from 'react-onsenui';


class ProvisioningSelectNetworkPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ssid: null,
      intervalId: null
    }
  }

  componentDidMount() {
     this.getNetworks();
     var intervalId = setInterval(this.getNetworks.bind(this), 5000);
     // store intervalId in the state so it can be accessed later:
     this.setState({intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  getNetworks() {
    // WifiWizard.getCurrentSSID(this.setSsid)
    this.props.fetchNetworksList();
    this.setState({...this.state, ssid: Math.random()})
  }

  render () {
      return (
          <Page renderToolbar={() => <NavBar title={"Select a WiFi"} navigator={this.props.navigator} backButton={true}/>}>
              <p>
                Currently connected to SSID: {this.state.ssid}<br/>
                Provisioning grow node: {this.props.sysinfo.hardware_device_id}
              </p>
              <NetworksList navigator={this.props.navigator} />
          </Page>
      );
  }
}

const mapStateToProps = (state) => ({
  sysinfo: state.provisioning.homieDeviceInfo
});

export default connect(mapStateToProps, provisioningActions)(ProvisioningSelectNetworkPage);