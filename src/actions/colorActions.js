import http from '../services/httpService';
import { userKey } from '../constants/keys';

export const changeFeelColor = (color, callback) => () => {
  http
    .put(`/users/feel-color?feel_color=${color}`)
    .then(res => {
      localStorage.setItem(userKey, JSON.stringify(res.data.data.user));
      callback && callback(color);
    });
};
