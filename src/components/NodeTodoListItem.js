import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {ListItem, Icon} from 'react-onsenui';
import {platform} from 'onsenui';

import {selectNodeTodoItem} from '../actions/user_nodes';

import NodeTodoItemPage from '../containers/NodeTodoItemPage'

class NodeTodoListItem extends Component {
  render(){
    return (
      <ListItem onClick={() => {
        this.props.selectNodeTodoItem(this.props.uuid);
        this.props.navigator.pushPage({component: NodeTodoItemPage});
      }} tappable>
        <div className='center'>
          <div className='list__item__title'>
            {this.props.title}
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
