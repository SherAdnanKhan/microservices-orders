import { SET_ERROR, CLEAR_ERROR } from "../constants.js/actionTypes";

export const setError = error => {
  return {
    type: SET_ERROR,
    payload: error
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
    payload: null
  };
};