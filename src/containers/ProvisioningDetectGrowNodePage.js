import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import NetworksList from '../components/NetworksList';

import NavBar from '../components/NavBar';
import ProvisioningSelectNetworkPage from './ProvisioningSelectNetworkPage'
import * as provisioningActions from '../actions/provisioning';

import {
  Page,
  Button
} from 'react-onsenui';


class ProvisioningDetectGrowNodePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ssid: null,
      intervalId: null
    }
  }

  componentDidMount() {
     this.getSsid();
     var intervalId = setInterval(this.getSsid.bind(this), 5000);
     // store intervalId in the state so it can be accessed later:
     this.setState({intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  getSsid() {
    // WifiWizard.getCurrentSSID(this.setSsid)
    this.props.fetchSysInfo();
    this.setState({...this.state, ssid: Math.random()})
  }

  render () {
      return (
          <Page renderToolbar={() => <NavBar title={"Provision Grow Node"} navigator={this.props.navigator} backButton={true}/>}>
              <p>Currently connected to SSID: {this.state.ssid}</p>
              <h2>Instructions</h2>
              <p>
                Make sure the blue network status LED on the device is solid blue.<br/>
                Go into your phone's WiFi settings and connect to the WiFi that starts with <b>Grow Nodes</b><br/>
                Return to this page.
              </p>
              <h2>Detected grow node: {this.props.sysinfo.hardware_device_id || "none"}</h2>
              Click the button once the serial number shows up. <br/>
              <Button onClick={() => {this.props.navigator.pushPage({component: ProvisioningSelectNetworkPage})}}>Continue</Button>
          </Page>
      );
  }
}

const mapStateToProps = (state) => ({
  sysinfo: state.provisioning.homieDeviceInfo,
});

export default connect(mapStateToProps, provisioningActions)(ProvisioningDetectGrowNodePage);