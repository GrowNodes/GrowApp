import * as GC_ACTION_TYPES from '../actions/types';

const INITIAL_STATE = {};



export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        default:
            return state;
        case GC_ACTION_TYPES.GROW_CYCLE_CREATED:
        case GC_ACTION_TYPES.GROW_CYCLE_FETCHED:
            return {
            	...state,
            	[action.payload.node_serial]: {...action.payload}
            }
    }
}
