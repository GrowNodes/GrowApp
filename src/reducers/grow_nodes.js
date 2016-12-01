import {
  ADD_GROW_NODE,
  REMOVE_GROW_NODE,
  REQUEST_WEATHER,
  RECEIVE_WEATHER,
  SET_FETCH_ERROR
} from '../actions';

const initialState = {
  isFetching: false,
  isInvalid: false,
  temperature: 0,
  icon: -1,
  humidity: 0
};

const grow_node = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GROW_NODE:
      return {
        id: action.id,
        name: action.name,
        ...state
      };
    case REQUEST_WEATHER:
      return {
        ...state,
        isFetching: true,
        isInvalid: false
      };
    case RECEIVE_WEATHER:
      return {
        ...state,
        isFetching: false,
        isInvalid: false,
        ...action
      };
    case SET_FETCH_ERROR:
      return {
        ...state,
        isFetching: false,
        isInvalid: true
      };
    default:
      return state;
  }
};

const grow_nodes = (state = {}, action) => {
  switch (action.type) {
    case ADD_GROW_NODE:
      return {
        ...state,
        [action.id]: grow_node(undefined, action)
      };
    case REMOVE_GROW_NODE:
      const {...rest} = state;
      delete rest[action.id];
      return rest;
    case SET_FETCH_ERROR:
    case REQUEST_WEATHER:
    case RECEIVE_WEATHER:
      return {
        ...state,
        [action.id]: grow_node({...state[action.id]}, action)
      };
    default:
      return state;
  }
};

export default grow_nodes;
