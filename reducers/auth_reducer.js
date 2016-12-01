import reactCookie from 'react-cookie';

import {
    AUTHED_USER,
    AUTHFAILED_USER,
    UNAUTH_USER,
    SET_REDIRECT_ON_AUTH,
} from '../actions/types';

const INITIAL_STATE = {
    error: '',
    authenticated: false,
    email: "",
    successPath: null
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case AUTHED_USER:

            return {
                ...state,
                error: '',
                authenticated: true,
                email: action.payload.email,
                successPath: null
            }

        case UNAUTH_USER:
            return {
                ...state,
                error: '',
                authenticated: false,
                email: ""
            }

        case AUTHFAILED_USER:
            reactCookie.remove('authorization');
            reactCookie.remove('email');
            return {...state, error: action.payload}
            
        case SET_REDIRECT_ON_AUTH:
            return {
                ...state,
                successPath: action.payload
            }
    }

    return state;
}