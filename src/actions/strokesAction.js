import { GET_STROKES } from "../constants/actionTypes";
import http from "../services/httpService";

export const getStokes = (post) => dispatch => {
  http
    .get(`/posts/${post}`)
    .then(res => {
      dispatch({
        type: GET_STROKES,
        payload: res.data.data
      });
    });
};

export const makeStoke = (post_id,id) => dispatch => {
  http
    .post('/post/stroke',{post_id})
    .then(res => {
      dispatch(getStokes(id))
    });
};

export const unStoke = (post_id,id) => dispatch => {
  http
    .post('/post/unstroke',{post_id})
    .then(res => {
      dispatch(getStokes(id))
    });
};
