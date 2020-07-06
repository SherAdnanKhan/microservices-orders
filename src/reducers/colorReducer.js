import { CHANGE_COLOR } from "../constants/actionTypes";

const initialState = {
  feelColor: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COLOR:
      return {
        ...state,
        feelColor: action.payload
      };
    default:
      return state;
  }
}

