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
                // document.addEventListener("deviceready", () => {
                    console.log(FCMPlugin);
                    FCMPlugin.subscribeToTopic(user.email)
                // }, false);
            } else {
                dispatch({ type: AUTHFAILED_USER });
            }
        })
    }
}