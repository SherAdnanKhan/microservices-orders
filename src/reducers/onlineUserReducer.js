import { ONLINE_USERS } from "../constants/actionTypes";

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
    default:
      return state;
  }
}