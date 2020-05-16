import { GET_GALLERY, FAV_GALLERY, UNFAV_GALLERY } from "../constants/actionTypes";

const initialState = {
  galleryImages: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GALLERY:
      return {
        ...state,
        galleryImages: action.payload
      };
    case FAV_GALLERY:
      return {
        ...state,
        galleryImages: {
          ...state.galleryImages,
          has_faved: action.payload
        }
      };
    case UNFAV_GALLERY:
      return {
        ...state,
        galleryImages: {
          ...state.galleryImages,
          has_faved: action.payload
        }
      };
    default:
      return state;
  }
}