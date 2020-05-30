import { GET_CONVERSATION, UPDATE_CONVERSATION, CLEAR_CONVERSATION } from "../constants/actionTypes";

const initialState = {
  conversation: null,
  user: null,
  messages: [],
  conversations: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONVERSATION:
      return {
        ...state,
        conversation: action.payload.conversation,
        messages: action.payload.conversation.messages,
        user: action.payload.user
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
        messages: [],
        user: null
      };
    default:
      return state;
  }
}