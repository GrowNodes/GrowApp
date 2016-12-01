import {
    USER_NODES_FETCHING,
    USER_NODES_FETCHED,
    USER_NODES_FETCH_FAILED
} from './types';

import {authedApiRequest, API_URL} from '../api/api'

import reactCookie from 'react-cookie';
import {API_SERVER} from '../api/api.js';

// import * as Actions from '../../Nodes/actions/nodes_actions'


export function getUserNodesIfNeeded() {
    return (dispatch, getState) => {
        if (shouldGetUserNodes(getState())) {
            return dispatch(getUserNodes());
        }
        return Promise.resolve();
    }
}

function shouldGetUserNodes(state) {
    const authed = state.auth.authenticated;
    if (state.auth.authenticated) {
        return true;
    }
    return false;
}


function getUserNodes() {
    const request = authedApiRequest('GET', '/nodes');

    return (dispatch) => {
        dispatch({ type: USER_NODES_FETCHING });
        return fetch(request)
            .then((response) => {
                return response.json();
            })
            .then(
                (result) => {
                    var payload = {}
                    for (var i = result.length - 1; i >= 0; i--) {
                        payload[result[i]] = {}
                    }
                    dispatch({ type: USER_NODES_FETCHED, payload })
                },
                (error) => dispatch({ type: USER_NODES_FETCH_FAILED, error })
            );
    }
}
