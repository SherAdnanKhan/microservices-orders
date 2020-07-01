import {
  GET_POST, STROKE_POST, UNSTROKE_POST, ADD_COMMENT, GET_COMMENTS, GET_NCOMM
} from '../constants/actionTypes';
import http from '../services/httpService';

export const getPost = (post) => dispatch => {
  http
    .get(`/posts/${post}`)
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: GET_POST,
          payload: res.data.data
        });
      }
    });
};

export const makeStoke = postId => dispatch => {
  dispatch({ type: STROKE_POST, payload: true });

  http
    .post('/post/stroke', { post_id: postId })
    .then()
    .catch(() => {
      dispatch({ type: UNSTROKE_POST, payload: false });
    });
};

export const unStoke = (postId) => dispatch => {
  dispatch({ type: UNSTROKE_POST, payload: false });

  http
    .post('/post/unstroke', { post_id: postId })
    .then()
    .catch(() => {
      dispatch({ type: STROKE_POST, payload: true });
    });
};

export const createComment = data => dispatch => {
  http
    .post('/comments', data)
    .then(res => {
      dispatch({
        type: ADD_COMMENT,
        payload: res.data.data.comment
      });
    });
};

export const getComments = postId => dispatch => {
  http
    .get(`/comments/${postId}`)
    .then(res => {
      dispatch({
        type: GET_COMMENTS,
        payload: res.data.data.comments
      });
    });
};

export const getNcomm = slug => dispatch => {
  http
    .get(`/post/ncomm/${slug}`)
    .then(res => {
      dispatch({
        type: GET_NCOMM,
        payload: res.data.data.ncom_posts
      });
    });
};
