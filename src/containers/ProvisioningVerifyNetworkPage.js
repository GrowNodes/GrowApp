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


class ProvisioningVerifyNetworkPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: null
    }
  }

  componentDidMount() {
     this.fetchWifiStatus();
     var intervalId = setInterval(this.fetchWifiStatus.bind(this), 5000);
     // store intervalId in the state so it can be accessed later:
     this.setState({intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  fetchWifiStatus() {
    this.props.fetchWifiStatus();
  }

  renderVerificationStatus() {
    if (this.props.wifistatus == "connected") {
      return (
        <p>Success!</p>
      );
    } else {
      return (
        <p>Verifying wifi connection...</p>
      );
    }
  }

  render () {
      return (
          <Page renderToolbar={() => <NavBar title={"Verifying WiFi connection"} navigator={this.props.navigator} backButton={true}/>}>
              {this.renderVerificationStatus()}
          </Page>
      );
  }
}

const mapStateToProps = (state) => ({
  wifistatus: state.provisioning.homieWifiStatus,
});

export default connect(mapStateToProps, provisioningActions)(ProvisioningVerifyNetworkPage);
