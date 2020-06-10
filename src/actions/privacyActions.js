import { GET_PRIVACIES } from "../constants/actionTypes";
import http from "../services/httpService";

export const getPrivacies = () => dispatch => {
  http
    .get('/user/privacy')
    .then(res => {
      dispatch({
        type: GET_PRIVACIES,
        payload: res.data.data
      });
    });
};