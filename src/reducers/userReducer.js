import {
  GET_ALL_USERS,
  GET_FAV_USER,
  GET_FAV_BY_USER,
  GET_USER_ART_NAME,
  CLEAR_USERS,
  GET_ALL_FEELS,
  REQUEST_APPROVED,
  REQUEST_REJECTED,
  SPRFVS_USERS,
  USER_REQUESTS,
  INVITED_USERS,
  GET_FAV_AND_SPRFVS_USERS,
  ONLINE_USERS,
  SET_SEARCH_ERROR,
  CLEAR_SEARCH_ERROR
} from "../constants/actionTypes";

const initialState = {
  users: null,
  faveUsers: null,
  faveByUsers: null,
  sprfvsUsers: null,
  userRequests: null,
  invitedUsers: null,
  faveAndSprfvsUsers: null,
  onlineUsers: [],
  searchError: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
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
    case GET_FAV_AND_SPRFVS_USERS:
      return {
        ...state,
        faveAndSprfvsUsers: action.payload
      };
    case ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.payload
      };
    case SET_SEARCH_ERROR:
      return {
        ...state,
        searchError: "No result found"
      };
    case CLEAR_SEARCH_ERROR:
      return {
        ...state,
        searchError: ""
      }
    default:
      return state;
  }
}