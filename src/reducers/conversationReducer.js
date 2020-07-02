import {
  GET_CONVERSATION,
  UPDATE_CONVERSATION,
  CLEAR_CONVERSATION,
  GET_ALL_CONVERSATIONS,
  START_FILE_LOADER,
  STOP_FILE_LOADER,
  READ_MESSAGE,
  READ_ALL,
  UPDATE_CONVERSATION_UNREAD_COUNT
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
    case UPDATE_CONVERSATION_UNREAD_COUNT:
      return {
        ...state,
        conversations: state?.conversations?.map(conversation => {
          if (conversation.id === action.payload.room) {
            return {
              ...conversation,
              unread_messages_logs_count: conversation.unread_messages_logs_count + 1,
              messages: [...conversation.messages, action.payload]
            }
          }
          return conversation
        })
      };
    case CLEAR_CONVERSATION:
      return {
        ...state,
        conversation: null,
        messages: [],
        user: null
      };
    case START_FILE_LOADER:
      return {
        ...state,
        loading: true
      };
    case STOP_FILE_LOADER:
      return {
        ...state,
        loading: false
      };
    case READ_MESSAGE:
      return {
        ...state,
        messages: state.messages?.map(message => {
          if (message.id === action.payload.id) {
            return {
              ...message,
              messages_logs: message.messages_logs?.map(log => {
                return {
                  ...log,
                  status: 1
                }
              })
            }
          }
          return message;
        })
      };
    case READ_ALL:
      return {
        ...state,
        messages: state.messages?.map(message => {
          return {
            ...message,
            messages_logs: message.messages_logs?.map(log => {
              if (log.user_id === action.payload.user.id) {
                return {
                  ...log,
                  status: 1
                }
              }
              return log;
            })
          }
        })
      };
    default:
      return state;
  }
}