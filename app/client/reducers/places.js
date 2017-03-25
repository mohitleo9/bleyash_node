const initialStateCreator = () => {
  return {
    list: []
  };
};

const initialState = initialStateCreator();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PLACES_SUCCESS': {
      return Object.assign({}, state, {list: action.places});
    }
    case 'GET_PLACES_FAILURE': {
      return initialStateCreator();
    }
    default:
      return state;
  }
};
