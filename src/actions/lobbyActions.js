import { GET_FAV_POSTS, GET_FAV_GALLERY_USERS } from "../constants/actionTypes";
import http from '../services/httpService';

export const getFavouriteGalleryUsers = () => dispatch => {
  http
    .get('/lobby/faved-users')
    .then(res => {
      console.log(res.data);

      dispatch({
        type: GET_FAV_GALLERY_USERS,
        payload: res?.data?.data?.all_faved_users
      });
    });
};

export const getFavouritePosts = (page = 1) => dispatch => {
  http
    .get(`/lobby/posts?page=${page}`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_FAV_POSTS,
        payload: res?.data?.data?.faved_galleries_posts
      });
    });
};

