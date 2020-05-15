import { GET_GALLERY, MAKE_FAV } from "../constants/actionTypes";
import http from "../services/httpService";

export const getGallery = (utilite) => dispatch => {
  http
    .get(`/galleries/${utilite}`)
    .then(res => {
      console.log("res",res);
      dispatch({
        type: GET_GALLERY,
        payload: res.data.data
      });
    });
};

export const makeFav = (gallery_id) => dispatch => {
  http
    .get(`/galleries/fav`,{gallery_id})
    .then(res => {
      console.log("res",res);
      // dispatch({
      //   type: MAKE_FAV,
      //   payload: res.data.data
      // });
    });
};