import { ART_SEARCH, CLEAR_ART, CHILD_ART_SEARCH, CLEAR_CHILD_ART } from "../constants/actionTypes";

const initialState = {
  ListOfArts: null,
  childArts: null,
  ListOfGalleries: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ART_SEARCH:
      return {
        ...state,
        ListOfArts: action.payload
      };
    case CHILD_ART_SEARCH:
      return {
        ...state,
        childArts: action.payload
      };
    case CLEAR_ART:
      return {
        ...state,
        ListOfArts: null
      }
    case CLEAR_CHILD_ART:
      return {
        ...state,
        childArts: null
      }
    default:
      return state;
  }
}