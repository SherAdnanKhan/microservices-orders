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
  RESET_CONVERSATION_COUNT,
  INVITE_PEOPLE_IN_CHAT,
  BLOCK_USER,
  UNBLOCK_USER
} from "../constants/actionTypes";

const initialState = {
  conversation: null,
  is_blocked: null,
  is_viewable: null,
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
        is_blocked: action.payload?.is_blocked,
        is_viewable: action.payload?.is_viewable,
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
        user: action.payload.user,
        conversations:
          state.conversations
            ? state
              ?.conversations
              ?.some(c => c.id === action.payload.conversation.id)
              ? state.conversations
              : [action.payload.conversation, ...state.conversations]
            : null,

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
    case RESET_CONVERSATION_COUNT:
      return {
        ...state,
        conversations: state?.conversations?.map(conversation => {
          if (conversation.id === action.payload.id) {
            return {
              ...conversation,
              unread_messages_logs_count: 0,
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
            if (message.id === action.payload.message.id) {
              return {
                ...message,
                messages_logs: message.messages_logs?.map(log => {
                  if (action.payload.reader.id === log.user_id) {
                    return {
                      ...log,
                      status: 1
                    }
                  } else {
                    return log
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
    //if there is no new user added then state will store previous conversation otherwise it will store new conversation
    case INVITE_PEOPLE_IN_CHAT:
      const found = state.conversations.some(conversation => conversation.id === action.payload.id);

      if (!found) {
        return {
          ...state,
          conversations: [action.payload, ...state.conversations]
        }
      }

      return {
        ...state,
        conversations: state.conversations
          ?.map(conversation => {
            if (conversation.id === action.payload.id) {
              return {
                ...conversation,
                participants: action.payload.participants
              }
            }
            return conversation
          }),
        conversation: action.payload
      }
    case BLOCK_USER:
      return {
        ...state,
        is_blocked: action.payload,
        is_viewable: false
      }
    case UNBLOCK_USER:
      return {
        ...state,
        is_blocked: action.payload,
        is_viewable: true
      }
    default:
      return state;
  }
}