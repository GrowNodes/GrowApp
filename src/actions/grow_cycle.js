import {authedApiRequest, API_URL} from '../api/api'
import _ from 'lodash';

import {
    GROW_CYCLE_CREATING,
    GROW_CYCLE_CREATED,
    GROW_CYCLE_CREATE_FAILED,
    GROW_CYCLE_FETCHED,
    GROW_CYCLE_FETCHING,
    GROW_CYCLE_FETCH_FAILED
} from './types.js';



export function createGrowCycle(growCycleObj, node_serial) {
    const body = {"grow_cycle_obj": growCycleObj}
    const request = authedApiRequest('POST', `/nodes/${node_serial}/grow_cycles`, JSON.stringify(body));

    return (dispatch) => {
        dispatch({ type: GROW_CYCLE_CREATING, node_serial});
        return (
            fetch(request)
            .then((response) => {
                return response.json();
            })
            .then(
                (result) => {
                    if (result.status == 201) {
                        dispatch({ type: GROW_CYCLE_CREATED, payload: result })
                    } else {
                        dispatch({ type: GROW_CYCLE_CREATE_FAILED, payload: result.error })
                    }
                    return result
                },
                (error) => {
                    dispatch({ type: GROW_CYCLE_CREATE_FAILED, error })
                    return error
                }
            )
        )
    }
}


// export function fetchGrowCycleIfNeeded(node_serial) {
//     const request = authedApiRequest('GET', `/nodes/${node_serial}/grow_cycles`);

//     return (dispatch, getState) => {
//         if (shouldFetchGrowCycle(getState(), node_serial)) {
//             dispatch({ type: GROW_CYCLE_FETCHING, node_serial });
//             return fetch(request)
//                 .then((response) => {
//                     return response.json();
//                 })
//                 .then(
//                     (result) => {
//                         dispatch({ type: GROW_CYCLE_FETCHED, payload: result })
//                         return result
//                     },
//                     (error) => dispatch({ type: GROW_CYCLE_FETCH_FAILED, error })
//                 );
//         }
//     }
// }

// function shouldFetchGrowCycle(state, node_serial) {
//     if (state.grow_cycles[node_serial]
//         && (state.grow_cycles[node_serial].status == "fetched" || state.grow_cycles[node_serial].status == "fetching")
//     ) {
//         return false
//     } else {
//         return true
//     }
// }