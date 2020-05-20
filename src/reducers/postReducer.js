import { GET_POST, STROKE_POST, UNSTROKE_POST } from "../constants/actionTypes";

const initialState = {
  post: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        post: action.payload
      };
    case STROKE_POST:
      return {
        ...state,
        post: {
          ...state.post,
          has_stroke: action.payload
        }
      };
    case UNSTROKE_POST:
      return {
        ...state,
        post: {
          ...state.post,
          has_stroke: action.payload
        }
      };
    default:
      return state;
  }
}