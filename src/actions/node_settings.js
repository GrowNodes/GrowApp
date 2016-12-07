import Base from '../util/Base'

import {
    NODE_SETTINGS_CREATING,
    NODE_SETTINGS_CREATED,
    NODE_SETTINGS_CREATE_FAILED,
} from './types.js';


export function createNodeSettings(nodeSettingsObj, node_serial) {
    console.log(nodeSettingsObj)
    return (dispatch) => {
        dispatch({ type: NODE_SETTINGS_CREATING, node_serial});
        return (


            Base.post(`grow_nodes/${node_serial}/settings`, {
                data: nodeSettingsObj
            }).then(() => {
                dispatch({ type: NODE_SETTINGS_CREATED })
                return true;
            }).catch(error => {
                dispatch({ type: NODE_SETTINGS_CREATE_FAILED, error })
                return false;
            })
        )
    }
}