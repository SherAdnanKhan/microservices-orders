import {
  CREATE_FEED,
  GET_MY_FEEDS,
  START_FEEDS_LOADER,
  STOP_FEEDS_LOADER
} from "../constants/actionTypes";

const initialState = {
  feeds: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_FEEDS:
      return {
        ...state,
        feeds: action.payload
      };
    case CREATE_FEED:
      return {
        ...state,
        feeds: state.feeds ? [...state.feeds, action.payload] : [action.payload]
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

