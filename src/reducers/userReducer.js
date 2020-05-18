import { GET_FAV, GET_ALL_USERS, GET_OTEHR_FAV_USER, GET_USER_ART_NAME, CLEAR_USERS } from "../constants/actionTypes";

const initialState = {
  favouriteUsers: null,
  favouriteGalleries: null,
  users: null,
  otherFavouriteUsers: null,
  userArtName: ""
};


export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FAV:
      return {
        ...state,
        favouriteUsers: action.payload.all_faved_users,
        favouriteGalleries: action.payload.user_with_faved_galleries
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: action.payload
      };
    case GET_OTEHR_FAV_USER:
      return {
        ...state,
        otherFavouriteUsers: action.payload
      };
    case GET_USER_ART_NAME:
      return {
        ...state,
        userArtName: action.payload
      };
    default:
      return state;
  }
}