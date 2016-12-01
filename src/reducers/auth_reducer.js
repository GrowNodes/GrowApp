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
    authenticated: false,
    email: "",
    successPath: null,
    waiting: false
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case AUTHING_USER:
            return {
                ...state,
                waiting: true
            }
        case AUTHED_USER:

            return {
                ...state,
                error: null,
                authenticated: true,
                email: action.payload.email,
                successPath: null,
                waiting: false
            }

        case UNAUTH_USER:
            return {
                ...state,
                error: null,
                authenticated: false,
                email: "",
                waiting: false
            }

        case AUTHFAILED_USER:
            reactCookie.remove('authorization');
            reactCookie.remove('email');
            return {
                ...state,
                error: action.payload,
                authenticated: false,
                email: "",
                waiting: false
            }
            
        case SET_REDIRECT_ON_AUTH:
            return {
                ...state,
                successPath: action.payload
            }
    }

    return state;
}