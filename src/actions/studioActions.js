import { GET_MY_STUDIO, GET_USER_STUDIO } from "../constants/actionTypes";
import http from "../services/httpService";
import { getCurrentUser } from "./authActions";
import { userKey } from "../constants/keys";

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

      history.push('/dashboard/my-studio/profile');
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
