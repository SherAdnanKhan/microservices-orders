import {
  GET_FAV,
  GET_ALL_USERS,
  GET_FAV_USER,
  GET_FAV_BY_USER,
  GET_USER_ART_NAME,
  CLEAR_USERS,
  UPDATE_COUNT,
  GET_ALL_FEELS
} from "../constants/actionTypes";

const initialState = {
  favouriteUsers: null,
  favouriteGalleries: null,
  unreadCount: 0,
  users: null,
  faveUsers: null,
  faveByUsers: null,
  userArtName: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FAV:
      return {
        ...state,
        favouriteUsers: action.payload.all_faved_users,
        favouriteGalleries: action.payload.user_with_faved_galleries,
        unreadCount: action.payload.user_with_count_unread
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
    case GET_FAV_USER:
      return {
        ...state,
        faveUsers: action.payload
      };
    case GET_FAV_BY_USER:
      return {
        ...state,
        faveByUsers: action.payload
      };
    case GET_USER_ART_NAME:
      return {
        ...state,
        userArtName: action.payload
      };
    case UPDATE_COUNT:
      return {
        ...state,
        unreadCount: state.unreadCount + 1
      };
    case GET_ALL_FEELS:
      return {
        ...state,
        feelHistory: action.payload
      };
    default:
      return state;
  }
}