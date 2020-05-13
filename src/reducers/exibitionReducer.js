import { ART_SEARCH,GET_GALLERIES } from "../constants/actionTypes";

const initialState = {
  ListOfArts: [],
  ListOfGalleries:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
      case ART_SEARCH:
        return {
          ...state,
          ListOfArts: action.payload
        };
      case GET_GALLERIES:
        return {
          ...state,
          ListOfGalleries: action.payload
        };
    default:
      return state;
  }
}