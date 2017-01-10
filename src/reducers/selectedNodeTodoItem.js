import {SELECT_NODE_TODO_ITEM, UNAUTH_USER} from '../actions/types'

const selectedNodeTodoItem = (state = null, action) => {
  switch (action.type) {
    case SELECT_NODE_TODO_ITEM:
      return action.uuid;

    case UNAUTH_USER:
    		return null;

    default:
      return state;
  }
};

export default selectedNodeTodoItem;
