import { GET_CONVERSATION, UPDATE_CONVERSATION, CLEAR_CONVERSATION } from "../constants/actionTypes";

const initialState = {
  conversation: null,
  messages: null,
  conversations: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONVERSATION:
      return {
        ...state,
        conversation: action.payload,
        messages: action.payload.messages
      };
    case UPDATE_CONVERSATION:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    case CLEAR_CONVERSATION:
      return {
        ...state,
        conversation: null,
        messages: null
      };
    default:
      return state;
  }
}