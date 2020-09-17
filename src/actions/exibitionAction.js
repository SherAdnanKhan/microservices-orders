import http from '../services/httpService';
import { ART_SEARCH, CLEAR_ART } from '../constants/actionTypes';

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

export const clearArtSearch = () => {
  return { type: CLEAR_ART };
}

export const artPost = (data, history) => () => {
  http
    .post('/posts', data, {})
    .then(() => {
      history.push('/dashboard/my-studio');
    });
};

export const updatePost = (data, postId, history) => () => {
  http
    .post(`/post/update/${postId}`, data, {})
    .then(() => {
      history.push('/dashboard/my-studio');
    });
};
