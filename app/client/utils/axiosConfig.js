import axios from 'axios';
import {addError, clearErrors} from '../actions/errors';

const regiester = (store) =>{
  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    console.log('error data');
    console.log(error.response);
    store.dispatch(addError(error.response));
    return Promise.reject(error);
  });
};

export default regiester;
