import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {ListItem, Icon} from 'react-onsenui';
import rssi2percent from 'rssi2percent';
import {platform} from 'onsenui';
import {selectNetwork} from '../actions/provisioning';
import ProvisioningNetworkConfigPage from '../containers/ProvisioningNetworkConfigPage';

class NetworksListItem extends Component {
  render(){
    return (
      <ListItem onClick={() => {
        this.props.selectNetwork(this.props.ssid);
        this.props.navigator.pushPage({component: ProvisioningNetworkConfigPage});
      }} tappable>
        <div className='center'>
          <div className='list__item__title'>
            {this.props.ssid}
          </div>
          <div className='list__item__subtitle'>
            signal strength: {rssi2percent(this.props.rssi)}%
          </div>
        </div>
      </ListItem>
    );
  };
    

}

export default connect(undefined, {selectNetwork})(NetworksListItem);
