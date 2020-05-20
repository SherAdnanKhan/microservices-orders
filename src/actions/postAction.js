import { GET_POST, STROKE_POST, UNSTROKE_POST } from "../constants/actionTypes";
import http from "../services/httpService";

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

export const makeStoke = (post_id, id) => dispatch => {
  dispatch({ type: STROKE_POST, payload: true });

  http
    .post('/post/stroke', { post_id })
    .then()
    .catch(err => {
      dispatch({ type: UNSTROKE_POST, payload: false });
    });
};

export const unStoke = (post_id, id) => dispatch => {
  dispatch({ type: UNSTROKE_POST, payload: false });

  http
    .post('/post/unstroke', { post_id })
    .then()
    .catch(err => {
      dispatch({ type: STROKE_POST, payload: true });
    });
};
