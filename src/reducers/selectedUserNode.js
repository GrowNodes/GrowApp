import {SELECT_USER_NODE, UNAUTH_USER} from '../actions/types'

const selectedUserNode = (state = null, action) => {
  switch (action.type) {
    case SELECT_USER_NODE:
      return action.serial;

    case UNAUTH_USER:
    		return null;
    
    default:
      return state;
  }
};

export default selectedUserNode;
