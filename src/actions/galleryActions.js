import {
  GET_GALLERY,
  UNFAV_GALLERY,
  FAV_GALLERY,
  CLEAR_GALLERY,
  RECOMMEND_GALLERIES,
  FAV_RECOMMEND_GALLERY,
  UNFAV_RECOMMEND_GALLERY,
  GET_MY_GALLERIES,
  CREATE_GALLERY,
  START_GALLERY_LOADER,
  STOP_GALLERY_LOADER,
  UPDATE_GALLERY,
  REMOVE_GALLERY_IMAGE
} from "../constants/actionTypes";
import http from "../services/httpService";
import { toast } from "react-toastify";

export const getGallery = utilite => dispatch => {
  http
    .get(`/galleries/${utilite}`)
    .then(res => {
      dispatch({
        type: GET_GALLERY,
        payload: res.data.data
      });
    });
};

export const getMyGalleries = () => dispatch => {
  http
    .get('/galleries/my-gallery')
    .then(res => {
      dispatch({
        type: GET_MY_GALLERIES,
        payload: res.data.data,
      })
    });
};

export const clearGallery = () => {
  return { type: CLEAR_GALLERY, payload: null };
};


export const createGallery = (data, callback) => dispatch => {
  dispatch({ type: START_GALLERY_LOADER });
  http
    .post('/galleries/my-gallery/create', data, {})
    .then(res => {
      console.log(res.data.data)

      toast('Gallery created successfully.');
      dispatch({
        type: CREATE_GALLERY,
        payload: res.data.data.gallery
      });
      dispatch({ type: STOP_GALLERY_LOADER });
      callback && callback();
    }).catch(err => {
      dispatch({ type: STOP_GALLERY_LOADER });
      callback && callback();
    });
};

export const updateGallery = (data, id, callback) => dispatch => {
  dispatch({ type: START_GALLERY_LOADER });

  http
    .post(`/galleries/my-gallery/update/${id}`, data, {})
    .then(res => {
      toast('Gallery updated successfully.');
      dispatch({
        type: UPDATE_GALLERY,
        payload: res.data.data.gallery
      });
      dispatch({ type: STOP_GALLERY_LOADER });
      callback && callback();
    }).catch(err => {
      dispatch({ type: STOP_GALLERY_LOADER });
      callback && callback();
    });
};

export const removeGalleryImage = (id, callback) => dispatch => {
  dispatch({ type: START_GALLERY_LOADER });

  http
    .delete(`/galleries/my-gallery/delete-image/${id}`)
    .then(res => {
      toast('Gallery image removed successfully.');
      dispatch({
        type: REMOVE_GALLERY_IMAGE,
        payload: res.data.data.gallery
      });
      dispatch({ type: STOP_GALLERY_LOADER });
      callback && callback();
    }).catch(err => {
      dispatch({ type: STOP_GALLERY_LOADER });
      callback && callback();
    });
};

export const favGallery = data => dispatch => {
  dispatch({
    type: FAV_GALLERY,
    payload: { galleryId: data.gallery_id, hasFaved: true }
  });

  http
    .post('/galleries/fav', data)
    .then()
    .catch(err => {
      dispatch({
        type: UNFAV_GALLERY,
        payload: false
      });
    });
};

export const unfavGallery = data => dispatch => {
  dispatch({
    type: UNFAV_GALLERY,
    payload: { galleryId: data.gallery_id, hasFaved: false }
  });

  http
    .post('/galleries/unfav', data)
    .then()
    .catch(err => {
      dispatch({
        type: FAV_GALLERY,
        payload: true
      });
    });
};

export const getRecommendedGalleries = data => dispatch => {
  http
    .get(`/galleries/recommended/galleries`)
    .then(res => {
      dispatch({
        type: RECOMMEND_GALLERIES,
        payload: res.data.data
      });
    });
};

export const favRecommendedGallery = data => dispatch => {
  dispatch({
    type: FAV_RECOMMEND_GALLERY,
    payload: data
  });

  http
    .post('/galleries/fav', { gallery_id: data.gallery.id })
    .then()
    .catch(err => {
      dispatch({
        type: UNFAV_RECOMMEND_GALLERY,
        payload: data
      });
    });
};

export const unfavRecommendedGallery = data => dispatch => {
  dispatch({
    type: UNFAV_RECOMMEND_GALLERY,
    payload: data
  });

  http
    .post('/galleries/unfav', { gallery_id: data.gallery.id })
    .then()
    .catch(err => {
      dispatch({
        type: FAV_RECOMMEND_GALLERY,
        payload: data
      });
    });
};