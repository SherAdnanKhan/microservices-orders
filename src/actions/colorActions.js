import http from '../services/httpService';
import { userKey } from '../constants/keys';
import io from 'socket.io-client';
import { CHANGE_COLOR } from '../constants/actionTypes';

const socket = io.connect(process.env.REACT_APP_SOCKET_URL);

export const changeFeelColor = (color, callback) => () => {
  http
    .put(`/users/feel-color?feel_color=${color}`)
    .then(res => {
      localStorage.setItem(userKey, JSON.stringify(res.data.data.user));
      socket.emit('userColorChange', res.data.data.user);
    });
};

export const updateFeelColor = color => {
  return {
    type: CHANGE_COLOR,
    payload: color
  };
};