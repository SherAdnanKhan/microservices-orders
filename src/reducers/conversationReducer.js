import { GET_CONVERSATION } from "../constants/actionTypes";

const initialState = {
  conversation: null,
  conversations: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONVERSATION:
      return {
        ...state,
        conversation: action.payload
      };
    default:
      return state;
  }
}