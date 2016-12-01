import {combineReducers} from 'redux';

import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducer'
import selectedUserNode from './selectedUserNode';
import user_nodes from './user_nodes';
import dialog from './dialog';

const todoApp = combineReducers({
  auth: authReducer,
  form: formReducer,
  user_nodes,
  selectedUserNode,
  dialog
});

export default todoApp;
