import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {ListItem, Icon} from 'react-onsenui';

import {platform} from 'onsenui';

import {selectUserNode} from '../actions/user_nodes';
import NodePage from './NodePage';

const styles = {
  weatherIcon: {
    color: '#fff',
    textAlign: 'center',
    width: platform.isAndroid() ? '36px' : '30px',
    height: platform.isAndroid() ? '36px' : '30px',
    lineHeight: platform.isAndroid() ? '36px' : '30px',
    borderRadius: '6px',
    fontSize: platform.isAndroid() ? '16px' : '14px'
  },
};

class UserNodeListItem extends Component {
  render(){
    return (
      <ListItem onClick={() => {
        this.props.selectUserNode(this.props.serial);
        this.props.navigator.pushPage({component: NodePage});
      }} tappable>
        <div className='left'>
          <div style={{...styles.weatherIcon, backgroundColor: this.props["$online"] == "true" ? 'green' : 'red'}}>
          </div>
        </div>
        <div className='center'>
          <div className='list__item__title'>
            {this.props["$name"]}
          </div>
          <div className='list__item__subtitle'>
            S/N: {this.props.serial}
          </div>
        </div>
      </ListItem>
    );
  };
    

}

export default connect(undefined, {selectUserNode})(UserNodeListItem);
