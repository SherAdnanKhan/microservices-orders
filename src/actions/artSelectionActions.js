import http from "../services/httpService"
import { GET_ART, SELECT_USER } from "../constants/actionTypes";

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

export const newArt = (value, history) => dispatch => {
  if (value) {
    http
      .post('/arts', value)
      .then(res => {
        history.push('/dashboard/start-favas');
      });
  }
};

export const selectArt = (value, history) => dispatch => {
  http
    .post('/arts/user-art-selection', value)
    .then(res => {
      let id = res?.data?.data?.user?.art?.id;
      let name = res?.data?.data?.user?.art?.name;
      localStorage.setItem('art_id', id);
      dispatch({
        type: SELECT_USER,
        payload: [id, name]
      })
      history.push('/dashboard/start-favas');
    });
};


