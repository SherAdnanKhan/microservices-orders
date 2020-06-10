import { GET_PRIVACIES } from "../constants/actionTypes";

const initialState = {
  userGalleries: null,
  privacyTypes: null,
  userOtherPages: null
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
    default:
      return state;
  }
};

