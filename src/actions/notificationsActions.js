import { toast } from "react-toastify";
import {
  UPDATE_UNREAD_NOTIFICATION_COUNT,
  RESET_UNREAD_NOTIFICATION_COUNT,
  GET_ALL_NOTIFICATIONS,
  START_NOTIFICATION_LOADER,
  STOP_NOTIFICATION_LOADER,
  GET_NOTIFCATION_COUNT,
  READ_NOTIFICATION,
  UNREAD_NOTIFICATION,
  REQUEST_APPROVED,
  REQUEST_REJECTED,
} from "../constants/actionTypes";
import { SPRFVS_APPROVED } from "../constants/keys";
import http from '../services/httpService';
import socket from "../services/socketService";
import { getCurrentUser } from "./authActions";

export const updateNotificationUnreadCount = () => {
  return {
    type: UPDATE_UNREAD_NOTIFICATION_COUNT,
  }
};

export const resetNotificationCount = notification => {
  return {
    type: RESET_UNREAD_NOTIFICATION_COUNT,
    payload: notification
  }
}

export const readNotification = id => dispatch => {
  http
    .get(`notification/read/${id}`)
    .then(res => {
      dispatch({
        type: READ_NOTIFICATION,
        payload: id
      })
    })
    .catch(error => toast.error(error.response.data.errors.message))
}

export const getAllNotifications = (page = 1) => dispatch => {
  if (page > 1) {
    dispatch({ type: START_NOTIFICATION_LOADER });
  }
  http
    .get(`/notification?page=${page}`)
    .then(res => {
      dispatch({ type: STOP_NOTIFICATION_LOADER });
      dispatch({
        type: GET_ALL_NOTIFICATIONS,
        payload: res.data.data.notifications
      });
    })
    .catch(() => {
      dispatch({ type: STOP_NOTIFICATION_LOADER })
    })
};
export const getNotificationCount = dispatch => {
  http
    .get(`/notification/count`)
    .then(res => {
      dispatch({
        type: GET_NOTIFCATION_COUNT,
        payload: res.data.data.notification_count
      });
    })
    .catch(error => toast.error(error.response.data.errors.message))
}

export const approveNotificationRequest = (request, notification) => dispatch => {
  dispatch({
    type: READ_NOTIFICATION,
    payload: notification?.id
  });

  http
    .post('/user/privacy/sprfvs/approved', request)
    .then(() => {
      const currentUser = getCurrentUser();

      if (currentUser.id !== notification?.sender.id) {
        socket.emit(
          'onUserNotifications',
          { sender: currentUser, reciever: notification.sender }, SPRFVS_APPROVED);
      }

      dispatch({
        type: REQUEST_APPROVED,
        payload: request
      });
    }).catch(err => {
      dispatch({
        type: UNREAD_NOTIFICATION, payload: notification?.id
      });
    });
};

export const rejectNotificationRequest = (request, notification) => dispatch => {
  dispatch({
    type: READ_NOTIFICATION,
    payload: notification?.id
  });

  http
    .post('/user/privacy/sprfvs/reject', request)
    .then(() => {
      toast('Request rejected.');
      dispatch({
        type: REQUEST_REJECTED,
        payload: request
      });
    }).catch(err => {
      dispatch({
        type: UNREAD_NOTIFICATION, payload: notification?.id
      });
    });
};