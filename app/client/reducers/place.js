export default (state = null, action) => {
  switch (action.type) {
    case 'GET_PLACE_SUCCESS': {
      return Object.assign({}, state, action.place);
    }
    case 'GET_PLACES_FAILURE': {
      return {};
    }
    default:
      return state;
  }
};
