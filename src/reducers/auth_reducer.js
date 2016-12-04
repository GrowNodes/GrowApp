import {
    AUTHED_USER,
    AUTHFAILED_USER,
    UNAUTH_USER,
} from '../actions/types';

const INITIAL_STATE = {
    error: null,
    authenticated: false
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case AUTHED_USER:

            return {
                ...state,
                error: null,
                authenticated: true
            }

        case AUTHFAILED_USER:
        case UNAUTH_USER:
            return {
                ...state,
                error: null,
                authenticated: false
            }
    }

    return state;
}