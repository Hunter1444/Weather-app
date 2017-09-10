import { combineReducers } from 'redux';
import currentWeather from './current-weather';
import cityList from './add-city';

export default combineReducers({
  currentWeather,
  cityList
})
