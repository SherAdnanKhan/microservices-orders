import {
  GET_MY_STUDIO,
  GET_USER_STUDIO,
  FAV_USER,
  UNFAV_USER,
  UPDATE_BIO,
  ADD_TO_SPRFVS,
  FAV_GALLERY,
  UNFAV_GALLERY,
  ADD_TO_INVITE_ONLY,
  REMOVE_FROM_INVITE_ONLY,
  START_STUDIO_LOADER,
  STOP_STUDIO_LOADER,
  UN_SUPER_FAV,
  CLEAR_USER_STUDIO,
  UPDATE_USERNAME,
  GET_MY_VAULTS,
  UPDATE_USER_ART,
  BLOCK_USER,
  UNBLOCK_USER
} from "../constants/actionTypes";
import { SPRFVS } from "../constants/privacyTypes";

const initialState = {
  myStudio: null,
  userStudio: null,
  loading: false,
  vaults: {
    current_page: 0,
    data: [],
    next_page_url: null,
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_STUDIO:
      return {
        ...state,
        myStudio: action.payload
      };
    case UPDATE_BIO:
      return {
        ...state,
        myStudio: {
          ...state.myStudio,
          user: {
            ...state.myStudio.user,
            bio: action.payload
          }
        }
      };
    case UPDATE_USER_ART:
      return {
        ...state,
        myStudio: {
          ...state.myStudio,
          user: {
            ...state.myStudio.user,
            art: {
              id: action.payload[0],
              name: action.payload[1]
            }
          }
        }
      };
    case UPDATE_USERNAME:
      return {
        ...state,
        myStudio: {
          ...state.myStudio,
          user: {
            ...state.myStudio.user,
            username: action.payload
          }
        }
      };
    case GET_USER_STUDIO:
      return {
        ...state,
        userStudio: action.payload
      };
    case CLEAR_USER_STUDIO:
      return {
        ...state,
        userStudio: null
      };
    case FAV_USER:
      return {
        ...state,
        userStudio: {
          ...state.userStudio,
          has_faved: action.payload,
          favs_count: state.userStudio.favs_count + 1
        }
      };
    case UNFAV_USER:
      return {
        ...state,
        userStudio: {
          ...state.userStudio,
          has_faved: action.payload,
          favs_count: state.userStudio.favs_count - 1
        }
      };
    case FAV_GALLERY:
      return {
        ...state,
        userStudio: {
          ...state.userStudio,
          gallery_privacy: state.userStudio.gallery_privacy.map(gallery => {
            if (gallery.gallery_id === action.payload.gallery.id) {
              return {
                ...gallery,
                is_allowed: 1
              }
            }
            return gallery
          })
        }
      };
    case UNFAV_GALLERY:
      if (!state.userStudio) {
        return state;
      }
      return {
        ...state,
        userStudio: {
          ...state.userStudio,
          gallery_privacy: state.userStudio.gallery_privacy.map(gallery => {
            if (gallery.gallery_id === action.payload.gallery.id
              && action.payload.gallery.privacy?.privacy_type_id !== SPRFVS) {
              return {
                ...gallery,
                is_allowed: 0
              }
            }
            return gallery
          })
        }
      };
    case ADD_TO_SPRFVS:
      return {
        ...state,
        userStudio: {
          ...state.userStudio,
          is_sprfvs: action.payload
        }
      }
    case UN_SUPER_FAV:
      return {
        ...state,
        userStudio: {
          ...state.userStudio,
          is_sprfvs: action.payload
        }
      }
    case REMOVE_FROM_INVITE_ONLY:
      return {
        ...state,
        userStudio: {
          ...state.userStudio,
          gallery_invited_list: state.userStudio.gallery_invited_list.filter(id => id !== action.payload)
        }
      }
    case ADD_TO_INVITE_ONLY:
      return {
        ...state,
        userStudio: {
          ...state.userStudio,
          gallery_invited_list: [...state.userStudio.gallery_invited_list, action.payload]
        }
      }
    case START_STUDIO_LOADER:
      return {
        ...state,
        loading: true
      }
    case STOP_STUDIO_LOADER:
      return {
        ...state,
        loading: false
      }
    case GET_MY_VAULTS:
      return {
        ...state,
        vaults: {
          current_page: action.payload.vault_posts.current_page,
          data: action.payload.vault_posts.current_page === 0
            ? action.payload.vault_posts.data
            : [...state.vaults.data, ...action.payload.vault_posts.data],
          next_page_url: action.payload.vault_posts.next_page_url
        }
      }
    case BLOCK_USER:
      return {
        ...state,
        userStudio: {
          ...state.userStudio,
          is_blocked: true
        }
      }

    case UNBLOCK_USER:
      return {
        ...state,
        userStudio: {
          ...state.userStudio,
          is_blocked: false,
        }
      }
    default:
      return state;
  }
}