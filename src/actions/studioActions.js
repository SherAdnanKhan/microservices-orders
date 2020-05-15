import { GET_MY_STUDIO, SELECT_STUDIO_USER } from "../constants/actionTypes";
import http from "../services/httpService";

export const getMyStudio = () => dispatch => {
  http
    .get('/my-studio')
    .then(res => {
      dispatch({
        type: GET_MY_STUDIO,
        payload: res.data.data
      });
    });
};

export const selectUserForStudio = (data) => dispatch =>{
  console.log("action",data)
  dispatch({
    type: SELECT_STUDIO_USER,
    payload: data
  })
}