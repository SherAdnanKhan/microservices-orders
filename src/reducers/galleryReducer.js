import {
  GET_GALLERY,
  FAV_GALLERY,
  UNFAV_GALLERY,
  CLEAR_GALLERY,
  RECOMMEND_GALLERIES,
  FAV_RECOMMEND_GALLERY,
  UNFAV_RECOMMEND_GALLERY,
  GET_MY_GALLERIES,
  START_GALLERY_LOADER,
  STOP_GALLERY_LOADER,
  CREATE_GALLERY,
  UPDATE_GALLERY,
  REMOVE_GALLERY_IMAGE,
  STROKE_POST,
  UNSTROKE_POST,
  GET_USER_FAV_GALLERIES,
  ADD_POST_COMMENT,
  CHANGE_CRITIQUES_STATUS
} from "../constants/actionTypes";

const initialState = {
  gallery: null,
  userFavGalleries: null,
  myGalleries: null,
  recommendedGalleries: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GALLERY:
      return {
        ...state,
        gallery: action.payload
      };
    case CHANGE_CRITIQUES_STATUS:
      if (!state.gallery) {
        return state
      }
      return {
        ...state,
        gallery: {
          ...state.gallery,
          posts: state.gallery.posts.map(post => {
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
    case ADD_POST_COMMENT:
      if (!state.gallery) {
        return state
      }
      return {
        ...state,
        gallery: {
          ...state.gallery,
          posts: state?.gallery?.posts.map(post => {
            if (action.payload.postId === post.id) {
              return {
                ...post,
                comments: [...post.comments, action.payload.comment]
              }
            }
            return post
          })
        }
      };
    case GET_USER_FAV_GALLERIES:
      return {
        ...state,
        userFavGalleries: action.payload
      };

    case STROKE_POST:
      return {
        ...state,
        gallery: {
          ...state.gallery,
          posts: state?.gallery?.posts?.map(post => {
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
        gallery: {
          ...state.gallery,
          posts: state?.gallery?.posts?.map(post => {
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
    case GET_MY_GALLERIES:
      return {
        ...state,
        myGalleries: action.payload
      };
    case CREATE_GALLERY:
      return {
        ...state,
        myGalleries: [...state.myGalleries, action.payload]
      }
    case UPDATE_GALLERY:
      return {
        ...state,
        myGalleries: state.myGalleries.map(gallery => {
          return gallery.id === action.payload.id ? action.payload : gallery
        })
      };
    case REMOVE_GALLERY_IMAGE:
      return {
        ...state,
        myGalleries: state.myGalleries.map(gallery => {
          return gallery.id === action.payload.id ? action.payload : gallery
        })
      };
    case CLEAR_GALLERY:
      return {
        ...state,
        gallery: action.payload
      };
    case FAV_GALLERY:
      return {
        ...state,
        gallery: {
          ...state.gallery,
          has_faved: action.payload.hasFaved
        }
      };
    case UNFAV_GALLERY:
      return {
        ...state,
        gallery: {
          ...state.gallery,
          has_faved: action.payload.hasFaved
        }
      };
    case RECOMMEND_GALLERIES:
      return {
        ...state,
        recommendedGalleries: action.payload
      };
    case FAV_RECOMMEND_GALLERY:
      return {
        ...state,
        recommendedGalleries: state.recommendedGalleries.map(user => {
          if (user.id === action.payload.user.id) {
            return {
              ...user,
              galleries: user.galleries.map(gallery => {
                if (gallery.id === action.payload.gallery.id) {
                  return {
                    ...gallery,
                    has_faved: true
                  }
                }
                return gallery
              })
            }
          }
          return user
        })
      };
    case UNFAV_RECOMMEND_GALLERY:
      return {
        ...state,
        recommendedGalleries: state.recommendedGalleries.map(user => {
          if (user.id === action.payload.user.id) {
            return {
              ...user,
              galleries: user.galleries.map(gallery => {
                if (gallery.id === action.payload.gallery.id) {
                  return {
                    ...gallery,
                    has_faved: false
                  }
                }
                return gallery
              })
            }
          }
          return user
        })
      };
    case START_GALLERY_LOADER:
      return {
        ...state,
        loading: true
      };
    case STOP_GALLERY_LOADER:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}