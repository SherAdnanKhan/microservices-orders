import http from "../services/httpService"
import { GET_ART,SELECT_USER } from "../constants/actionTypes";

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
      let id = res?.data?.data?.user?.art?.id;
      let name = res?.data?.data?.user?.art?.name;
      localStorage.setItem('art_id',id);
      dispatch({
        type: SELECT_USER,
        payload: [id,name]
      })
      window.location.href = '/dashboard/lobby';
    });
};


