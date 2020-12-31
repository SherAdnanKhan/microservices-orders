import { START_MEETING, END_MEETING, UPDATE_TIMER, STOP_TIMER } from "../constants/actionTypes";

const initialState = {
  meeting: false,
  room: null,
  timer: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_MEETING:
      return {
        ...state,
        meeting: true,
        room: action.paylaod
      };
    case END_MEETING:
      return {
        ...state,
        meeting: false,
        room: null
      };
    case UPDATE_TIMER:
      return {
        ...state,
        timer: state.timer + 1
      };
    case STOP_TIMER:
      return {
        ...state,
        timer: 0
      };
    default:
      return state;
  }
}

