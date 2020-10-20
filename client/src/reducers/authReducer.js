import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL,
} from '../actions/types';

const initialState = {
  isAuth: false,
  token: null,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isAuth: true,
        token: action.payload.token,
        user: action.payload.user,
      };

    case LOGIN_FAIL:
    case AUTH_FAIL:
      return {
        isAuth: false,
        token: null,
        user: null,
      };

    case AUTH_SUCCESS:
      return {
        isAuth: true,
        token: action.payload.token,
        user: action.payload.user,
      };

    default:
      return state;
  }
};
