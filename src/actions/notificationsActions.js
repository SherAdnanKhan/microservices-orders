import { toast } from "react-toastify";
import {
  UPDATE_UNREAD_NOTIFICATION_COUNT,
  RESET_UNREAD_NOTIFICATION_COUNT,
  GET_ALL_NOTIFICATIONS,
  START_NOTIFICATION_LOADER,
  STOP_NOTIFICATION_LOADER,
  GET_NOTIFCATION_COUNT,
  // READ_NOTIFICATION,
} from "../constants/actionTypes";
import http from '../services/httpService';

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

export const readNotification = notification => dispatch => {
  console.log("api is called")
  // http
  //   .get(`notification/read/${notification.id}`)
  //   .then(res => {
  // return {
  //   type: READ_NOTIFICATION,
  //   payload: notification
  // }
  //   })
  //   .catch(error => toast.error(error.response.data.errors.message))
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