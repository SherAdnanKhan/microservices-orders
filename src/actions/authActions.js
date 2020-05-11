import http from "../services/httpService"
import { userKey, tokenKey, avatarKey } from "../constants/keys"
import { isEmpty } from "../utils/helperFunctions";

export const register = credentials => dispatch => {
  http
    .post('auth/register', credentials, {})
    .then(res => {
      localStorage.removeItem('step');
      localStorage.removeItem('data');

      setCurrentUser(res.data.data);
      window.location.href = '/welcome';
    })
    .catch(res => {
    });
};

export const login = credentials => dispatch => {
  http
    .post('auth/login', credentials)
    .then(res => {
      setCurrentUser(res.data.data);
      window.location.href = '/lobby';
    })
    .catch(res => {
    });
};

export const forgotPassword = (email, callback) => dispatch => {
  http
    .post('auth/forgot-password', email)
    .then(res => {
      callback(res.data);
    });
};

export const changePassword = (credentials, callback) => dispatch => {
  http
    .post('auth/change-password', credentials)
    .then(res => {
      callback(res.data);
    });
}

export const getAuthToken = () => {
  const token = JSON.parse(localStorage.getItem(tokenKey));
  return token ? token : null;
}

export const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem(userKey));
  const token = JSON.parse(localStorage.getItem(tokenKey));
  const avatars = JSON.parse(localStorage.getItem(avatarKey));

  return (isEmpty(user) || isEmpty(token) || !avatars) ? null : { user, avatars };
};

const setCurrentUser = ({ user, token, avatars }) => {
  localStorage.setItem(userKey, JSON.stringify(user));
  localStorage.setItem(tokenKey, JSON.stringify(token));
  localStorage.setItem(avatarKey, JSON.stringify(avatars))
};

export const logout = () => {
  localStorage.clear();
  window.location.href = '/login';
};