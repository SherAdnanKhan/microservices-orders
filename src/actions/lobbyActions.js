import { GET_FAV_POSTS, GET_FAV_GALLERY_USERS, START_POST_LOADER, STOP_POST_LOADER } from "../constants/actionTypes";
import http from '../services/httpService';

export const getFavouriteGalleryUsers = () => dispatch => {
  http
    .get('/lobby/faved-users')
    .then(res => {
      dispatch({
        type: GET_FAV_GALLERY_USERS,
        payload: res?.data?.data?.all_faved_users
      });
    });
};

export const getFavouritePosts = (page = 1) => dispatch => {
  if (page > 1) {
    dispatch({ type: START_POST_LOADER });
  }
  http
    .get(`/lobby/posts?page=${page}`)
    .then(res => {
      dispatch({ type: STOP_POST_LOADER });
      dispatch({
        type: GET_FAV_POSTS,
        payload: res?.data?.data?.faved_galleries_posts
      });
    })
    .catch(() => {
      dispatch({ type: STOP_POST_LOADER })
    })
};

