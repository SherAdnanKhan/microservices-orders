import {
  // GET_FAV,
  STROKE_POST,
  UNSTROKE_POST,
  ADD_POST_COMMENT,
  UNFAV_GALLERY,
  CHANGE_CRITIQUES_STATUS,
  GET_FAV_GALLERY_USERS,
  GET_FAV_POSTS
} from "../constants/actionTypes";

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
  }
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
      console.log(action.payload)
      return {
        ...state,
        favouritePosts: {
          ...state.favouritePosts,
          current_page: action.payload.current_page,
          data: action.payload.current_page === 1 ? action.payload.data : [...state.favouritePosts.data, ...action.payload.data],
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
                stroke_users: [...post.stroke_users, { id: 0 }]
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
                stroke_users: post.stroke_users.filter((user, index) => index !== post.stroke_users.length - 1)
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
                comments: [...post.comments, action.payload.comment]
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
    default:
      return state;
  }
}