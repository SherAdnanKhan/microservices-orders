import { GET_STROKES } from "../constants/actionTypes";

const initialState = {
  strokes: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STROKES:
      return {
        ...state,
        strokes: action.payload
      };
    default:
      return state;
  }
}