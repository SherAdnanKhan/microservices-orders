import { GET_MY_STUDIO, SELECT_STUDIO_USER } from "../constants/actionTypes";

const initialState = {
  myStudio: null,
  studioUser: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_STUDIO:
      return {
        ...state,
        myStudio: action.payload
      };
    case SELECT_STUDIO_USER:
      return {
        ...state,
        studioUser: action.payload
      };
    default:
      return state;
  }
}