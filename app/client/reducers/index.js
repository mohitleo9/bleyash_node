// import from here as we are using immutable stuff.
import {combineReducers} from 'redux';
import places from './places';
import place from './place';

export default combineReducers({
  places,
  place
});
