import React, { Component } from 'react';
import { connect } from 'react-redux';
import {nodeSettingsGetCurrentStage} from '../util'
import Base from '../util/Base'
import TimeAgo from 'react-timeago'

import {List} from 'react-onsenui';
import _ from 'lodash'
import NodeTodoListItem from '../components/NodeTodoListItem'

class NodeTodoList extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
    componentWillMount() {
        this.baseref = Base.bindToState(`grow_nodes/${this.props.selected_user_node}/todo_list`, {
          context: this,
          state: 'todo_list',
          asArray: true,
          queries: {
              orderByChild: 'created_at',
              orderByChild: 'completed_at',
              equalTo: null
          }
        });
    }

    componentWillUnmount(){
      Base.removeBinding(this.baseref);
    }

  render() {
        const todo_list = this.state.todo_list
        if (!todo_list) {
            return <div>Loading todo list...</div>
        }
        if (_.isEmpty(todo_list)) {
          return <p>You don't need to do anything!</p>
        }
        return (
          <List
            dataSource={todo_list}
            renderRow={(list_item) =>
              <NodeTodoListItem
                key={list_item.key}
                navigator={this.props.navigator}
                {...list_item}
                uuid={list_item.key}
              />
            }
          />
        );
  }
}


function mapStateToProps (state) {
    return {selected_user_node: state.selectedUserNode}
}

export default connect(mapStateToProps, null)(NodeTodoList);
