import { GET_FAV } from "../constants/actionTypes";
import http from '../services/httpService';

export const getFavourites = () => dispatch => {
  http
    .get('/lobby')
    .then(res => {
      dispatch({
        type: GET_FAV,
        payload: res.data.data
      });
    });
};

