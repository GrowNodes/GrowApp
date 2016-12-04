import React, { Component } from 'react';
import {connect} from 'react-redux';

import {List} from 'react-onsenui';

import UserNodeListItem from './UserNodeListItem';

class UserNodeList extends Component {
  render() {
    return (
      <List
        dataSource={Object.keys(this.props.user_nodes).map((key) => this.props.user_nodes[key])}
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


const mapStateToProps = (state) => ({
  user_nodes: state.user_nodes
});

export default connect(mapStateToProps)(UserNodeList);