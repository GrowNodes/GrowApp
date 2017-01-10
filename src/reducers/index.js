import {combineReducers} from 'redux';

import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducer'
import selectedUserNode from './selectedUserNode';
import selectedNodeTodoItem from './selectedNodeTodoItem';
import user_nodes from './user_nodes';
import dialog from './dialog';

function lastAction(state = null, action) {
  return action;
}


const todoApp = combineReducers({
  lastAction,
  auth: authReducer,
  form: formReducer,
  user_nodes,
  selectedUserNode,
  selectedNodeTodoItem,
  dialog
});

export default todoApp;
