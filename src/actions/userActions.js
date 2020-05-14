import { GET_FAV_USERS, GET_ALL_USERS } from "../constants/actionTypes";
import http from "../services/httpService";

export const getFavouriteUsers = () => dispatch => {
  http
    .get('/lobby')
    .then(res => {
      dispatch({
        type: GET_FAV_USERS,
        payload: res.data.data
      });
    });
};

export const getAllUsers = query => dispatch => {
  http
    .get(`/users/search?name=${query}`)
    .then(res => {
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data.data.users
      });
    });
};