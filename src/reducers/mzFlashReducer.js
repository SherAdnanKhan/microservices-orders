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
  collectiveFeeds: null,
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
        collectiveFeeds: action.payload
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
        }
      };
    case CREATE_FEED_COMMENT:
      return {
        ...state,
        collectiveFeeds: {
          ...state.collectiveFeeds,
          data: state.collectiveFeeds.data.map(feed => {
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
          data: state.sprfvsFeeds.data.map(feed => {
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
          data: state.favesFeeds.data.map(feed => {
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
          data: state.favesAndSprfvsFeeds.data.map(feed => {
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
          data: state.userFeeds.data.map(feed => {
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
        collectiveFeeds: {
          ...state.collectiveFeeds,
          data: state.collectiveFeeds.data.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke: action.payload.has_stroke,
                stroke_users_count: feed.stroke_users_count + 1
              }
            }
            return feed
          })
        },
        favesFeeds: {
          ...state.favesFeeds,
          data: state.favesFeeds.data.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke: action.payload.has_stroke,
                stroke_users_count: feed.stroke_users_count + 1
              }
            }
            return feed
          })
        },
        sprfvsFeeds: {
          ...state.sprfvsFeeds,
          data: state.sprfvsFeeds.data.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke: action.payload.has_stroke,
                stroke_users_count: feed.stroke_users_count + 1
              }
            }
            return feed
          })
        },
        favesAndSprfvsFeeds: {
          ...state.favesAndSprfvsFeeds,
          data: state.favesAndSprfvsFeeds.data.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke: action.payload.has_stroke,
                stroke_users_count: feed.stroke_users_count + 1
              }
            }
            return feed
          })
        },
        userFeeds: {
          ...state.userFeeds,
          data: state.userFeeds.data.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke: action.payload.has_stroke,
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
        collectiveFeeds: {
          ...state.collectiveFeeds,
          data: state.collectiveFeeds.data.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke: action.payload.has_stroke,
                stroke_users_count: feed.stroke_users_count - 1
              }
            }
            return feed
          })
        },
        favesFeeds: {
          ...state.favesFeeds,
          data: state.favesFeeds.data.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke: action.payload.has_stroke,
                stroke_users_count: feed.stroke_users_count - 1
              }
            }
            return feed
          })
        },
        sprfvsFeeds: {
          ...state.sprfvsFeeds,
          data: state.sprfvsFeeds.data.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke: action.payload.has_stroke,
                stroke_users_count: feed.stroke_users_count - 1
              }
            }
            return feed
          })
        },
        favesAndSprfvsFeeds: {
          ...state.favesAndSprfvsFeeds,
          data: state.favesAndSprfvsFeeds.data.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke: action.payload.has_stroke,
                stroke_users_count: feed.stroke_users_count - 1
              }
            }
            return feed
          })
        },
        userFeeds: {
          ...state.userFeeds,
          data: state.userFeeds.data.map(feed => {
            if (feed.id === action.payload.feed_id) {
              return {
                ...feed,
                has_stroke: action.payload.has_stroke,
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

