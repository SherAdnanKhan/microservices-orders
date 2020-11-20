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
  CHANGE_STATUS,
  CLEAR_COMMENTS,
} from "../constants/actionTypes";

const initialState = {
  post: null,
  ncomm: null,
  comments: [],
  otherPrivacy: null,
  crtiqueStatus: 0,
  hasStroke: null,
  sentUsers: {}
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
        post: {
          ...state?.post,
          post: {
            ...state?.post?.post,
            comments_count: state?.post?.post?.comments_count + 1
          }
        },
        comments: [...state.comments, action.payload.comment]
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload.comments,
        otherPrivacy: action.payload.other_privacy
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
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
        otherPrivacy: null
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
        sentUsers: { ...state.sentUsers, [action.payload]: true }
      };

    case CHANGE_STATUS:
      return {
        ...state,
        sentUsers: { ...state.sentUsers, [action.payload]: false }
      };
    case CLEAR_STATUS:
      return {
        ...state,
        sentUsers: {}
      };
    default:
      return state;
  }
}