import reactCookie from 'react-cookie';

import {
    AUTHING_USER,
    AUTHED_USER,
    AUTHFAILED_USER,
    UNAUTH_USER,
    SET_REDIRECT_ON_AUTH,
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

        case UNAUTH_USER:
            return {
                ...state,
                error: null,
                authenticated: false
            }

        case AUTHFAILED_USER:
            reactCookie.remove('authorization');
            return {
                ...state,
                error: action.payload,
                authenticated: false
            }
    }

    return state;
}