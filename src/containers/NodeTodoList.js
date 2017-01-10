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
          asArray: false,
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
            dataSource={Object.keys(this.state.todo_list).map((key) => this.state.todo_list[key])}
            renderRow={(list_item) =>
              <NodeTodoListItem
                key={list_item.uuid}
                navigator={this.props.navigator}
                {...list_item}
                uid={list_item.uuid}
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
