import {
  GET_PRIVACIES,
  CHANGE_GALLERY_PRIVACY,
  CHANGE_OTHER_PRIVACY,
  START_PRIVACY_LOADING,
  STOP_PRIVACY_LOADING,
  REQUEST_APPROVED,
  REQUEST_REJECTED,
  SPRFVS_USERS,
  USER_REQUESTS,
  INVITED_USERS
} from "../constants/actionTypes";

const initialState = {
  userGalleries: null,
  privacyTypes: null,
  userOtherPages: null,
  // sprfvsUsers: null,
  // userRequests: null,
  // invitedUsers: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRIVACIES:
      return {
        ...state,
        userGalleries: action.payload.user_galleries,
        privacyTypes: action.payload.privacy_types,
        userOtherPages: action.payload.user_other_pages
      };
    case CHANGE_GALLERY_PRIVACY:
      return {
        ...state,
        userGalleries: state.userGalleries.map(gallery => {
          return gallery.id === action.payload.privacy_id ? { ...gallery, privacy: action.payload } : gallery;
        })
      };
    case CHANGE_OTHER_PRIVACY:
      return {
        ...state,
        userOtherPages: state.userOtherPages.map(other => {
          return other.id === action.payload.privacy_id ? { ...other, privacy: action.payload } : other;
        })
      };
    case START_PRIVACY_LOADING:
      return {
        ...state,
        loading: true
      };
    case STOP_PRIVACY_LOADING:
      return {
        ...state,
        loading: false
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
};

