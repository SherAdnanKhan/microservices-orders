import {
  GET_FAV,
  STROKE_POST,
  UNSTROKE_POST,
  ADD_POST_COMMENT,
  UNFAV_GALLERY,
  CHANGE_CRITIQUES_STATUS,
} from "../constants/actionTypes";

const initialState = {
  favouriteUsers: null,
  favouritePosts: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FAV:
      return {
        ...state,
        favouriteUsers: action.payload.all_faved_users,
        favouritePosts: action.payload.faved_galleries_posts,
      };
    case STROKE_POST:
      return {
        ...state,
        favouritePosts: state?.favouritePosts?.map(post => {
          if (post.id === action.payload.postId) {
            return {
              ...post,
              has_stroke: [1],
              stroke_users: [...post.stroke_users, { id: 0 }]
            }
          }
          return post
        })
      };
    case UNSTROKE_POST:
      return {
        ...state,
        favouritePosts: state?.favouritePosts?.map(post => {
          if (post.id === action.payload.postId) {
            return {
              ...post,
              has_stroke: [],
              stroke_users: post.stroke_users.filter((user, index) => index !== post.stroke_users.length - 1)
            }
          }
          return post
        })
      };
    case ADD_POST_COMMENT:
      return {
        ...state,
        favouritePosts: state?.favouritePosts?.map(post => {
          if (post.id === action.payload.postId) {
            return {
              ...post,
              comments: [...post.comments, action.payload.comment]
            }
          }
          return post
        })
      };
    case UNFAV_GALLERY:
      return {
        ...state,
        favouritePosts: state.favouritePosts?.filter(post => post.gallery_id !== action.payload.gallery.id)
      }
    case CHANGE_CRITIQUES_STATUS:
      if (!state.favouritePosts) {
        return state
      }
      return {
        ...state,
        favouritePosts: state.favouritePosts.map(post => {
          if (action.payload.id === post.id) {
            return {
              ...post,
              critiques_status: action.payload.critiques_status
            };
          }
          return post
        })
      }
    default:
      return state;
  }
}