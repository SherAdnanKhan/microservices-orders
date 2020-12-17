import {
  START_NOTIFICATION_LOADER,
  STOP_NOTIFICATION_LOADER,
  GET_ALL_NOTIFICATIONS,
  UPDATE_UNREAD_NOTIFICATION_COUNT,
  RESET_UNREAD_NOTIFICATION_COUNT,
  GET_NOTIFCATION_COUNT,
  READ_NOTIFICATION,
  STOP_NOTIFICATION_LOADERS,
  START_NOTIFICATION_LOADERS
} from "../constants/actionTypes";

const initialState = {
  notification: null,
  user: null,
  notifications: {
    current_page: 0,
    data: [],
    next_page_url: null
  },
  notificationLoader: false,
  notificationCount: 0,
  loaders: {}
};

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: {
          current_page: action.payload.current_page,
          data: action.payload.current_page === 1
            ? action.payload.data
            : [...state.notifications.data, ...action.payload.data],
          // data: action.payload.data,
          next_page_url: action.payload.next_page_url
        }
      };
    case READ_NOTIFICATION:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          data: state.notifications.data?.map(notification => {
            if (notification.id === action.payload) {
              return {
                ...notification,
                status: 1,
              }
            }
            return notification
          })
        },
        notificationCount: state.notificationCount === 0 ? 0 : state.notificationCount - 1
      };
    case START_NOTIFICATION_LOADER:
      return {
        ...state,
        notificationLoader: true
      };
    case STOP_NOTIFICATION_LOADER:
      return {
        ...state,
        notificationLoader: false
      };
    case GET_NOTIFCATION_COUNT:
      return {
        ...state,
        notificationCount: action.payload
      };
    case UPDATE_UNREAD_NOTIFICATION_COUNT:
      return {
        ...state,
        notificationCount: state.notificationCount + 1
      }
    case RESET_UNREAD_NOTIFICATION_COUNT:
      return {
        ...state,
        notificationCount: 0
      }
    case STOP_NOTIFICATION_LOADERS:
      return {
        ...state,
        loaders: { ...state.loaders, [action.payload]: false }
      }
    case START_NOTIFICATION_LOADERS:
      return {
        ...state,
        loaders: { ...state.loaders, [action.payload]: false }
      }
    default:
      return state;
  }
}