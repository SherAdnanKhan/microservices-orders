import http from '../services/httpService';
import { ART_SEARCH, CHILD_ART_SEARCH, CLEAR_ART, CLEAR_CHILD_ART } from '../constants/actionTypes';
import socket from '../services/socketService';
import { getCurrentUser } from './authActions';
import { POST_CREATED } from '../constants/keys';

export const artSearch = (art) => dispatch => {
  http
    .get('/arts/search', { params: { art } })
    .then(res => {
      dispatch({
        type: ART_SEARCH,
        payload: res.data,
      });
    });
};

export const searchChildArt = (id, childArtName) => dispatch => {
  http
    .get(`/arts/search-child?parent_art_id=${id} ${childArtName ? `&child_art=${childArtName}` : ''}`)
    .then(res => {
      dispatch({
        type: CHILD_ART_SEARCH,
        payload: res.data.data.child_arts
      });
    });
};

export const clearArtSearch = () => {
  return { type: CLEAR_ART };
}

export const clearChildArt = () => {
  return { type: CLEAR_CHILD_ART };
}

export const artPost = (data, history) => () => {
  http
    .post('/posts', data, {})
    .then((res) => {
      const payload = {
        recievers: res?.data?.data?.faved_users_slug,
        sender: getCurrentUser()
      }

      socket.emit('faveExhibitNotifications', payload, POST_CREATED);
      history.push('/lobby');
    });
};

export const updatePost = (data, postId, history) => () => {
  http
    .post(`/post/update/${postId}`, data, {})
    .then(() => {
      history.push('/lobby');
    });
};
