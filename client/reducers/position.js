const position = (state = '', action) => {
  switch (action.type) {
    case 'SET_TO_CURRENT_POSITION':
      return action.position;
    default:
      return state
  }
}

export default position;
