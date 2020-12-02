import {
  GET_FAV_POSTS,
  GET_FAV_GALLERY_USERS,
  START_POST_LOADER,
  STOP_POST_LOADER,
  UNREAD_CONVERSATIONS,
  UPDATE_UNREAD_CONVERSATIONS,
  CLEAR_UNREAD_CONVERSATIONS
} from "../constants/actionTypes";
import http from '../services/httpService';

export const getFavouriteGalleryUsers = (page = 1) => dispatch => {
  http
    .get(`/lobby/faved-users?page=${page}`)
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


export const getUnreadConversations = () => dispatch => {
  http
    .get('lobby/unread-conversations')
    .then(res => {
      dispatch({
        type: UNREAD_CONVERSATIONS,
        payload: res.data
      });
    })
    .catch(() => {
    })
}

export const updateUnreadConversations = id => dispatch => {
  dispatch({
    type: UPDATE_UNREAD_CONVERSATIONS,
    payload: id
  });
}

export const clearUnreadConversations = () => dispatch => {
  dispatch({
    type: CLEAR_UNREAD_CONVERSATIONS
  });
}
