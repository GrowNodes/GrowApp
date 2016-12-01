import React from 'react';
import {connect} from 'react-redux';

import {List} from 'react-onsenui';

import UserNode from './UserNode';

const UserNodeList = ({user_nodes, navigator}) => (
  <List
    dataSource={Object.keys(user_nodes).map((key) => user_nodes[key])}
    renderRow={(user_node) =>
      <UserNode
        key={user_node.id}
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
