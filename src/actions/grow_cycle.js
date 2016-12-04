import Base from '../util/Base'

import {
    GROW_CYCLE_CREATING,
    GROW_CYCLE_CREATED,
    GROW_CYCLE_CREATE_FAILED,
} from './types.js';


export function createGrowCycle(growCycleObj, node_serial) {
    console.log(growCycleObj)
    return (dispatch) => {
        dispatch({ type: GROW_CYCLE_CREATING, node_serial});
        return (


            Base.post(`grow_nodes/${node_serial}/grow_cycle`, {
                data: growCycleObj
            }).then(() => {
                dispatch({ type: GROW_CYCLE_CREATED })
                return true;
            }).catch(error => {
                dispatch({ type: GROW_CYCLE_CREATE_FAILED, error })
                return false;
            })
        )
    }
}