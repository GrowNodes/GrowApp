import {combineReducers} from 'redux';

import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducer'
import selectedUserNode from './selectedUserNode';
import user_nodes from './user_nodes';
import provisioning from './provisioning';
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
  provisioning,
  dialog
});

export default todoApp;
