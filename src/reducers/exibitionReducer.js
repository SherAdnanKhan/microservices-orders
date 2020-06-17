import { ART_SEARCH } from "../constants/actionTypes";

const initialState = {
  ListOfArts: [],
  ListOfGalleries: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ART_SEARCH:
      return {
        ...state,
        ListOfArts: action.payload
      };
    default:
      return state;
  }
}