import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import TimeAgo from 'react-timeago'

import NavBar from '../components/NavBar';

import * as provisioningActions from '../actions/provisioning';

import {
  Page,
  Button
} from 'react-onsenui';


class AddGrowNodePage extends Component {
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
    this.props.fetchNetworksList();
    this.setState({...this.state, ssid: Math.random()})
  }

  render () {
      return (
          <Page renderToolbar={() => <NavBar title={"Add Grow Node"} navigator={this.props.navigator} backButton={true}/>}>
              <h1>Add Grow Node</h1>
              <p>Currently connected to SSID: {this.state.ssid}</p>
              <h2>Detected grow node</h2>
              <p>{JSON.stringify(this.props.sysinfo)}</p>
              <h2>Pick a wifi to connect to: </h2>
              {JSON.stringify(this.props.networks)}
          </Page>
      );
  }
}

const mapStateToProps = (state) => ({
  sysinfo: state.provisioning.homieDeviceInfo,
  networks: state.provisioning.homieScannedNetworks
});

export default connect(mapStateToProps, provisioningActions)(AddGrowNodePage);