import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  AUTH_SUCCESS,
  AUTH_FAIL,
} from './types';
import { getErrors } from './errorActions';
import axios from 'axios';

export const loginAction = (mail, password) => {
  return (dispatch) => {
    const body = { mail, password };
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    // Make the post request
    axios
      .post('/api/auth/login', body, config)
      .then((response) => {
        console.log(response);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: CLEAR_ERRORS,
        });
      })
      .catch((error) => {
        console.log(error.response);
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch(
          getErrors(
            error.response.data.msg || error.response.data.err,
            error.response.status
          )
        );
      });
  };
};

export const authAction = () => {
  return (dispatch) => {
    // Je dois pinger la route auth
    axios
      .get('/api/auth/users')
      .then((response) => {
        dispatch({
          type: AUTH_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: CLEAR_ERRORS,
        });
      })
      .catch((error) => {
        dispatch({
          type: AUTH_FAIL,
        });
        dispatch(getErrors(error.response.data.msg, error.response.status));
      });
  };
};
