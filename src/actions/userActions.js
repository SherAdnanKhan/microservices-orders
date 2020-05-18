import { GET_FAV, GET_ALL_USERS, GET_USER_ART_NAME, GET_OTEHR_FAV_USER } from "../constants/actionTypes";
import http from "../services/httpService";
import { getUserStudio } from "./studioActions"

export const getFavourites = () => dispatch => {
  http
    .get('/lobby')
    .then(res => {
      dispatch({
        type: GET_FAV,
        payload: res.data.data
      });
      console.log(res.data.data);
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

export const getUserArtById = (id) => dispatch => {
  http
  .get(`/arts/art/${id}`)
  .then(res => {
    dispatch({
      type: GET_USER_ART_NAME,
      payload: res.data.data.art
    })
  }
  )
}
export const getOtherFavouriteUsers = () => dispatch => {
  http
    .get('/favs/get-faves')
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: GET_OTEHR_FAV_USER,
          payload: res.data.data.faves
        })
      }
    })
    .catch(res => {
    });
};

export const getOtherFavouriteByUsers = () => dispatch => {
  http
    .get('/favs/get-faved-by')
    .then(res => {
      if (res.data.success) {
          dispatch({
            type: GET_OTEHR_FAV_USER,
            payload: res.data.data.faves
          })
      }
    })
    .catch(res => {
    });
};

export const makeUserFav = (faved_to,slug) => dispatch => {
  http
    .post('/favs',{faved_to})
    .then(res => {
      if(res.data.success){
      dispatch(getUserStudio(slug));
      }
    })
    .catch(res => {
    });
};

export const UserUnFav = (faved_to,slug) => dispatch => {
  http
    .delete(`/favs/${faved_to}`)
    .then(res => {
      if(res.data.success){
      dispatch(getUserStudio(slug));
      }
    })
    .catch(res => {
    });
};
