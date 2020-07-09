import http from '../services/httpService';
import { userKey } from '../constants/keys';
import { CHANGE_COLOR } from '../constants/actionTypes';
import socket from '../services/socketService';


export const changeFeelColor = color => () => {
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