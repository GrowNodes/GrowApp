import React, { Component } from 'react';
import {connect} from 'react-redux';

import {List} from 'react-onsenui';

import NetworksListItem from './NetworksListItem';

class NetworksList extends Component {
  render() {
    return (
      <List
        dataSource={this.props.networks}
        renderRow={(network) =>
          <NetworksListItem
            key={network.ssid}
            navigator={this.props.navigator}
            {...network}
          />
        }
      />
    )
  }
};


const mapStateToProps = (state) => ({
  networks: state.provisioning.homieScannedNetworks
});

export default connect(mapStateToProps)(NetworksList);