// update location and center
const updateLocationAndCenter = (location) => {
  return (dispatch) => {
    dispatch(updateCenter(location));
    dispatch(updateLocation(location));
  };
};

const updateState = (newState) => {
  return {
    type: 'UPDATE_STATE',
    newState
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

const handleChildMouseUp = (hoverKey, childProps, mouse) =>
  (dispatch, getState) => {
    const {googleMap: {draggingAllowed}} = getState();

    if (!draggingAllowed){
      return;
    }
    dispatch(updateState({
      draggable: true,
    }));
  };


const handleChildMouseDown = (hoverKey, childProps, mouse) =>
  (dispatch, getState) => {
    const {googleMap: {draggingAllowed}} = getState();

    if (!draggingAllowed){
      return;
    }

    dispatch(updateState({
      draggable: false,
      lat: mouse.lat,
      lng: mouse.lng
    }));
  };


const handleChildMouseMove = (hoverKey, childProps, mouse) =>
  (dispatch, getState) => {
    const {googleMap: {draggingAllowed}} = getState();

    if (!draggingAllowed){
      return;
    }

    dispatch(updateState({
      draggable: false,
      lat: mouse.lat,
      lng: mouse.lng
    }));
  };

const updateDragging = (draggingAllowed) =>
  ({
    type: 'UPDATE_DRAGGING',
    draggingAllowed
  });

export default {
  updateCenter, updateLocation, updateLocationAndCenter,
  updateState, handleChildMouseUp, handleChildMouseDown, handleChildMouseMove,
  updateDragging,
};
