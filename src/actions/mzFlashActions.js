import http from '../services/httpService';
import {
  GET_MY_FEEDS,
  GET_USER_FEEDS,
  CREATE_FEED,
  START_FEEDS_LOADER,
  STOP_FEEDS_LOADER,
  FAVES_FEEDS,
  SPRFVS_FEEDS,
  FAVES_AND_SPRFVS_FEEDS
} from '../constants/actionTypes';

export const createFeed = data => dispatch => {
  dispatch({ type: START_FEEDS_LOADER });

  http
    .post('/mzflash', data)
    .then(res => {
      dispatch({
        type: CREATE_FEED,
        payload: res.data.data.feed
      });
      dispatch({ type: STOP_FEEDS_LOADER });
    })
    .catch(() => {
      dispatch({ type: STOP_FEEDS_LOADER });
    });
};

export const getMyFeeds = () => dispatch => {
  http
    .get('/mzflash')
    .then(res => {
      dispatch({
        type: GET_MY_FEEDS,
        payload: res.data.data.feeds.data
      });
    });
};

export const getUserFeeds = id => dispatch => {
  http
    .get(`/mzflash/${id}`)
    .then(res => {
      dispatch({
        type: GET_USER_FEEDS,
        payload: res.data.data.feeds.data
      });
    });
};

export const getMyFavesFeeds = () => dispatch => {
  http
    .get('/mzflash/user/faves-feed')
    .then(res => {
      dispatch({
        type: FAVES_FEEDS,
        payload: res.data.data.user_faves_feeds
      });
    });
};

export const getMySprfvsFeeds = () => dispatch => {
  http
    .get('/mzflash/user/sprfvs-feed')
    .then(res => {
      dispatch({
        type: SPRFVS_FEEDS,
        payload: res.data.data.user_faves_feeds
      });
    });
};

export const getMySprfvsAndFavesFeeds = () => dispatch => {
  http
    .get('/mzflash/user/faves-sprfvs-feed')
    .then(res => {
      dispatch({
        type: FAVES_AND_SPRFVS_FEEDS,
        payload: res.data.data.user_faves_feeds
      });
    });
};
