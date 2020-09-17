import { ART_SEARCH, CLEAR_ART } from "../constants/actionTypes";

const initialState = {
  ListOfArts: null,
  ListOfGalleries: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ART_SEARCH:
      return {
        ...state,
        ListOfArts: action.payload
      };
    case CLEAR_ART:
      return {
        ...state,
        ListOfArts: null
      }
    default:
      return state;
  }
}