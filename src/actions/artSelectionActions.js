import http from "../services/httpService"
import { GET_ART,ART_SEARCH } from "../constants/actionTypes";

export const getArt = () => dispatch => {
  http
    .get('/arts')
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: GET_ART,
          payload: res.data.data
        })
      }
    })
    .catch(res => {
    });
};

export const newArt = (value) => dispatch => {
  if(value){
  http
    .post('/arts', value )
    .then(res => {
      window.location.href = '/dashboard/lobby';
    });
  }
};
export const selectArt = (value) => dispatch => {
  http
    .post('/arts/user-art-selection', value )
    .then(res => {
      window.location.href = '/dashboard/lobby';
    });
};
export const artSearch = (art) => dispatch => {
  http
    .get('/arts/search', {params:{art}})
    .then(res => {
      dispatch({
        type:ART_SEARCH,
        payload:res.data,
      })
    });
};

