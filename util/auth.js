import {checkAuthIfNeeded} from '../actions/check_auth';

// @todo move these to onEnter
// import {fetchNodes} from '../Nodes/actions/nodes_actions'
// import {mqttConnect} from '../Mqtt/actions/mqtt_actions'

function setRedirect(store, path) {
    store.dispatch({ type: SET_REDIRECT_ON_AUTH, payload: path })
}

export function authenticate(store) {
    return (nextState, replaceState) => {
        const authed = store.getState().auth.authenticated;
        if ( !authed ) {
            setRedirect(nextState.location.pathname);
            replaceState({
                pathname: '/sign_in'
            });
        }
    }
}

export function check_auth(store) {
    return (nextState, replaceState, callback) => {
        store.dispatch(checkAuthIfNeeded())
        .then(() => {
            const authed = store.getState().auth.authenticated;
            if (authed) {
                // store.dispatch(fetchNodes())
                // .then(() => store.dispatch(mqttConnect()) )
            }
        })
        .then(() => {
            callback();
        });
    }
}