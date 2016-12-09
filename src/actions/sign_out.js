import {
    UNAUTH_USER
} from './types';
import Base from '../util/Base'

export function signoutUser() {
	Base.unauth()
    return {type: UNAUTH_USER}
}
