import {
  GET_GALLERY,
  GET_USER_FAV_GALLERIES,
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
} from '../constants/actionTypes';
import http from '../services/httpService';
import { toast } from 'react-toastify';

export const getGallery = slug => dispatch => {
  http
    .get(`/galleries/${slug}`)
    .then(res => {
      dispatch({
        type: GET_GALLERY,
        payload: res.data.data
      });
    });
};

export const getUserFavGelleries = userId => dispatch => {
  http
    .get(`/galleries/faved/gallery?user_id=${userId}`)
    .then(res => {
      dispatch({
        type: GET_USER_FAV_GALLERIES,
        payload: res.data.data.user_faved_galleries
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
      });
    });
};

export const clearGallery = () => ({ type: CLEAR_GALLERY, payload: null });

export const createGallery = (data, callback) => dispatch => {
  dispatch({ type: START_GALLERY_LOADER });
  http
    .post('/galleries/my-gallery/create', data, {})
    .then(res => {
      toast('Gallery created successfully.');
      dispatch({
        type: CREATE_GALLERY,
        payload: res.data.data.gallery
      });
      dispatch({ type: STOP_GALLERY_LOADER });
      callback && callback();
    }).catch(() => {
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
    }).catch(() => {
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
    }).catch(() => {
      dispatch({ type: STOP_GALLERY_LOADER });
      callback && callback();
    });
};

export const favGallery = gallery => dispatch => {
  dispatch({
    type: FAV_GALLERY,
    payload: { gallery, hasFaved: true }
  });

  http
    .post('/galleries/fav', { gallery_id: gallery.id })
    .then()
    .catch(() => {
      dispatch({
        type: UNFAV_GALLERY,
        payload: { gallery, hasFaved: false }
      });
    });
};

export const unfavGallery = (gallery) => dispatch => {
  dispatch({
    type: UNFAV_GALLERY,
    payload: { gallery, hasFaved: false }
  }); 
  http
    .post('/galleries/unfav', { gallery_id: gallery.id  })
    .then(res=>
    {
      toast.success("Gallery Unfave successfully");
    })
    .catch(() => {
      dispatch({
        type: FAV_GALLERY,
        payload: { gallery, hasFaved: true }
      });
    });
};

export const getRecommendedGalleries = () => dispatch => {
  http
    .get('/galleries/recommended/galleries')
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
    .catch(() => {
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
    .catch(() => {
      dispatch({
        type: FAV_RECOMMEND_GALLERY,
        payload: data
      });
    });
};
