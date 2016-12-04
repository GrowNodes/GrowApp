import {
    AUTHED_USER,
    AUTHFAILED_USER
} from './types';
import Base from '../util/Base'

export function signinUser({email, password}) {
    console.log(email, password);

    return (dispatch, getState) => {

        var authHandler = function(error, user) {
          if (error) {
            dispatch({ type: AUTHFAILED_USER, payload: error })
          } else {
            dispatch({ type: AUTHED_USER, payload: {auth_token: "lollercoaster", email: "asdf@asdf.com" }});
          }
        }

        // Simple email/password authentication
        Base.authWithPassword({email, password}, authHandler);
    }
}