import {
  GET_FAV,
  GET_ALL_USERS,
  GET_FAV_USER,
  GET_FAV_BY_USER,
  GET_USER_ART_NAME,
  CLEAR_USERS,
  UPDATE_COUNT,
  GET_ALL_FEELS,
  REQUEST_APPROVED,
  REQUEST_REJECTED,
  SPRFVS_USERS,
  USER_REQUESTS,
  INVITED_USERS,
  GET_FAV_AND_SPRFVS_USERS,
  STROKE_POST,
  UNSTROKE_POST,
  ADD_POST_COMMENT
} from "../constants/actionTypes";

const initialState = {
  favouriteUsers: null,
  favouriteGalleries: null,
  unreadCount: 0,
  users: null,
  faveUsers: null,
  faveByUsers: null,
  sprfvsUsers: null,
  userRequests: null,
  invitedUsers: null,
  faveAndSprfvsUsers: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FAV:
      return {
        ...state,
        favouriteUsers: action.payload.all_faved_users,
        favouriteGalleries: action.payload.user_with_faved_galleries,
        unreadCount: action.payload.user_with_count_unread
      };
    case STROKE_POST:
      return {
        ...state,
        favouriteGalleries: {
          ...state.favouriteGalleries,
          fav_galleries: state?.favouriteGalleries?.fav_galleries?.map(gallery => {
            if (gallery.id === action.payload.galleryId) {
              return {
                ...gallery,
                posts: gallery?.posts?.map(post => {
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
            }
            return gallery
          })
        }
      };
    case UNSTROKE_POST:
      return {
        ...state,
        favouriteGalleries: {
          ...state.favouriteGalleries,
          fav_galleries: state?.favouriteGalleries?.fav_galleries?.map(gallery => {
            if (gallery.id === action.payload.galleryId) {
              return {
                ...gallery,
                posts: gallery?.posts?.map(post => {
                  if (post.id === action.payload.postId) {
                    return {
                      ...post,
                      has_stroke: [],
                      stroke_users: post.stroke_users.filter(user => user.id !== 0)
                    }
                  }
                  return post
                })
              }
            }
            return gallery
          })
        }
      };
    case ADD_POST_COMMENT:
      return {
        ...state,
        favouriteGalleries: {
          ...state.favouriteGalleries,
          fav_galleries: state?.favouriteGalleries?.fav_galleries?.map(gallery => {
            if (gallery.id === action.payload.galleryId) {
              return {
                ...gallery,
                posts: gallery.posts.map(post => {
                  if (post.id === action.payload.postId) {
                    return {
                      ...post,
                      comments: [...post.comments, action.payload.comment]
                    }
                  }
                  return post
                })
              }
            }
            return gallery
          })
        }
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: action.payload
      };
    case GET_FAV_USER:
      return {
        ...state,
        faveUsers: action.payload
      };
    case GET_FAV_BY_USER:
      return {
        ...state,
        faveByUsers: action.payload
      };
    case GET_USER_ART_NAME:
      return {
        ...state,
        userArtName: action.payload
      };
    case UPDATE_COUNT:
      return {
        ...state,
        unreadCount: state.unreadCount + 1
      };
    case GET_ALL_FEELS:
      return {
        ...state,
        feelHistory: action.payload
      };
    case SPRFVS_USERS:
      return {
        ...state,
        sprfvsUsers: action.payload
      };
    case USER_REQUESTS:
      return {
        ...state,
        userRequests: action.payload
      };
    case INVITED_USERS:
      return {
        ...state,
        invitedUsers: action.payload
      };
    case REQUEST_APPROVED || REQUEST_REJECTED:
      return {
        ...state,
        userRequests: state.userRequests.filter(user => user.id !== action.payload.user_id)
      };
    case GET_FAV_AND_SPRFVS_USERS:
      return {
        ...state,
        faveAndSprfvsUsers: action.payload
      };
    default:
      return state;
  }
}