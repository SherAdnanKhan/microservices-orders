import { GET_MY_STUDIO, GET_USER_STUDIO } from "../constants/actionTypes";

const initialState = {
  myStudio: null,
  userStudio: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_STUDIO:
      return {
        ...state,
        myStudio: action.payload
      };
    case GET_USER_STUDIO:
      return {
        ...state,
        userStudio: action.payload
      };
    default:
      return state;
  }
}