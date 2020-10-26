import {
  ONLINE_USERS,
  ADD_ONLINE_USER,
  REMOVE_ONLINE_USER
} from '../constants/actionTypes';

export const setOnlineUsers = users => {
  return {
    type: ONLINE_USERS,
    payload: users
  };
};

export const addOnlineUser = user => {
  return {
    type: ADD_ONLINE_USER,
    payload: user
  };
};

export const removeOnlineUser = user => {
  return {
    type: REMOVE_ONLINE_USER,
    payload: user
  };
};



