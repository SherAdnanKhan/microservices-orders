import { SET_ERROR, CLEAR_ERROR } from "../constants.js/actionTypes";

const initialState = {
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
  }
}