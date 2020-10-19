import { combineReducers } from 'redux';
import markerReducer from './markerReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  marker: markerReducer,
  error: errorReducer,
  auth: authReducer,
});
