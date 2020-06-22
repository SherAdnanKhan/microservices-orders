import {
  CREATE_FEED,
  GET_MY_FEEDS,
  GET_USER_FEEDS,
  START_FEEDS_LOADER,
  STOP_FEEDS_LOADER,
  FAVES_FEEDS,
  SPRFVS_FEEDS,
  FAVES_AND_SPRFVS_FEEDS
} from "../constants/actionTypes";

const initialState = {
  feeds: null,
  favesFeeds: null,
  sprfvsFeeds: null,
  favesAndSprfvsFeeds: null,
  userFeeds: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_FEEDS:
      return {
        ...state,
        feeds: action.payload
      };
    case GET_USER_FEEDS:
      return {
        ...state,
        userFeeds: action.payload
      };
    case CREATE_FEED:
      return {
        ...state,
        feeds: state.feeds ? [...state.feeds, action.payload] : [action.payload]
      };
    case FAVES_FEEDS:
      return {
        ...state,
        favesFeeds: action.payload
      };
    case SPRFVS_FEEDS:
      return {
        ...state,
        sprfvsFeeds: action.payload
      };
    case FAVES_AND_SPRFVS_FEEDS:
      return {
        ...state,
        favesAndSprfvsFeeds: action.payload
      };
    case START_FEEDS_LOADER:
      return {
        ...state,
        loading: true
      };
    case STOP_FEEDS_LOADER:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

