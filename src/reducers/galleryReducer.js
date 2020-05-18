import { GET_GALLERY, FAV_GALLERY, UNFAV_GALLERY, CLEAR_GALLERY } from "../constants/actionTypes";

const initialState = {
  gallery: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GALLERY:
      return {
        ...state,
        gallery: action.payload
      };
    case CLEAR_GALLERY:
      return {
        ...state,
        gallery: action.payload
      };
    case FAV_GALLERY:
      return {
        ...state,
        gallery: {
          ...state.gallery,
          has_faved: action.payload
        }
      };
    case UNFAV_GALLERY:
      return {
        ...state,
        gallery: {
          ...state.gallery,
          has_faved: action.payload
        }
      };
    default:
      return state;
  }
}