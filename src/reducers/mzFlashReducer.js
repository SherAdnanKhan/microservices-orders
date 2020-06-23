import {
  CREATE_FEED,
  GET_MY_FEEDS,
  GET_USER_FEEDS,
  START_FEEDS_LOADER,
  STOP_FEEDS_LOADER,
  FAVES_FEEDS,
  SPRFVS_FEEDS,
  FAVES_AND_SPRFVS_FEEDS,
  GET_COLLECTIVE_FEEDS
} from "../constants/actionTypes";

const initialState = {
  myFeeds: null,
  collectiveFeeds: null,
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
        myFeeds: action.payload
      };
    case GET_COLLECTIVE_FEEDS:
      console.log(action);
      return {
        ...state,
        collectiveFeeds: action.payload
      };
    case GET_USER_FEEDS:
      return {
        ...state,
        userFeeds: action.payload
      };
    case CREATE_FEED:
      return {
        ...state,
        collectiveFeeds: {
          ...state.collectiveFeeds,
          data: [...state.collectiveFeeds.data, action.payload]
        }
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

