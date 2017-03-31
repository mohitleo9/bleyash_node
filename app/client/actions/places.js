import axios from 'axios';
import {API_URL} from '../constants';


const getPlaces = (type) => {
  return (dispatch) => {
    return axios.get(`${API_URL}/places`,
      {
        params: {
          type
        }
      }
    )
      .then((res) => {
        dispatch(getPlacesSuccess(res.data));
      });
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
