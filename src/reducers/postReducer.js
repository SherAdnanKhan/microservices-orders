import {
  GET_POST,
  STROKE_POST,
  UNSTROKE_POST,
  ADD_POST_COMMENT,
  GET_COMMENTS,
  GET_NCOMM,
  CLEAR_NCOMM,
  DELETE_POST,
  CLEAR_POST,
  CHANGE_CRITIQUES_STATUS,
  SHARE_POST_STRQ,
  CLEAR_STATUS,
} from "../constants/actionTypes";

const initialState = {
  post: null,
  ncomm: null,
  comments: [],
  crtiqueStatus: 0,
  sendUser: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        post: action.payload
      };
    case STROKE_POST:
      if (!state.post) {
        return state;
      }
      return {
        ...state,
        post: {
          ...state.post,
          has_stroke: action.payload.value,
          post: {
            ...state.post.post,
            stroke_users_count: state?.post?.post?.stroke_users_count + 1
          }
        }
      };
    case UNSTROKE_POST:
      if (!state.post) {
        return state;
      }
      return {
        ...state,
        post: {
          ...state.post,
          has_stroke: action.payload.value,
          post: {
            ...state.post.post,
            stroke_users_count: state.post.post.stroke_users_count - 1
          }
        }
      };
    case ADD_POST_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload.comment]
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case GET_NCOMM:
      return {
        ...state,
        ncomm: action.payload
      };
    case CLEAR_NCOMM:
      return {
        ...state,
        ncomm: null
      };
    case DELETE_POST:
      return {
        ...state,
        post: null
      };
    case CLEAR_POST:
      return {
        ...state,
        post: null
      };
    case CHANGE_CRITIQUES_STATUS:
      if (!state.post) {
        return state
      }
      return {
        ...state,
        post: {
          ...state.post,
          post: {
            ...state.post.post,
            critiques_status: action.payload.critiques_status
          }
        }
      };
    case SHARE_POST_STRQ:
      return {
        ...state,
        sendUser: action.payload
      };
    case CLEAR_STATUS:
      return {
        ...state,
        sendUser: null
      };
    default:
      return state;
  }
}