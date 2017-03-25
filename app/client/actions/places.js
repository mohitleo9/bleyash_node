import fetch from 'isomorphic-fetch';
import {API_URL} from '../constants';


const getPlaces = () => {
  return (dispatch) => {
    return fetch(`${API_URL}/places`)
      .then((response) => response.json())
      .then((json) =>
        dispatch(getPlacesSuccess(json))
      );
  };
};

const getPlacesSuccess = (places) => {
  return {
    type: 'GET_PLACES_SUCCESS',
    places
  };
};

const getPlacesFailure = () => {
  return {
    type: 'GET_PLACES_FAILURE'
  };
};

export {getPlaces, getPlacesSuccess, getPlacesFailure};
