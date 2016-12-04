import React, { Component } from 'react';
import {connect} from 'react-redux';

import {List} from 'react-onsenui';

import UserNodeListItem from './UserNodeListItem';
import Base from '../util/Base'

class UserNodeList extends Component {

  constructor(props){
    super(props);
    this.state = {
      user_nodes: []
    };
  }

  componentWillMount() {
    Base.bindToState('grow_nodes', {
      context: this,
      state: 'user_nodes',
      asArray: true
    });
  }

  render() {
    return (
      <List
        dataSource={this.state.user_nodes}
        renderRow={(user_node) =>
          <UserNodeListItem
            key={user_node.serial}
            navigator={this.props.navigator}
            {...user_node}
          />
        }
      />
    )
  }
};

export default UserNodeList;
