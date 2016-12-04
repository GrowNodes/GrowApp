import {
    USER_NODES_FETCHING,
    USER_NODES_FETCHED,
    USER_NODES_FETCH_FAILED,
    SELECT_USER_NODE
} from './types';

import Base from '../util/Base'

// import * as Actions from '../../Nodes/actions/nodes_actions'

export const selectUserNode = serial => ({
  type: SELECT_USER_NODE,
  serial
});

export function getUserNodesIfNeeded(ctx) {
    return (dispatch, getState) => {
        if (shouldGetUserNodes(getState())) {
            return dispatch(getUserNodes(ctx));
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


function getUserNodes(ctx) {
    return (dispatch) => {
        dispatch({ type: USER_NODES_FETCHING });

        return Base.fetch('grow_nodes', {
            context: ctx,
            asArray: false,
        }).then(data => {
            console.log(data);
            dispatch({ type: USER_NODES_FETCHED, data })
        }).catch(error => {
            console.log(error);
            dispatch({ type: USER_NODES_FETCH_FAILED, error })
        })
    }
}
