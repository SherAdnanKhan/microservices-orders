import http from '../services/httpService';
import { userKey, tokenKey } from '../constants/keys';
import { isEmpty } from '../utils/helperFunctions';
import { getAllConversations } from './conversationActions';
import socket from '../services/socketService';

export const register = credentials => () => {
  http
    .post('/auth/register', credentials, {})
    .then(res => {
      localStorage.removeItem('step');
      localStorage.removeItem('data');

      setCurrentUser(res.data.data);
      window.location.href = '/welcome';
    });
};

export const login = credentials => dispatch => {
  http
    .post('/auth/login', credentials)
    .then(res => {
      dispatch(getAllConversations());
      setCurrentUser(res.data.data);
      window.location.href = '/dashboard';
    });
};

export const forgotPassword = (email, callback) => () => {
  http
    .post('/auth/forgot-password', email)
    .then(res => {
      callback(res.data);
    });
};

export const changePassword = (credentials, callback) => () => {
  http
    .post('/auth/change-password', credentials)
    .then(res => {
      callback(res.data);
    });
};

export const getAuthToken = () => {
  const token = JSON.parse(localStorage.getItem(tokenKey));
  return token || null;
};

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
  socket.disconnect();
  socket.close();
  localStorage.clear();
  window.location.href = '/login';
};
