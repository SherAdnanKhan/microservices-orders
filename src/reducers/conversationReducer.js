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
  UNBLOCK_USER,
  MUTE_USER,
  UNMUTE_USER,
  START_CONVERSATION_LOADER,
  STOP_CONVERSATION_LOADER,
  START_MESSAGE_LOADER,
  STOP_MESSAGE_LOADER,
  DELETE_MESSAGE,
  DELETE_CONVERSATION
} from "../constants/actionTypes";

const initialState = {
  conversation: null,
  is_blocked: null,
  is_viewable: null,
  is_muted: null,
  is_allowed: null,
  user: null,
  messages: {
    current_page: 1,
    data: [],
    next_page_url: "",
  },
  conversations: {
    current_page: 0,
    data: [],
    next_page_url: null
  },
  conversationLoader: false,
  messageLoader: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONVERSATION:
      return {
        ...state,
        is_blocked: action.payload.is_blocked === undefined ? false : action.payload.is_blocked,
        is_viewable: action.payload.is_viewable === undefined ? true : action.payload.is_viewable,
        is_muted: action.payload.is_muted === undefined ? false : action.payload?.is_muted,
        is_allowed: action.payload.strq_privacy === undefined ? true : action.payload.strq_privacy.is_allowed,

        conversation: action.payload.conversation,
        messages: {
          ...state.messages,
          current_page: action.payload.conversation.messages.current_page,
          data: state?.messages?.data
            ? [...action.payload.conversation.messages.data.reverse(), ...state.messages.data]
            : [action.payload.conversation.messages.data],
          next_page_url: action.payload.conversation.messages.next_page_url,

        },
        user: action.payload.user,
        conversations: {
          ...state.conversations,
          data: state
            .conversations
            .data
            .some(c => c.id === action.payload.conversation.id)
            ? state.conversations.data
            : [action.payload.conversation, ...state.conversations.data]
        }
      };
    case GET_ALL_CONVERSATIONS:
      return {
        ...state,
        conversations: {
          current_page: action.payload.current_page,
          data: action.payload.current_page === 1
            ? action.payload.data
            : [...state.conversations.data, ...action.payload.data],
          // data: action.payload.data,
          next_page_url: action.payload.next_page_url
        }
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
        conversations: {
          ...state.conversations,
          data: state.conversations.data?.map(conversation => {
            if (conversation.id === action.payload.conversation_id) {
              return {
                ...conversation,
                unread_messages_logs_count: conversation.unread_messages_logs_count + 1,
                last_message: action.payload
              }
            }
            return conversation
          })
        }
      };
    case RESET_CONVERSATION_COUNT:
      return {
        ...state,
        conversations: {
          ...state.conversations,
          data: state.conversations.data.map(conversation => {
            if (conversation.id === action.payload.id) {
              return {
                ...conversation,
                unread_messages_logs_count: 0,
              }
            }
            return conversation
          })
        }
      };
    case CLEAR_CONVERSATION:
      return {
        ...state,
        conversation: null,
        messages: {
          current_page: 1,
          data: [],
          next_page_url: "",
        },
        user: null,
        is_blocked: null,
        is_viewable: null
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
    case DELETE_CONVERSATION:
      return {
        ...state,
        conversations: {
          ...state.conversations,
          data: state.conversations.data.filter(conversation => conversation.id !== action.payload)
        },
        conversation: state?.conversation?.id === action.payload ? null : state.conversation
      }
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
      const found = state.conversations.data.some(conversation => conversation.id === action.payload.id);

      if (!found) {
        return {
          ...state,
          conversations: {
            ...state.conversation,
            data: [action.payload, ...state.conversations.data]
          }
        }
      }

      return {
        ...state,
        conversations: {
          ...state.conversations,
          data: state.conversations
            .data
            .map(conversation => {
              if (conversation.id === action.payload.id) {
                return {
                  ...conversation,
                  participants: action.payload.participants
                }
              }
              return conversation
            })
        },
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
        is_blocked: action.payload.is_blocked,
        is_viewable: action.payload.is_viewable
      }
    case MUTE_USER:
      return {
        ...state,
        is_muted: action.payload,
      }
    case UNMUTE_USER:
      return {
        ...state,
        is_muted: action.payload,
      }
    case START_CONVERSATION_LOADER:
      return {
        ...state,
        conversationLoader: true
      }
    case STOP_CONVERSATION_LOADER:
      return {
        ...state,
        conversationLoader: false
      }
    case START_MESSAGE_LOADER:
      return {
        ...state,
        messageLoader: true
      }
    case STOP_MESSAGE_LOADER:
      return {
        ...state,
        messageLoader: false
      }
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          data: state.messages.data.filter(message => message.id !== action.payload)
        }
      }
    default:
      return state;
  }
}