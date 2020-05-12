import { GET_FAV_USERS } from "../constants/actionTypes";

const initialState = {
  favouriteUsers: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FAV_USERS:
      return {
        ...state,
        favouriteUsers: action.payload
      };
    default:
      return state;
  }
}