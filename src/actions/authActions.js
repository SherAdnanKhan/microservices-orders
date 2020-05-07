import http from "../services/httpService"
import { userKey, tokenKey } from "../constants/keys"
import { isEmpty } from "../utils/helperFunctions";

export const register = credentials => dispatch => {
  http
    .post('api/register', credentials, {})
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
    .post('api/login', credentials)
    .then(res => {
      setCurrentUser(res.data.data);
      window.location.href = '/lobby';
    })
    .catch(res => {
    });
};

export const forgotPassword = (email, callback) => dispatch => {
  http
    .post('api/forgot-password', email)
    .then(res => {
      callback(res.data);
    });
};

export const changePassword = (credentials, callback) => dispatch => {
  http
    .post('api/change-password', credentials)
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

  return (isEmpty(user) || isEmpty(token)) ? null : user;
};

const setCurrentUser = ({ user, token }) => {
  localStorage.setItem(userKey, JSON.stringify(user));
  localStorage.setItem(tokenKey, JSON.stringify(token));
};

export const logout = () => {
  localStorage.clear();
  window.location.href = '/login';
};