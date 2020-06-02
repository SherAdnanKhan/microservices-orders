import {
  GET_CONVERSATION,
  UPDATE_CONVERSATION,
  CLEAR_CONVERSATION,
  GET_ALL_CONVERSATIONS,
  START_IMAGE_LOADER,
  STOP_IMAGE_LOADER
} from "../constants/actionTypes";

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
    case GET_ALL_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload
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
    case START_IMAGE_LOADER:
      return {
        ...state,
        loading: true
      };
    case STOP_IMAGE_LOADER:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}