import http from '../services/httpService';
import { userKey } from '../constants/keys';
import { CHANGE_COLOR, GET_ALL_FEEL_COLORS } from '../constants/actionTypes';
import socket from '../services/socketService';


export const changeFeelColor = (colorId, callback) => (dispatch) => {
  http
    .put(`/users/feel-color?feel_id=${colorId}`)
    .then(res => {
      localStorage.setItem(userKey, JSON.stringify(res.data.data.user));

      if (!socket.connected) {
        dispatch(updateFeelColor(res.data.data.user?.feel?.color_code));
      } else {
        socket.emit('userColorChange', res.data.data.user);
      }
      callback && callback();
    });
};

export const getAllFeelColors = () => dispatch => {
  http
    .get('/feel')
    .then(res => {
      dispatch({
        type: GET_ALL_FEEL_COLORS,
        payload: res.data.data.feels
      })
    });
};

export const updateFeelColor = color => {
  return {
    type: CHANGE_COLOR,
    payload: color
  };
};