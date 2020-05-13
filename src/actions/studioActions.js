import { GET_MY_STUDIO } from "../constants/actionTypes";
import http from "../services/httpService";

export const getMyStudio = () => dispatch => {
  http
    .get('/my-studio')
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: GET_MY_STUDIO,
        payload: res.data.data
      });
    });
};