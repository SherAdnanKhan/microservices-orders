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
  ADD_POST_COMMENT,
  ONLINE_USERS,
  UNFAV_GALLERY,
} from "../constants/actionTypes";

const initialState = {
  favouriteUsers: null,
  favouritePosts: null,
  unreadCount: 0,
  users: null,
  faveUsers: null,
  faveByUsers: null,
  sprfvsUsers: null,
  userRequests: null,
  invitedUsers: null,
  faveAndSprfvsUsers: null,
  onlineUsers: [],
  post:null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FAV:
      return {
        ...state,
        favouriteUsers: action.payload.all_faved_users,
        favouritePosts: action.payload.faved_galleries_posts,
        unreadCount: action.payload.user_with_count_unread
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
    case ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.payload
      };
      // case DELETE_POST:
      //   console.log("post=",post)
      //   return {
      //     ...state,
      //     favouritePosts: state.favouritePosts.filter(post=>post.id != action.payload.post.id)
      //   }          

      case UNFAV_GALLERY:
        return {
          ...state,
          favouritePosts: state.favouritePosts.filter(post=>post.gallery_id !== action.payload.gallery.id)
        }
    default:
      return state;
  }
}