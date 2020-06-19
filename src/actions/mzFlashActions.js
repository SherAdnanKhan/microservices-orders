import http from "../services/httpService";
import {
  GET_MY_FEEDS,
  GET_USER_FEEDS,
  CREATE_FEED,
  START_FEEDS_LOADER,
  STOP_FEEDS_LOADER
} from "../constants/actionTypes";

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
    .catch(err => {
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
}

