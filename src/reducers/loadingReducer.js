import { START_LOADING, STOP_LOADING } from "../constants/actionTypes";

const initialState = {
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false
      }
  }
}

