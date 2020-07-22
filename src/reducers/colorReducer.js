import { CHANGE_COLOR, GET_ALL_FEEL_COLORS } from "../constants/actionTypes";

const initialState = {
  feelColor: '',
  feelColors: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COLOR:
      return {
        ...state,
        feelColor: action.payload
      };
    case GET_ALL_FEEL_COLORS:
      return {
        ...state,
        feelColors: action.payload
      };
    default:
      return state;
  }
}

