import { GET_MY_STUDIO } from "../constants/actionTypes";

const initialState = {
  myStudio: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_STUDIO:
      return {
        ...state,
        myStudio: action.payload
      };
    default:
      return state;
  }
}