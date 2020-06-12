import {
  GET_PRIVACIES,
  CHANGE_GALLERY_PRIVACY,
  CHANGE_OTHER_PRIVACY,
  START_PRIVACY_LOADING,
  STOP_PRIVACY_LOADING,
  SPRFVS_USERS,
  USER_REQUESTS,
  INVITED_USERS,
  REQUEST_APPROVED,
  ADD_TO_SPRFVS
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

export const addToSuperFavs = privacy => dispatch => {
  http
    .post('/user/privacy/sprfvs', privacy)
    .then(res => {
      toast('Request sent successfully.');
      dispatch({
        type: ADD_TO_SPRFVS,
        payload: 2
      })
    });
};

export const addToInviteOnly = privacy => dispatch => {
  http
    .post('/user/privacy/invite-only', privacy)
    .then(res => {
      toast('Invitation sent successfuly');
    });
};

export const getSprfvsUsers = (privacyTypeId, status) => dispatch => {
  http
    .get(`/user/privacy/lists/${privacyTypeId}/${status}`)
    .then(res => {
      dispatch({
        type: SPRFVS_USERS,
        payload: res.data.data.faves
      });
    });
};

export const getUserRequests = (privacyTypeId, status) => dispatch => {
  http
    .get(`/user/privacy/lists/${privacyTypeId}/${status}`)
    .then(res => {
      dispatch({
        type: USER_REQUESTS,
        payload: res.data.data.faves
      });
    });
};

export const getInvitedUsers = (privacyTypeId, status) => dispatch => {
  http
    .get(`/user/privacy/lists/${privacyTypeId}/${status}`)
    .then(res => {
      dispatch({
        type: INVITED_USERS,
        payload: res.data.data.faves
      });
    });
};

export const approveRequest = request => dispatch => {
  http
    .post('/user/privacy/sprfvs/approved', request)
    .then(res => {
      console.log(res.data.data);
      toast('You have approved request.');

      dispatch({
        type: REQUEST_APPROVED,
        payload: request
      });
    });
};