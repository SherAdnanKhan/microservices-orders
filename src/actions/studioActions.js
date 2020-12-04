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
  GET_MY_VAULTS,
  CLEAR_USER_STUDIO,
  UPDATE_USERNAME,
  UPDATE_USER_ART,
  START_POST_LOADER,
  STOP_POST_LOADER,
  CLEAR_MY_VAULTS,
  UPDATE_DATE_OF_BIRTH,
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
export const getMyVault = (page = 1) => dispatch => {
  if (page > 1) {
    dispatch({ type: START_POST_LOADER });
  }
  http
    .get(`/vault?page=${page}`)
    .then(res => {
      dispatch({ type: STOP_POST_LOADER });
      dispatch({
        type: GET_MY_VAULTS,
        payload: res.data.data
      });
    })
    .catch(() => {
      dispatch({ type: STOP_POST_LOADER })
    })
};
export const clearVaults = () => dispatch => {
  dispatch({
    type: CLEAR_MY_VAULTS,
  });
};

export const createOrUpdateProfile = (data, history) => () => {
  http
    .post('/my-studio/avatar', data, {})
    .then(res => {
      const user = getCurrentUser();
      user.avatars = res.data.data.avatars;
      localStorage.setItem(userKey, JSON.stringify(user));

      window.location.href = `/my-studio/profile/`;
    });
};

export const updateBio = bio => dispatch => {
  http
    .put(`/users/user-bio`, bio)
    .then(() => {
      toast('Bio saved successfully');
      dispatch({
        type: UPDATE_BIO,
        payload: bio.bio
      });
    })
    .catch(err => {
      err.response &&
        toast.error(`Something failed while updating user bio`);
    });
};
export const updateArt = artId => dispatch => {
  http
    .post(`/arts/user-art-selection`, artId)
    .then(res => {
      toast.success("art updated successfully")
      const user = JSON.parse(localStorage.getItem(userKey));
      user.art = res?.data?.data?.user?.art;
      localStorage.setItem(userKey, JSON.stringify(user));
      let id = res?.data?.data?.user?.art?.id;
      localStorage.setItem('art_id', id);
      dispatch({
        type: UPDATE_USER_ART,
        payload: res?.data?.data?.user?.art
      })
    })
    .catch(err => {
      err.response &&
        toast.error(`Something failed while updating user art`);
    });
}

export const updateUsername = username => dispatch => {
  http
    .put(`/users/user-name`, username)
    .then(() => {
      toast.success('Username saved successfully');
      dispatch({
        type: UPDATE_USERNAME,
        payload: username.username
      });
    })
    .catch(err => {
      err.response &&
        toast.error(`Something failed while updating username`);
    });
};

export const updateBirthDate = data => dispatch => {
  console.log("DATA=", data)
  http
    .put(`users/user-dob`, data)
    .then(() => {
      toast.success('Date of birth updated successfully');
      dispatch({
        type: UPDATE_DATE_OF_BIRTH,
        payload: data.dob
      });
    })
    .catch(err => {
      err.response &&
        toast.error(`Something failed while updating date of birth`);
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

export const clearUserStudio = () => {
  return { type: CLEAR_USER_STUDIO };
}

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
      window.location.href = `/my-studio/profile`;
    });
};
