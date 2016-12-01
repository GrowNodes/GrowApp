const selectedGrowNode = (state = null, action) => {
  switch (action.type) {
    case 'SELECT_GROW_NODE':
      return action.id;
    default:
      return state;
  }
};

export default selectedGrowNode;
