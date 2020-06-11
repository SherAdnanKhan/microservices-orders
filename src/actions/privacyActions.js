import {
  GET_PRIVACIES,
  CHANGE_GALLERY_PRIVACY,
  CHANGE_OTHER_PRIVACY,
  START_PRIVACY_LOADING,
  STOP_PRIVACY_LOADING
} from "../constants/actionTypes";
import http from "../services/httpService";
import { toast } from "react-toastify";

export const getPrivacies = () => dispatch => {
  dispatch({ type: START_PRIVACY_LOADING });

  http
    .get('/user/privacy')
    .then(res => {
      dispatch({
        type: GET_PRIVACIES,
        payload: res.data.data
      });
      dispatch({ type: STOP_PRIVACY_LOADING });
    })
    .catch(err => {
      dispatch({ type: STOP_PRIVACY_LOADING });
    });
};

export const changeGalleryPrivacy = privacy => dispatch => {
  dispatch({ type: START_PRIVACY_LOADING });

  http
    .post('/user/privacy', privacy)
    .then(res => {
      dispatch({
        type: CHANGE_GALLERY_PRIVACY,
        payload: res.data.data.privacy
      });
      dispatch({ type: STOP_PRIVACY_LOADING });
    })
    .catch(err => {
      dispatch({ type: STOP_PRIVACY_LOADING });
    });
};

export const changeOtherPrivacy = privacy => dispatch => {
  dispatch({ type: START_PRIVACY_LOADING });

  http
    .post('/user/privacy', privacy)
    .then(res => {
      dispatch({
        type: CHANGE_OTHER_PRIVACY,
        payload: res.data.data.privacy
      });
      dispatch({ type: STOP_PRIVACY_LOADING });
    })
    .catch(err => {
      dispatch({ type: STOP_PRIVACY_LOADING });
    });
};

export const addToSuperFavs = (privacy, callback) => dispatch => {
  http
    .post('/user/privacy/sprfvs', privacy)
    .then(res => {
      toast('Request sent successfully.');
      callback && callback();
    });
};

export const addToInviteOnly = privacy => dispatch => {
  http
    .get('/user/privacy/sprfvs')
    .then(res => {


    })
    .catch(err => {

    });
};