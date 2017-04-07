const initialStateCreator = () => {
  return {
    center: {lat: 44.795, lng: 20.469},
    zoom: 11,
    lat: 44.795,
    lng: 20.469,
    draggable: false,
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
    default:
      return initialStateCreator();
  }
};
