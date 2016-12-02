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



export function createGrowCycle(schedule_id, node_id) {
    const start_at = new Date().toISOString()
    const body = {"grow_cycle": {grow_schedule_id: schedule_id, node_id, start_at}}
    const request = authedApiRequest('POST', `/nodes/${node_id}/grow_cycles`, JSON.stringify(body));

    return (dispatch) => {
        dispatch({ type: GROW_CYCLE_CREATING, node_id});
        return fetch(request)
            .then((response) => {
                return response.json();
            })
            .then(
                (result) => {
                    dispatch({ type: GROW_CYCLE_CREATED, payload: result })
                    return result
                },
                (error) => dispatch({ type: GROW_CYCLE_CREATE_FAILED, error })
            );
    }
}


export function fetchGrowCycleIfNeeded(node_id) {
    const request = authedApiRequest('GET', `/nodes/${node_id}/grow_cycles`);

    return (dispatch, getState) => {
        if (shouldFetchGrowCycle(getState(), node_id)) {
            dispatch({ type: GROW_CYCLE_FETCHING, node_id });
            return fetch(request)
                .then((response) => {
                    return response.json();
                })
                .then(
                    (result) => {
                        dispatch({ type: GROW_CYCLE_FETCHED, payload: result })
                        return result
                    },
                    (error) => dispatch({ type: GROW_CYCLE_FETCH_FAILED, error })
                );
        }
    }
}

function shouldFetchGrowCycle(state, node_id) {
    if (state.grow_cycles[node_id]
        && (state.grow_cycles[node_id].status == "fetched" || state.grow_cycles[node_id].status == "fetching")
    ) {
        return false
    } else {
        return true
    }
}