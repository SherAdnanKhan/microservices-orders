import {
  ONLINE_USERS,
  ADD_ONLINE_USER,
  REMOVE_ONLINE_USER
} from "../constants/actionTypes";

const initialState = {
  onlineUsers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.payload
      };
    case ADD_ONLINE_USER:
      if (!state.onlineUsers.some(user => user === action.payload)) {
        return {
          ...state,
          onlineUsers: [...state.onlineUsers, action.payload]
        };
      }
      return state;
    case REMOVE_ONLINE_USER:
      return {
        ...state,
        onlineUsers: state.onlineUsers.filter(user => user !== action.payload)
      };
    default:
      return state;
  }
}