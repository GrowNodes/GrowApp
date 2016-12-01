import React from 'react';
import {connect} from 'react-redux';

import {List} from 'react-onsenui';

import GrowNode from './GrowNode';

const GrowNodeList = ({grow_nodes, navigator}) => (
  <List
    dataSource={Object.keys(grow_nodes).map((key) => grow_nodes[key])}
    renderRow={(grow_node) =>
      <GrowNode
        key={grow_node.id}
        navigator={navigator}
        {...grow_node}
      />
    }
  />
);

const mapStateToProps = (state) => ({
  grow_nodes: state.grow_nodes
});

export default connect(mapStateToProps)(GrowNodeList);
