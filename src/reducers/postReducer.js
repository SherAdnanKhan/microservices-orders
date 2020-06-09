import { GET_POST, STROKE_POST, UNSTROKE_POST, ADD_COMMENT, GET_COMMENTS } from "../constants/actionTypes";

const initialState = {
  post: null,
  comments: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        post: action.payload
      };
    case STROKE_POST:
      return {
        ...state,
        post: {
          ...state.post,
          has_stroke: action.payload,
          post: {
            ...state.post.post,
            stroke_users_count: state.post.post.stroke_users_count + 1
          }
        }
      };
    case UNSTROKE_POST:
      return {
        ...state,
        post: {
          ...state.post,
          has_stroke: action.payload,
          post: {
            ...state.post.post,
            stroke_users_count: state.post.post.stroke_users_count - 1
          }
        }
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload]
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    default:
      return state;
  }
}