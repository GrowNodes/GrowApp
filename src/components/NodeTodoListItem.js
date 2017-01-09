import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {ListItem, Icon} from 'react-onsenui';

import {platform} from 'onsenui';

import {selectUserNode} from '../actions/user_nodes';

const styles = {
  onlineIcon: {
    color: '#fff',
    textAlign: 'center',
    width: platform.isAndroid() ? '36px' : '30px',
    height: platform.isAndroid() ? '36px' : '30px',
    lineHeight: platform.isAndroid() ? '36px' : '30px',
    borderRadius: '6px',
    fontSize: platform.isAndroid() ? '16px' : '14px'
  },
};

class NodeTodoListItem extends Component {
  render(){
    return (
      <ListItem onClick={() => {

      }} tappable>
        <div className='center'>
          <div className='list__item__title'>
            {this.props.text}
          </div>
          <div className='list__item__subtitle'>
            Tap for instructions
          </div>
        </div>
      </ListItem>
    );
  };
    

}

export default connect(undefined, {selectUserNode})(NodeTodoListItem);
