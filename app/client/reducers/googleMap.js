const initialStateCreator = () => {
  // dragging controls the map
  // draggingAllowed controls marker
  return {
    center: {lat: 44.795, lng: 20.469},
    zoom: 11,
    lat: 44.795,
    lng: 20.469,
    draggable: false,
    draggingAllowed: false,
  };
};

// location must have lat and lng
export default (state = initialStateCreator(), {type, location, center, newState} ) => {
  switch (type) {
    case 'UPDATE_LOCATION':
      return {...state, ...location};
    case 'UPDATE_CENTER':
      return {...state, ...{center: center}};
    case 'UPDATE_STATE':
      return {...state, ...newState};
    case 'TOGGLE_DRAGGING':
      return {...state, ...{draggingAllowed: !state.draggingAllowed}};
    default:
      return state;
  }
};
