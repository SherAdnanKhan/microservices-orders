import {
  STROKE_POST,
  UNSTROKE_POST,
  ADD_POST_COMMENT,
  UNFAV_GALLERY,
  CHANGE_CRITIQUES_STATUS,
  GET_FAV_GALLERY_USERS,
  GET_FAV_POSTS,
  START_POST_LOADER,
  STOP_POST_LOADER,
  DELETE_POST
} from "../constants/actionTypes";
import { hasExtension } from "../utils/helperFunctions";

const initialState = {
  favouriteUsers: {
    current_page: 0,
    data: [],
    next_page_url: null,
  },
  favouritePosts: {
    current_page: 0,
    data: [],
    next_page_url: null
  },
  postLoader: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FAV_GALLERY_USERS:
      return {
        ...state,
        favouriteUsers: {
          ...state.favouriteUsers,
          current_page: action.payload.current_page,
          data: action.payload.current_page === 1 ? action.payload.data : [...state.favouriteUsers.data, ...action.payload.data],
          next_page_url: action.payload.next_page_url
        }
      }
    case GET_FAV_POSTS:
      const filtered = action.payload.data.filter(post => hasExtension(post.image.path))

      return {
        ...state,
        favouritePosts: {
          ...state.favouritePosts,
          current_page: action.payload.current_page,
          data: action.payload.current_page === 1 ? filtered : [...state.favouritePosts.data, ...filtered],
          next_page_url: action.payload.next_page_url
        }
      }

    case STROKE_POST:
      return {
        ...state,
        favouritePosts: {
          ...state.favouritePosts,
          data: state?.favouritePosts?.data?.map(post => {
            if (post.id === action.payload.postId) {
              return {
                ...post,
                has_stroke: [1],
                stroke_users_count: post.stroke_users_count + 1
              }
            }
            return post
          })
        }
      };
    case UNSTROKE_POST:
      return {
        ...state,
        favouritePosts: {
          ...state.favouritePosts,
          data: state?.favouritePosts?.data?.map(post => {
            if (post.id === action.payload.postId) {
              return {
                ...post,
                has_stroke: [],
                stroke_users_count: post.stroke_users_count - 1
              }
            }
            return post
          })
        }
      };
    case ADD_POST_COMMENT:
      return {
        ...state,
        favouritePosts: {
          ...state.favouritePosts,
          data: state?.favouritePosts?.data?.map(post => {
            if (post.id === action.payload.postId) {
              return {
                ...post,
                comments_count: post.comments_count + 1
              }
            }
            return post
          })
        }
      };

    case UNFAV_GALLERY:
      return {
        ...state,
        favouritePosts: {
          ...state.favouritePosts,
          data: state.favouritePosts?.data?.filter(post => post.gallery_id !== action.payload.gallery.id)
        }
      }
    case CHANGE_CRITIQUES_STATUS:
      if (!state.favouritePosts) {
        return state
      }
      return {
        ...state,
        favouritePosts: {
          ...state.favouritePosts,
          data: state.favouritePosts?.data?.map(post => {
            if (action.payload.id === post.id) {
              return {
                ...post,
                critiques_status: action.payload.critiques_status
              };
            }
            return post
          })
        }
      }
    case DELETE_POST:
      return {
        ...state,
        favouritePosts: {
          ...state.favouritePosts,
          data: state.favouritePosts?.data?.filter(post => post.id !== action.payload)
        }
      }
    case START_POST_LOADER:
      return {
        ...state,
        postLoader: true
      }
    case STOP_POST_LOADER:
      return {
        ...state,
        postLoader: false
      }
    default:
      return state;
  }
}