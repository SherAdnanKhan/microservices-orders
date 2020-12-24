import { START_MEETING, END_MEETING } from "../constants/actionTypes";

const initialState = {
  meeting: false,
  room: null
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
    default:
      return state;
  }
}

