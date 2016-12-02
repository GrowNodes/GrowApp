import {SELECT_USER_NODE} from '../actions/types'

const selectedUserNode = (state = null, action) => {
  switch (action.type) {
    case SELECT_USER_NODE:
      return action.serial;
    default:
      return state;
  }
};

export default selectedUserNode;
