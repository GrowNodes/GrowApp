import {v4 as generateId} from 'node-uuid';

import {queryWeather} from '../api';

export const ADD_GROW_NODE = 'ADD_GROW_NODE';
export const REMOVE_GROW_NODE = 'REMOVE_GROW_NODE';
export const SELECT_GROW_NODE = 'SELECT_GROW_NODE';

export const REQUEST_WEATHER = 'REQUEST_WEATHER';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const SET_FETCH_ERROR = 'SET_FETCH_ERROR';

export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

export const addGrowNode = (name) => ({
  type: ADD_GROW_NODE,
  id: generateId(),
  name
});

export const removeGrowNode = id => ({
  type: REMOVE_GROW_NODE,
  id
});

export const selectGrowNode = id => ({
  type: SELECT_GROW_NODE,
  id
});

export const requestWeather = (id) => ({
  type: REQUEST_WEATHER,
  id
});

export const receiveWeather = (id, data) => ({
  type: RECEIVE_WEATHER,
  id,
  ...data
});

export const setFetchError = id => ({
  type: SET_FETCH_ERROR,
  id
});

export const fetchWeather = (id) => {
  /*
   * This function requests and receives the
   * weather data asynchronously.
   */
  return (dispatch, getState) => {
    const name = getState().grow_nodes[id].name;

    dispatch(requestWeather(id));
    queryWeather(name)
      .catch(() => dispatch(setFetchError(id)))
      .then((data) => dispatch(receiveWeather(id, data)));
  };
};

export const addGrowNodeAndFetchWeather = name => {
  return (dispatch, getState) => {
    const id = dispatch(addGrowNode(name)).id;
    dispatch(fetchWeather(id));
  };
};

export const openDialog = () => ({
  type: OPEN_DIALOG
});

export const closeDialog = () => ({
  type: CLOSE_DIALOG
});
