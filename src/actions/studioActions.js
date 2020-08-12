import {
  GET_MY_STUDIO,
  GET_USER_STUDIO,
  UPDATE_BIO,
  ADD_TO_SPRFVS,
  ADD_TO_INVITE_ONLY,
  REMOVE_FROM_INVITE_ONLY,
  START_STUDIO_LOADER,
  STOP_STUDIO_LOADER,
  UN_SUPER_FAV,
} from '../constants/actionTypes';
import http from '../services/httpService';
import { getCurrentUser } from './authActions';
import { userKey } from '../constants/keys';
import { toast } from 'react-toastify';

export const getMyStudio = () => dispatch => {
  http
    .get('/my-studio')
    .then(res => {
      dispatch({
        type: GET_MY_STUDIO,
        payload: res.data.data
      });
    });
};

export const createOrUpdateProfile = (data, history) => () => {
  http
    .post('/my-studio/avatar', data, {})
    .then(res => {
      const user = getCurrentUser();
      user.avatars = res.data.data.avatars;
      localStorage.setItem(userKey, JSON.stringify(user));

      window.location.href = `/dashboard/my-studio/profile/`;
    });
};

export const updateBio = bio => dispatch => {
  http
    .put(`/users/user-bio?bio=${bio}`)
    .then(() => {
      toast('Bio saved successfully');
      dispatch({
        type: UPDATE_BIO,
        payload: bio
      });
    });
};

export const getUserStudio = (slug) => dispatch => {
  http
    .get(`/studios/${slug}`)
    .then(res => {
      dispatch({
        type: GET_USER_STUDIO,
        payload: res.data.data
      });
    });
};

export const addToSuperFavs = privacy => dispatch => {
  http
    .post('/user/privacy/sprfvs', privacy)
    .then(() => {
      toast('Request sent successfully.');
      dispatch({
        type: ADD_TO_SPRFVS,
        payload: 2
      });
    });
};
export const unSuperFav = privacy => dispatch => {
  http
    .post('/user/privacy/unsprfvs', privacy)
    .then((res) => {
      toast.success('user UnSuper Favourtie Successfully');
      dispatch({
        type: UN_SUPER_FAV,
        payload: 0
      });
    });
};

export const addToInviteOnly = privacy => dispatch => {
  dispatch({ type: START_STUDIO_LOADER });

  http
    .post('/user/privacy/invite-only', privacy)
    .then(() => {
      dispatch({
        type: ADD_TO_INVITE_ONLY,
        payload: privacy.gallery_id
      });
      dispatch({ type: STOP_STUDIO_LOADER });

      toast('Invitation sent successfuly');
    }).catch(() => {
      dispatch({ type: STOP_STUDIO_LOADER });
    });
};

export const removeFromInviteOnly = privacy => dispatch => {
  dispatch({ type: START_STUDIO_LOADER });

  http
    .post('/user/privacy/uninvite-only', privacy)
    .then(() => {
      dispatch({
        type: REMOVE_FROM_INVITE_ONLY,
        payload: privacy.gallery_id
      });
      dispatch({ type: STOP_STUDIO_LOADER });

      toast('Invitation revoked successfuly');
    }).catch(() => {
      dispatch({ type: STOP_STUDIO_LOADER });
    });
};

export const deleteProfileImage = (id, history, slug) => () => {
  http
    .delete(`/my-studio/avatar/${id}`)
    .then(() => {
      const user = getCurrentUser();

      user.avatars = user.avatars.filter(avatar => avatar.id !== id);
      localStorage.setItem(userKey, JSON.stringify(user));
      window.location.href = `/dashboard/my-studio/profile/`;
    });
};
