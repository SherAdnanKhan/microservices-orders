import { GET_POST } from "../constants/actionTypes";
import http from "../services/httpService";

export const getPost = (post) => dispatch => {
  http
    .get(`/posts/${post}`)
    .then(res => {
      if(res.data.success){
        dispatch({
          type: GET_POST,
          payload: res.data.data
        });
      }
    });
};

export const makeStoke = (post_id,id) => dispatch => {
  http
    .post('/post/stroke',{post_id})
    .then(res => {
      dispatch(getPost(id))
    });
};

export const unStoke = (post_id,id) => dispatch => {
  http
    .post('/post/unstroke',{post_id})
    .then(res => {
      dispatch(getPost(id))
    });
};
