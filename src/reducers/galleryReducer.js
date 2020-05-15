import { GET_GALLERY } from "../constants/actionTypes";

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
    default:
      return state;
  }
}