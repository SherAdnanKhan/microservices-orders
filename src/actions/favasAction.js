import http from "../services/httpService"
import { GET_FAVES } from "../constants/actionTypes";

export const getFavas = () => dispatch => {
  http
    .get('/favs/get-faves')
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: GET_FAVES,
          payload: res.data.data.faves
        })
      }
    })
    .catch(res => {
    });
};