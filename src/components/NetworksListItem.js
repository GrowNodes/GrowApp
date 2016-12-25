import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {ListItem, Icon} from 'react-onsenui';

import {platform} from 'onsenui';

import {selectNetwork} from '../actions/provisioning';
// import NodePage from './NodePage';

class NetworksListItem extends Component {
  render(){
    return (
      <ListItem onClick={() => {
        // this.props.selectNetwork(this.props.serial);
        // this.props.navigator.pushPage({component: NodePage});
      }} tappable>
        <div className='center'>
          <div className='list__item__title'>
            {this.props.ssid}
          </div>
          <div className='list__item__subtitle'>
            rssi: {this.props.rssi}
          </div>
        </div>
      </ListItem>
    );
  };
    

}

export default connect(undefined, {selectNetwork})(NetworksListItem);
