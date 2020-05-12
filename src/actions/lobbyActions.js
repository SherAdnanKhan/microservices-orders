import { GET_FAV_USERS } from "../constants/actionTypes";
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