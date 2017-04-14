import fetch from 'isomorphic-fetch';
import {API_URL} from '../constants';


const getPlace = (slug) => {
  return (dispatch) => {
    return fetch(`${API_URL}/places/${slug}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(getPlaceSuccess(json[0]));
        return json[0];
      });
  };
};

const getPlaceSuccess = (place) => {
  return {
    type: 'GET_PLACE_SUCCESS',
    place
  };
};

const getPlaceFailure = () => {
  return {
    type: 'GET_PLACE_FAILURE'
  };
};

export {getPlace, getPlaceSuccess, getPlaceFailure};
