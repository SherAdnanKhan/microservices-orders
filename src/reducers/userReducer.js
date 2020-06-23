import {
  GET_FAV,
  GET_ALL_USERS,
  GET_FAV_USER,
  GET_FAV_BY_USER,
  GET_USER_ART_NAME,
  CLEAR_USERS,
  UPDATE_COUNT,
  GET_ALL_FEELS,
  REQUEST_APPROVED,
  REQUEST_REJECTED,
  SPRFVS_USERS,
  USER_REQUESTS,
  INVITED_USERS
} from "../constants/actionTypes";

const initialState = {
  favouriteUsers: null,
  favouriteGalleries: null,
  unreadCount: 0,
  users: null,
  faveUsers: null,
  faveByUsers: null,
  sprfvsUsers: null,
  userRequests: null,
  invitedUsers: null
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
    case SPRFVS_USERS:
      return {
        ...state,
        sprfvsUsers: action.payload
      };
    case USER_REQUESTS:
      return {
        ...state,
        userRequests: action.payload
      };
    case INVITED_USERS:
      return {
        ...state,
        invitedUsers: action.payload
      };
    case REQUEST_APPROVED || REQUEST_REJECTED:
      return {
        ...state,
        userRequests: state.userRequests.filter(user => user.id !== action.payload.user_id)
      };
    default:
      return state;
  }
}