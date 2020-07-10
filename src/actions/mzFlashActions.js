import http from '../services/httpService';
import {
  GET_MY_FEEDS,
  GET_USER_FEEDS,
  CREATE_FEED,
  START_FEEDS_LOADER,
  STOP_FEEDS_LOADER,
  FAVES_FEEDS,
  SPRFVS_FEEDS,
  FAVES_AND_SPRFVS_FEEDS,
  GET_COLLECTIVE_FEEDS,
  CREATE_FEED_COMMENT,
  STROKE_FEED,
  UNSTROKE_FEED
} from '../constants/actionTypes';
import { getCurrentUser } from './authActions';
import socket from '../services/socketService';

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
        payload: res.data.data.feeds
      });
    });
};

export const getCollectiveFeeds = (page = 1) => dispatch => {
  http
    .get(`/mzflash/user/collective-feed?page=${page}`)
    .then(res => {
      dispatch({
        type: GET_COLLECTIVE_FEEDS,
        payload: res.data.data.user_faves_feeds
      });
    });
};

export const getUserFeeds = slug => dispatch => {
  http
    .get(`/mzflash/${slug}`)
    .then(res => {
      dispatch({
        type: GET_USER_FEEDS,
        payload: res.data.data.feeds
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

export const createFeedComment = (data, user) => dispatch => {
  const currentUser = getCurrentUser();

  http
    .post('/mzflash/feed/comment', data)
    .then(res => {
      dispatch({
        type: CREATE_FEED_COMMENT,
        payload: res.data.data.feed_comment
      });
      socket.emit('onFeed', { sender: currentUser, reciever: user });
    });
};


export const strokeFeed = (data, user) => dispatch => {
  const currentUser = getCurrentUser();

  dispatch({
    type: STROKE_FEED,
    payload: { feed_id: data.feed_id, has_stroke_count: 1 }
  });

  http
    .post('/mzflash/feed-stroke', data)
    .then(() => {
      socket.emit('onFeedStroke', { sender: currentUser, reciever: user });
    })
    .catch(() => {
      dispatch({
        type: UNSTROKE_FEED,
        payload: { feed_id: data.feed_id, has_stroke_count: 0 }
      })
    });
};

export const unstrokeFeed = (data, user) => dispatch => {
  const currentUser = getCurrentUser();

  dispatch({
    type: UNSTROKE_FEED,
    payload: { feed_id: data.feed_id, has_stroke_count: 0 }
  });

  http
    .post('/mzflash/feed-unstroke', data)
    .then(() => {
      socket.emit('onFeedUnstroke', { sender: currentUser, reciever: user });
    })
    .catch(() => {
      dispatch({
        type: STROKE_FEED,
        payload: { feed_id: data.feed_id, has_stroke_count: 1 }
      });
    });
};