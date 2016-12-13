import {
    AUTHED_USER,
    AUTHFAILED_USER
} from './types';
import Base from '../util/Base'

// import * as Actions from '../../Nodes/actions/nodes_actions'

export function bindAuthState() {
    return (dispatch, getState) => {
        Base.auth().onAuthStateChanged((user) => {
            console.log("onAuthStateChanged", user)
            if (user) {
                dispatch({ type: AUTHED_USER});
                if (typeof FCMPlugin !== 'undefined') {
                    FCMPlugin.subscribeToTopic(user.uid)
                }
            } else {
                dispatch({ type: AUTHFAILED_USER });
            }
        })
    }
}