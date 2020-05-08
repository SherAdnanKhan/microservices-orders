import { GET_ART } from "../constants/actionTypes";

const initialState = {
  artName: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ART:
      return {
        ...state,
        artName: action.payload
      };
    default:
      return state;
  }
}