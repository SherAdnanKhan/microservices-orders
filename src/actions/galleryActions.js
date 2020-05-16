import { GET_GALLERY, UNFAV_GALLERY, FAV_GALLERY } from "../constants/actionTypes";
import http from "../services/httpService";

export const getGallery = (utilite) => dispatch => {
  http
    .get(`/galleries/${utilite}`)
    .then(res => {
      dispatch({
        type: GET_GALLERY,
        payload: res.data.data
      });
    });
};

export const favGallery = data => dispatch => {
  http
    .post('/galleries/fav', data)
    .then(res => {
      dispatch({
        type: FAV_GALLERY,
        payload: true
      });
    });
};

export const unfavGallery = data => dispatch => {
  http
    .post('/galleries/unfav', data)
    .then(res => {
      dispatch({
        type: UNFAV_GALLERY,
        payload: false
      });
    });
};

