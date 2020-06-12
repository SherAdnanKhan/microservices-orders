import {
  GET_MY_STUDIO,
  GET_USER_STUDIO,
  FAV_USER,
  UNFAV_USER,
  UPDATE_BIO,
  ADD_TO_SPRFVS
} from "../constants/actionTypes";

const initialState = {
  myStudio: null,
  userStudio: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_STUDIO:
      return {
        ...state,
        myStudio: action.payload
      };
    case UPDATE_BIO:
      return {
        ...state,
        myStudio: {
          ...state.myStudio,
          user: {
            ...state.myStudio.user,
            bio: action.payload
          }
        }
      };
    case GET_USER_STUDIO:
      return {
        ...state,
        userStudio: action.payload
      };
    case FAV_USER:
      return {
        ...state,
        userStudio: {
          ...state.userStudio,
          has_faved: action.payload,
          favs_count: state.userStudio.favs_count + 1
        }
      };
    case UNFAV_USER:
      return {
        ...state,
        userStudio: {
          ...state.userStudio,
          has_faved: action.payload,
          favs_count: state.userStudio.favs_count - 1
        }
      };
    case ADD_TO_SPRFVS:
      return {
        ...state,
        userStudio: {
          ...state.userStudio,
          is_sprfvs: action.payload
        }
      }
    default:
      return state;
  }
}