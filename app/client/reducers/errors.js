const initialStateCreator = () => {
  return {
    list: []
  };
};

export default (state = initialStateCreator(), action) => {
  switch (action.type) {
    case 'ADD_ERROR': {
      return {...state, ...{list: [...state.list, ...[action.error]]}};
    }
    case 'CLEAR_ERRORS': {
      return initialStateCreator();
    }
    default:
      return state;
  }
};

