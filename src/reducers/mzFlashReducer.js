import {
  CREATE_FEED,
  GET_MY_FEEDS,
  GET_USER_FEEDS,
  START_FEEDS_LOADER,
  STOP_FEEDS_LOADER,
  FAVES_FEEDS,
  SPRFVS_FEEDS,
  FAVES_AND_SPRFVS_FEEDS,
  GET_COLLECTIVE_FEEDS,
  CREATE_FEED_COMMENT,
  STROKE_FEED,
  UNSTROKE_FEED
} from "../constants/actionTypes";

const initialState = {
  myFeeds: null,
  collectiveFeeds: {
    current_page: 1,
    data: [],
    first_page_url: null,
    from: 0,
    last_page: 0,
    last_page_url: null,
    next_page_url: null,
    path: null,
    per_page: 0,
    prev_page_url: null,
    to: 0,
    total: 0
  },
  favesFeeds: null,
  sprfvsFeeds: null,
  favesAndSprfvsFeeds: null,
  userFeeds: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_FEEDS:
      return {
        ...state,
        myFeeds: action.payload
      };
    case GET_COLLECTIVE_FEEDS:
      return {
        ...state,
        collectiveFeeds: {
          ...state.collectiveFeeds,
          data: state.collectiveFeeds.data
            ? [...state.collectiveFeeds.data, ...action.payload.data]
            : action.payload.data,
          current_page: action.payload.current_page,
          first_page_url: action.payload.first_page_url,
          from: action.payload.from,
          last_page: action.payload.last_page,
          last_page_url: action.payload.last_page_url,
          next_page_url: action.payload.next_page_url,
          path: action.payload.path,
          per_page: action.payload.per_page,
          prev_page_url: action.payload.prev_page_url,
          to: action.payload.to,
          total: action.payload.total
        }
      };
    case GET_USER_FEEDS:
      return {
        ...state,
        userFeeds: action.payload
      };
    case CREATE_FEED:
      return {
        ...state,
        collectiveFeeds: {
          ...state.collectiveFeeds,
          data: [action.payload, ...state.collectiveFeeds.data]
        },
        myFeeds: {
          ...state.myFeeds,
          data: state?.myFeeds?.data ? [action.payload, ...state.myFeeds.data] : [action.payload]
        }
      };
    case CREATE_FEED_COMMENT:
      return {
        ...state,
        myFeeds: {
          ...state.myFeeds,
          data: state?.myFeeds?.data?.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                limited_comments: [action.payload, ...feed.limited_comments].slice(0, 4),
                comments_count: feed.comments_count + 1
              }
            } else {
              return feed
            }
          })
        },
        collectiveFeeds: {
          ...state.collectiveFeeds,
          data: state?.collectiveFeeds?.data?.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                limited_comments: [action.payload, ...feed.limited_comments].slice(0, 4),
                comments_count: feed.comments_count + 1
              }
            } else {
              return feed
            }
          })
        },
        sprfvsFeeds: {
          ...state.sprfvsFeeds,
          data: state?.sprfvsFeeds?.data?.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                limited_comments: [action.payload, ...feed.limited_comments].slice(0, 4),
                comments_count: feed.comments_count + 1
              }
            } else {
              return feed
            }
          })
        },
        favesFeeds: {
          ...state.favesFeeds,
          data: state?.favesFeeds?.data?.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                limited_comments: [action.payload, ...feed.limited_comments].slice(0, 4),
                comments_count: feed.comments_count + 1
              }
            } else {
              return feed
            }
          })
        },
        favesAndSprfvsFeeds: {
          ...state.favesAndSprfvsFeeds,
          data: state?.favesAndSprfvsFeeds?.data?.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                limited_comments: [action.payload, ...feed.limited_comments].slice(0, 4),
                comments_count: feed.comments_count + 1
              }
            } else {
              return feed
            }
          })
        },
        userFeeds: {
          ...state.userFeeds,
          data: state?.userFeeds?.data?.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                limited_comments: [action.payload, ...feed.limited_comments].slice(0, 4),
                comments_count: feed.comments_count + 1
              }
            } else {
              return feed
            }
          })
        }
      };
    case FAVES_FEEDS:
      return {
        ...state,
        favesFeeds: action.payload
      };
    case SPRFVS_FEEDS:
      return {
        ...state,
        sprfvsFeeds: action.payload
      };
    case FAVES_AND_SPRFVS_FEEDS:
      return {
        ...state,
        favesAndSprfvsFeeds: action.payload
      };
    case STROKE_FEED:
      return {
        ...state,
        myFeeds: {
          ...state.myFeeds,
          data: state?.myFeeds?.data?.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke_count: action.payload.has_stroke_count,
                stroke_users_count: feed.stroke_users_count + 1
              }
            }
            return feed
          })
        },
        collectiveFeeds: {
          ...state.collectiveFeeds,
          data: state?.collectiveFeeds?.data?.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke_count: action.payload.has_stroke_count,
                stroke_users_count: feed.stroke_users_count + 1
              }
            }
            return feed
          })
        },
        favesFeeds: {
          ...state.favesFeeds,
          data: state?.favesFeeds?.data?.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke_count: action.payload.has_stroke_count,
                stroke_users_count: feed.stroke_users_count + 1
              }
            }
            return feed
          })
        },
        sprfvsFeeds: {
          ...state.sprfvsFeeds,
          data: state?.sprfvsFeeds?.data?.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke_count: action.payload.has_stroke_count,
                stroke_users_count: feed.stroke_users_count + 1
              }
            }
            return feed
          })
        },
        favesAndSprfvsFeeds: {
          ...state.favesAndSprfvsFeeds,
          data: state?.favesAndSprfvsFeeds?.data?.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke_count: action.payload.has_stroke_count,
                stroke_users_count: feed.stroke_users_count + 1
              }
            }
            return feed
          })
        },
        userFeeds: {
          ...state.userFeeds,
          data: state?.userFeeds?.data?.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke_count: action.payload.has_stroke_count,
                stroke_users_count: feed.stroke_users_count + 1
              }
            }
            return feed
          })
        }
      }
    case UNSTROKE_FEED:
      return {
        ...state,
        myFeeds: {
          ...state.myFeeds,
          data: state?.myFeeds?.data?.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke_count: action.payload.has_stroke_count,
                stroke_users_count: feed.stroke_users_count - 1
              }
            }
            return feed
          })
        },
        collectiveFeeds: {
          ...state.collectiveFeeds,
          data: state?.collectiveFeeds?.data?.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke_count: action.payload.has_stroke_count,
                stroke_users_count: feed.stroke_users_count - 1
              }
            }
            return feed
          })
        },
        favesFeeds: {
          ...state.favesFeeds,
          data: state?.favesFeeds?.data?.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke_count: action.payload.has_stroke_count,
                stroke_users_count: feed.stroke_users_count - 1
              }
            }
            return feed
          })
        },
        sprfvsFeeds: {
          ...state.sprfvsFeeds,
          data: state?.sprfvsFeeds?.data?.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke_count: action.payload.has_stroke_count,
                stroke_users_count: feed.stroke_users_count - 1
              }
            }
            return feed
          })
        },
        favesAndSprfvsFeeds: {
          ...state.favesAndSprfvsFeeds,
          data: state?.favesAndSprfvsFeeds?.data?.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke_count: action.payload.has_stroke_count,
                stroke_users_count: feed.stroke_users_count - 1
              }
            }
            return feed
          })
        },
        userFeeds: {
          ...state.userFeeds,
          data: state?.userFeeds?.data?.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke_count: action.payload.has_stroke_count,
                stroke_users_count: feed.stroke_users_count - 1
              }
            }
            return feed
          })
        },
      }
    case START_FEEDS_LOADER:
      return {
        ...state,
        loading: true
      };
    case STOP_FEEDS_LOADER:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

