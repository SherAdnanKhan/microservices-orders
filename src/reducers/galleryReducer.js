import {
  GET_GALLERY,
  FAV_GALLERY,
  UNFAV_GALLERY,
  CLEAR_GALLERY,
  RECOMMEND_GALLERIES,
  FAV_RECOMMEND_GALLERY,
  UNFAV_RECOMMEND_GALLERY
} from "../constants/actionTypes";

const initialState = {
  gallery: null,
  recommendedGalleries: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GALLERY:
      return {
        ...state,
        gallery: action.payload
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
    default:
      return state;
  }
}