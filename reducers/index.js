import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'
import selectedLocation from './selectedLocation';
import locations from './locations';
import dialog from './dialog';

const todoApp = combineReducers({
  form: formReducer,
  locations,
  selectedLocation,
  dialog
});

export default todoApp;
