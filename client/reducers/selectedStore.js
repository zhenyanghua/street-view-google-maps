const selectedStore = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_STORE':
      return action.latlng
    default:
      return state
  }
}

export default selectedStore;