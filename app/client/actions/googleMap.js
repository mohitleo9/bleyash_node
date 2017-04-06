// update location and center
const updateLocationAndCenter = (location) => {
  return (dispatch) => {
    dispatch(updateCenter(location));
    dispatch(updateLocation(location));
  };
};

const updateLocation = (location) => {
  return {
    type: 'UPDATE_LOCATION',
    location
  };
};

const updateCenter = (center) => {
  return {
    type: 'UPDATE_CENTER',
    center
  };
};

export {updateCenter, updateLocation, updateLocationAndCenter};
