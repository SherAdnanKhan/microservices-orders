import {
  GET_POST,
  STROKE_POST,
  UNSTROKE_POST,
  ADD_POST_COMMENT,
  GET_COMMENTS,
  GET_NCOMM,
  CLEAR_NCOMM
} from '../constants/actionTypes';
import http from '../services/httpService';
import socket from '../services/socketService';
import { getCurrentUser } from './authActions';

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

export const strokePost = (postId, galleryId, user) => dispatch => {
  const currentUser = getCurrentUser();

  dispatch({
    type: STROKE_POST,
    payload: {
      postId: postId,
      galleryId: galleryId,
      value: true
    }
  });

  http
    .post('/post/stroke', { post_id: postId })
    .then(() => {
      socket.emit('onPostStroke', { sender: currentUser, reciever: user });
    })
    .catch(() => {
      dispatch({
        type: UNSTROKE_POST,
        payload: {
          postId: postId,
          galleryId: galleryId,
          value: false
        }
      });
    });
};

export const unstrokePost = (postId, galleryId, user) => dispatch => {
  const currentUser = getCurrentUser();

  dispatch({
    type: UNSTROKE_POST,
    payload: {
      postId: postId,
      galleryId: galleryId,
      value: false
    }
  });

  http
    .post('/post/unstroke', { post_id: postId })
    .then(() => {
      socket.emit('onPostUnstroke', { sender: currentUser, reciever: user });
    })
    .catch(() => {
      dispatch({
        type: STROKE_POST,
        payload: {
          postId: postId,
          galleryId: galleryId,
          value: true
        }
      });
    });
};

export const createComment = (data, postId, galleryId, user) => dispatch => {
  const currentUser = getCurrentUser();

  http
    .post('/comments', data)
    .then(res => {
      dispatch({
        type: ADD_POST_COMMENT,
        payload: { comment: res.data.data.comment, postId, galleryId }
      });
      socket.emit('onPost', { sender: currentUser, reciever: user });
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

export const clearNcomm = () => {
  return {
    type: CLEAR_NCOMM,
  };
};

