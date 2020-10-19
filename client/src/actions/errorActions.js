import { CLEAR_ERRORS, GET_ERRORS } from './types';

export const getErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: {
      message: msg,
      status,
      id,
    },
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
