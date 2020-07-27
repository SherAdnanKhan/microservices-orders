import http from '../services/httpService';
import { GET_ART, SELECT_USER } from '../constants/actionTypes';
import { userKey } from '../constants/keys';

export const getArt = () => dispatch => {
  http
    .get('/arts')
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: GET_ART,
          payload: res.data.data
        });
      }
    });
};

export const newArt = (value, history) => dispatch => {
  if (value) {
    http
      .post('/arts', value)
      .then(res => {
        console.log(res.data.data.art);
        console.log(value);
        const data = {
          art_id: res.data.data.art.id
        };
        http
          .post('/arts/user-art-selection', data)
          .then(res => {
            localStorage.setItem(userKey, JSON.stringify(res.data.data.user));
            let id = res.data.data.user.art.id;
            let name = res.data.data.user.art.name;
            localStorage.setItem('art_id', id);
            dispatch({
              type: SELECT_USER,
              payload: [id, name]
            });
            history.push('/dashboard/start-favas');
          });
      });
  }
};

export const selectArt = (value, history) => dispatch => {
  http
    .post('/arts/user-art-selection', value)
    .then(res => {
      localStorage.setItem(userKey, JSON.stringify(res.data.data.user));
      let id = res.data.data.user.art.id;
      let name = res.data.data.user.art.name;
      localStorage.setItem('art_id', id);
      dispatch({
        type: SELECT_USER,
        payload: [id, name]
      });
      history.push('/start-favas');
    });
};
