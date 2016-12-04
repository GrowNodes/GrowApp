import {
    UNAUTH_USER
} from './types';

export function signoutUser() {
    return {type: UNAUTH_USER}
}
