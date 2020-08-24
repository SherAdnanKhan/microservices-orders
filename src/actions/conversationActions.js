import http from '../services/httpService';
import { toast } from 'react-toastify';
import {
  GET_CONVERSATION,
  UPDATE_CONVERSATION,
  CLEAR_CONVERSATION,
  GET_ALL_CONVERSATIONS,
  START_FILE_LOADER,
  STOP_FILE_LOADER,
  READ_MESSAGE,
  READ_ALL,
  UPDATE_CONVERSATION_UNREAD_COUNT,
  RESET_CONVERSATION_COUNT
} from '../constants/actionTypes';
import { isNumber } from '../utils/helperFunctions';

export const getAllConversations = (callback) => dispatch => {
  http
    .get('/chats')
    .then(res => {
      localStorage.setItem('conversations', JSON.stringify(res.data.data.conversations));
      callback && callback(res.data.data.conversations);

      dispatch({
        type: GET_ALL_CONVERSATIONS,
        payload: res.data.data.conversations
      });
    });
};

export const getConversation = (idOrSlug, page = 1, callback) => dispatch => {
  console.log(isNumber(idOrSlug));
  const url = isNumber(idOrSlug)
    ? `/chats/user/${idOrSlug}/id?page=${page}`
    : `/chats/user/${idOrSlug}?page=${page}`;

  http
    .get(url)
    .then(res => {
      dispatch({
        type: GET_CONVERSATION,
        payload: res.data.data
      });
      callback && callback()
    });
};

export const updateConversation = data => dispatch => {
  dispatch({
    type: UPDATE_CONVERSATION,
    payload: data
  });
};

export const createMessage = (data, success) => () => {
  const payload = {
    message: data.message,
    conversation_id: data.room,
    user_id: data.user.id,
    message_type: data.type,
    url: data.url
  };

  http
    .post('/chats/message', payload)
    .then(res => success && success(res.data.data));
};

export const clearConversation = () => dispatch => {
  dispatch({ type: CLEAR_CONVERSATION, payload: null });
};

export const uploadImage = (image, onUpload, success, faliure) => dispatch => {
  dispatch({ type: START_FILE_LOADER });

  const config = {
    onUploadProgress: progressEvent => {
      onUpload(Math.floor((progressEvent.loaded * 100) / progressEvent.total));
    }
  };

  http
    .post('/chats/message/image', image, config)
    .then(res => {
      dispatch({ type: STOP_FILE_LOADER });
      success(res.data.data.image);
    })
    .catch(err => {
      dispatch({ type: STOP_FILE_LOADER });
      faliure(err.response);
      toast.error('Something failed while uploading');
    });
};

export const uploadFile = (video, onUpload, success, faliure) => dispatch => {
  dispatch({ type: START_FILE_LOADER });

  const config = {
    onUploadProgress: progressEvent => {
      onUpload(Math.floor((progressEvent.loaded * 100) / progressEvent.total));
    }
  };

  http
    .post('/chats/message/uploads', video, config)
    .then(res => {
      dispatch({ type: STOP_FILE_LOADER });
      success(res.data.data);
    })
    .catch(err => {
      if (err.response) {
        if (err.response.status === 400 || err.response.status === 404) {
          toast.error('File is too large for upload.');
        }
      }
      dispatch({ type: STOP_FILE_LOADER });
      faliure(err.response);
    });
};

export const readMessage = (message_id, user_id) => dispatch => {
  const data = {
    user_id: user_id
  };

  http
    .post(`/chats/message/read/${message_id}`, data)
    .then(() => {
      console.log('succeed');
    })
    .catch(err => {
      if (err.response && err.response.data) {
        toast(err.response.data.errors.error)
      }
    });
};

export const changeReadMessageStatus = data => {
  console.log('read message is read')
  return {
    type: READ_MESSAGE,
    payload: data
  };
}

export const updateConversationUnreadCount = data => {
  return {
    type: UPDATE_CONVERSATION_UNREAD_COUNT,
    payload: data
  }
};

export const resetConversationCount = conversation => {
  return {
    type: RESET_CONVERSATION_COUNT,
    payload: conversation
  }
}

export const createGroupConversation = (data, history) => dispatch => {
  http
    .post(`/chats/group-chat`, data)
    .then(res => {
      window.location.href = `/dashboard/chat/${res.data.data.conversation.id}`;
    })
    .catch(err => {
      if (err.response && err.response.data) {
        toast(err.response.data.errors.error)
      }
    });
}


export const readAll = data => ({ type: READ_ALL, payload: data });
