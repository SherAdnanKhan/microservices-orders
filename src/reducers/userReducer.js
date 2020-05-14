import { GET_FAV_USERS, GET_ALL_USERS } from "../constants/actionTypes";

const initialState = {
  favouriteUsers: null,
  users: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FAV_USERS:
      return {
        ...state,
        favouriteUsers: action.payload
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
}