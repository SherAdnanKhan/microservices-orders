import {
  GET_CONVERSATION,
  UPDATE_CONVERSATION,
  CLEAR_CONVERSATION,
  GET_ALL_CONVERSATIONS,
  START_FILE_LOADER,
  STOP_FILE_LOADER,
  READ_MESSAGE,
  READ_ALL,
  UPDATE_CONVERSATION_UNREAD_COUNT,
} from "../constants/actionTypes";

const initialState = {
  conversation: null,
  user: null,
  messages: {
    current_page: 1,
    data: [],
    first_page_url: "",
    from: 0,
    last_page: 0,
    last_page_url: "",
    next_page_url: "",
    path: "",
    per_page: "10",
    prev_page_url: null,
    to: 0,
    total: 0
  },
  conversations: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONVERSATION:
      return {
        ...state,
        conversation: action.payload.conversation,
        messages: {
          ...state.messages,
          current_page: action.payload.conversation.messages.current_page,
          data: state?.messages?.data
            ? [...action.payload.conversation.messages.data.reverse(), ...state.messages.data]
            : [action.payload.conversation.messages.data],
          first_page_url: action.payload.conversation.messages.first_page_url,
          from: action.payload.conversation.messages.from,
          last_page: action.payload.conversation.last_page,
          last_page_url: action.payload.conversation.last_page_url,
          next_page_url: action.payload.conversation.messages.next_page_url,
          path: action.payload.conversation.messages.path,
          per_page: action.payload.conversation.messages.per_page,
          prev_page_url: action.payload.conversation.messages.prev_page_url,
          to: action.payload.conversation.messages.to,
          total: action.payload.conversation.messages.total
        },
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
        messages: {
          ...state.messages,
          data: [...state.messages.data, action.payload]
        }
      };
    case UPDATE_CONVERSATION_UNREAD_COUNT:
      return {
        ...state,
        conversations: state?.conversations?.map(conversation => {
          if (conversation.id === action.payload.conversation_id) {
            return {
              ...conversation,
              unread_messages_logs_count: conversation.unread_messages_logs_count + 1,
              last_message: action.payload
            }
          }
          return conversation
        })
      };
    case CLEAR_CONVERSATION:
      return {
        ...state,
        conversation: null,
        messages: {
          current_page: 1,
          data: [],
          first_page_url: "",
          from: 0,
          last_page: 0,
          last_page_url: "",
          next_page_url: "",
          path: "",
          per_page: "10",
          prev_page_url: null,
          to: 0,
          total: 0
        },
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
        messages: {
          ...state.messages,
          data: state?.messages?.data?.map(message => {
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
        }
      };
    case READ_ALL:
      return {
        ...state,
        messages: {
          ...state.messages,
          data: state.messages?.data?.map(message => {
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
        }
      };
    default:
      return state;
  }
}