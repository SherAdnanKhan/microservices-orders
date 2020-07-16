import http from '../services/httpService';
import { userKey } from '../constants/keys';
import { CHANGE_COLOR } from '../constants/actionTypes';
import socket from '../services/socketService';


export const changeFeelColor = (color, callback) => () => {
  http
    .put(`/users/feel-color?feel_color=${color}`)
    .then(res => {
      localStorage.setItem(userKey, JSON.stringify(res.data.data.user));
      socket.emit('userColorChange', res.data.data.user);
      callback && callback();
    });
};

export const updateFeelColor = color => {
  return {
    type: CHANGE_COLOR,
    payload: color
  };
};