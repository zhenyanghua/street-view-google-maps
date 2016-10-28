const currentListItem = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_LIST_ITEM':
      return action.listitem//action.listItem
    default:
      return state
  }
}

export default currentListItem;
