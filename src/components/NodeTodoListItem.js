import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {ListItem, Icon} from 'react-onsenui';
import {platform} from 'onsenui';

import {selectNodeTodoItem} from '../actions/user_nodes';

import NodeTodoItemPage from '../containers/NodeTodoItemPage'

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
        this.props.selectNodeTodoItem(this.props.uuid);
        this.props.navigator.pushPage({component: NodeTodoItemPage});
      }} tappable>
        <div className='center'>
          <div className='list__item__title'>
            {this.props.text}
          </div>
          <div className='list__item__subtitle'>
            {this.props.uuid}
          </div>
        </div>
      </ListItem>
    );
  };


}

export default connect(undefined, {selectNodeTodoItem})(NodeTodoListItem);
