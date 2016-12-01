import {
    UNAUTH_USER
} from './types';

import reactCookie from 'react-cookie';


export function signoutUser() {
    reactCookie.remove('authorization');
    reactCookie.remove('email');
    return {type: UNAUTH_USER}
}
