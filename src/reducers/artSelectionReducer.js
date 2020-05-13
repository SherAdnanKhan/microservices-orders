import { GET_ART, ART_SEARCH,SELECT_USER } from "../constants/actionTypes";

const initialState = {
  artName: null,
  ListOfArts: [],
  selectedArt:[]
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
      case SELECT_USER:
        return {
            ...state,
            selectedArt: action.payload
         };
    default:
      return state;
  }
}