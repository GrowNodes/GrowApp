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

  componentDidMount() {
    this.props.startRefreshingNetworksList();
  }

  componentWillUnmount() {
    this.props.stopRefreshingNetworksList();
  }

  render () {
      return (
          <Page renderToolbar={() => <NavBar title={"Select a WiFi"} navigator={this.props.navigator} backButton={true}/>}>
              <p>
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