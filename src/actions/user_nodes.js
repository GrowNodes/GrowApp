import {
    USER_NODES_FETCHING,
    USER_NODES_FETCHED,
    USER_NODES_FETCH_FAILED,
    SELECT_USER_NODE,
    SELECT_NODE_TODO_ITEM
} from './types';

import Base from '../util/Base'

// import * as Actions from '../../Nodes/actions/nodes_actions'

export const selectUserNode = serial => ({
  type: SELECT_USER_NODE,
  serial
});

export const selectNodeTodoItem = uuid => ({
  type: SELECT_NODE_TODO_ITEM,
  uuid
});

export function getUserNodes(ctx) {
    return (dispatch) => {
        dispatch({ type: USER_NODES_FETCHING });

        return Base.fetch('grow_nodes', {
            context: ctx,
            asArray: false,
            queries: {
                orderByChild: 'owner_uid',
                equalTo: Base.auth().currentUser.uid
            }
        }).then(data => {
            console.log(data);
            dispatch({ type: USER_NODES_FETCHED, data })
        }).catch(error => {
            console.log(error);
            dispatch({ type: USER_NODES_FETCH_FAILED, error })
        })
    }
}
