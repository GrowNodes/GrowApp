import React from 'react';
import {connect} from 'react-redux';

import {List} from 'react-onsenui';

import UserNodeListItem from './UserNodeListItem';

const UserNodeList = ({user_nodes, navigator}) => (
  <List
    dataSource={Object.keys(user_nodes).map((key) => user_nodes[key])}
    renderRow={(user_node) =>
      <UserNodeListItem
        key={user_node.serial}
        navigator={navigator}
        {...user_node}
      />
    }
  />
);

const mapStateToProps = (state) => ({
  user_nodes: state.user_nodes
});

export default connect(mapStateToProps)(UserNodeList);
