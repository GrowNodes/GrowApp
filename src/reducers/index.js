import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducer'
import selectedGrowNode from './selectedGrowNode';
import grow_nodes from './grow_nodes';
import dialog from './dialog';

const todoApp = combineReducers({
  auth: authReducer,
  form: formReducer,
  grow_nodes,
  selectedGrowNode,
  dialog
});

export default todoApp;
