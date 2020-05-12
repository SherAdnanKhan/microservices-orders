import { GET_ART, ART_SEARCH } from "../constants/actionTypes";

const initialState = {
  artName: null,
  ListOfArts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ART:
      return {
        ...state,
        artName: action.payload
      };
      case ART_SEARCH:
        return {
          ...state,
          ListOfArts: action.payload
        };
    default:
      return state;
  }
}