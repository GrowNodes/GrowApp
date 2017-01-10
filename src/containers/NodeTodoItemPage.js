import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import TimeAgo from 'react-timeago'
import NavBar from '../components/NavBar';
import Base from '../util/Base'

import {
  Page,
  Button
} from 'react-onsenui';


class NodeTodoItemPage extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
    componentWillMount() {
        this.baseref = Base.bindToState(`grow_nodes/${this.props.selected_user_node}/todo_list/incomplete/${this.props.todo_uid}`, {
          context: this,
          state: 'incomplete_todo_item',
          asArray: false
        });


        this.baseref2 = Base.bindToState(`grow_nodes/${this.props.selected_user_node}/todo_list/complete/${this.props.todo_uid}`, {
          context: this,
          state: 'complete_todo_item',
          asArray: false
        });
    }

    componentWillUnmount(){
      Base.removeBinding(this.baseref);
      Base.removeBinding(this.baseref2);
    }


    render () {
      const todo_item = this.state.incomplete_todo_item === {} ? this.state.complete_todo_item : this.state.incomplete_todo_item
      
        return (
            <Page renderToolbar={() => <NavBar title={"Todo item"} navigator={this.props.navigator} backButton={true}/>}>
                <h1>Todo Item {this.props.todo_uid}</h1>
                <p>
                  Created at {todo_item.created_at}
                </p>
                {JSON.stringify (this.state.complete_todo_item)}
                <p>
                  {todo_item.text}
                </p>
            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
  selected_user_node: state.selectedUserNode,
  todo_uid: state.selectedNodeTodoItem
});

export default connect(mapStateToProps, null)(NodeTodoItemPage);
