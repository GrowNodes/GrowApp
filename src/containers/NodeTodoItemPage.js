import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import TimeAgo from 'react-timeago'
import NavBar from '../components/NavBar';
import Base from '../util/Base'

import _ from 'lodash'

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
        this.baseref = Base.syncState(`grow_nodes/${this.props.selected_user_node}/todo_list/${this.props.todo_uid}`, {
          context: this,
          state: 'todo_item',
          asArray: false
        });
    }

    componentWillUnmount(){
      Base.removeBinding(this.baseref);
    }

    setComplete() {
      Base.update(`grow_nodes/${this.props.selected_user_node}/todo_list/${this.props.todo_uid}`, {
        data: {
          ...this.state.todo_item,
          completed_at: new Date
        }
      }).then(() => {
        // Router.transitionTo('dashboard');
      }).catch(err => {
        //handle error
      });
    }

    renderCompleteButton() {
      if (this.state.todo_item.completed_at === undefined) {
        return <Button onClick={this.setComplete.bind(this)}>Mark as done</Button>
      }
    }

    render () {
      const todo_item = this.state.todo_item
      const is_complete = todo_item.completed_at !== undefined

        return (
            <Page renderToolbar={() => <NavBar title={"Todo item"} navigator={this.props.navigator} backButton={true}/>}>
                <h1>
                  {todo_item.title}
                </h1>
                <p>
                  ID: {todo_item.uuid} <br/>
                  Created: {todo_item.created_at} <br/>
                  {is_complete ? `You completed this at: ${todo_item.completed_at} ` : "You haven't done it yet..."}
                </p>
                <p>
                  {todo_item.body}
                </p>
                <p>{this.renderCompleteButton()}</p>
            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
  selected_user_node: state.selectedUserNode,
  todo_uid: state.selectedNodeTodoItem
});

export default connect(mapStateToProps, null)(NodeTodoItemPage);
