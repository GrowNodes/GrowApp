import {combineReducers} from 'redux';

import { reducer as formReducer } from 'redux-form'
import selectedUserNode from './selectedUserNode';
import user_nodes from './user_nodes';
import dialog from './dialog';

function lastAction(state = null, action) {
  return action;
}


const todoApp = combineReducers({
  lastAction,
  form: formReducer,
  user_nodes,
  selectedUserNode,
  dialog
});

export default todoApp;
