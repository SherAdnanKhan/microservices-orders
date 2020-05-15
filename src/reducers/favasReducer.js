import { GET_FAVES } from "../constants/actionTypes";

const initialState = {
  favasList:[]
  
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVES:
      return {
        ...state,
        favasList: action.payload
      };
    default:
      return state;
  }
}