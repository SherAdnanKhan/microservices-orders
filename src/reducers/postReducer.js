import { GET_POST } from "../constants/actionTypes";

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
    default:
      return state;
  }
}