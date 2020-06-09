import { GET_MY_STUDIO, GET_USER_STUDIO, UPDATE_BIO } from "../constants/actionTypes";
import http from "../services/httpService";
import { getCurrentUser } from "./authActions";
import { userKey } from "../constants/keys";
import { toast } from "react-toastify";

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

      window.location.href = '/dashboard/my-studio/profile';
    });
};

export const updateBio = bio => dispatch => {
  http
    .put(`/users/user-bio?bio=${bio}`)
    .then(res => {
      toast('Bio saved successfully')
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
      })
    });
}

// export const clearUserStudio = () => {
//   return
// }

export const deleteProfileImage = (id, history) => () => {
  http
    .delete(`/my-studio/avatar/${id}`)
    .then(res => {
      const user = getCurrentUser();
      user.avatars = user.avatars.filter(avatar => avatar.id !== id);
      localStorage.setItem(userKey, JSON.stringify(user));

      window.location.href = '/dashboard/my-studio/profile';
    });
}
