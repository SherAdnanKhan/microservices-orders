import { GET_FAV_USERS, GET_ALL_USERS, GET_USER_ART_NAME, GET_OTEHR_FAV_USER } from "../constants/actionTypes";
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
  .get('/arts',{params:{id}})
  .then(res => {
    console.log("res",res)
    // dispatch({
    //   type: GET_USER_ART_NAME,
    //   payload: res.data
    // })
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
