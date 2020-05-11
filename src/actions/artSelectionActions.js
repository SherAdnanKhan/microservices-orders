import http from "../services/httpService"
import { GET_ART } from "../constants/actionTypes";

export const getArt = () => dispatch => {
  http
    .get('/arts')
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: GET_ART,
          payload: res.data.data
        })
      }
    })
    .catch(res => {
    });
};

export const newArt = (value) => dispatch => {
  http
    .post('/arts', { name: value })
    .then(res => {
      window.location.href = '/lobby';
    });
};