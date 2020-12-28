import http from '../services/httpService';
import { userKey, tokenKey } from '../constants/keys';
import { isEmpty } from '../utils/helperFunctions';
import socket from '../services/socketService';
import { toast } from 'react-toastify';

export const register = (credentials, callback) => () => {
  http
    .post('/auth/register', credentials, {})
    .then(res => {
      localStorage.removeItem('step');
      localStorage.removeItem('data');
      setCurrentUser(res.data.data);
      callback && callback();

      window.location.href = '/verification';
    }).catch(() => {
      callback && callback();
    });
};

export const login = credentials => dispatch => {
  http
    .post('/auth/login', credentials)
    .then(res => {
      setCurrentUser(res.data.data);

      if (res?.data?.data?.user?.email_verified_at) {
        window.location.href = '/lobby';
      } else {
        window.location.href = '/verification';
      }
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

export const resendVerificationCode = dispatch => () => {
  http
    .get('/auth/resend-verify-code')
    .then(res => {
      toast.success('Verification code sent successfully.');
    })
    .catch(err => {
      if (err.response.status === 404 || err.response.status === 400) {
        toast.error(err.response.data?.errors?.error);
        dispatch(logout());
      }
    });
}

export const verifyEmail = data => () => {
  http
    .post('/auth/verify', data)
    .then(res => {
      localStorage.setItem(userKey, JSON.stringify(res.data.data.user));
      toast.success('Email verified successfully.');
      window.location.href = '/welcome';
    })
}