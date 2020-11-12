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
  RESET_CONVERSATION_COUNT,
  INVITE_PEOPLE_IN_CHAT,
  START_CONVERSATION_LOADER,
  STOP_CONVERSATION_LOADER,
  START_MESSAGE_LOADER,
  STOP_MESSAGE_LOADER,
  DELETE_MESSAGE,
  DELETE_CONVERSATION,
} from '../constants/actionTypes';
import { isNumber } from '../utils/helperFunctions';

export const getAllConversations = (page = 1) => dispatch => {
  if (page > 1) {
    dispatch({ type: START_CONVERSATION_LOADER });
  }
  http
    .get(`/chats?page=${page}`)
    .then(res => {
      dispatch({ type: STOP_CONVERSATION_LOADER });
      dispatch({
        type: GET_ALL_CONVERSATIONS,
        payload: res.data.data.conversations
      });
    })
    .catch(() => {
      dispatch({ type: STOP_CONVERSATION_LOADER })
    })
};

export const getConversation = (idOrSlug, page = 1, callback) => dispatch => {
  if (page > 1) {
    dispatch({ type: START_MESSAGE_LOADER });
  }

  const url = isNumber(idOrSlug)
    ? `/chats/user/${idOrSlug}/id?page=${page}`
    : `/chats/user/${idOrSlug}?page=${page}`;

  http
    .get(url)
    .then(res => {
      dispatch({ type: STOP_MESSAGE_LOADER });
      dispatch({
        type: GET_CONVERSATION,
        payload: res.data.data
      });
      callback && callback()
    })
    .catch(() => {
      dispatch({ type: STOP_MESSAGE_LOADER })
    })
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
      // dispatch(getAllConversations())
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
    })
    .catch(err => {
      if (err.response && err.response.data) {
        toast(err.response.data.errors.error)
      }
    });
};

export const changeReadMessageStatus = data => {
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

export const createGroupConversation = (data, id) => dispatch => {
  http
    .post(`/chats/invite-people/${id}`, data)
    .then(res => {
      dispatch({
        type: INVITE_PEOPLE_IN_CHAT,
        payload: res?.data?.data?.conversation
      })
    })
    .catch(err => {
      if (err.response && err.response.data) {
        toast(err.response.data.errors.error)
      }
    });
}

export const deleteMessage = (id, success) => dispatch => {
  http
    .delete(`/chats/message/${id}`)
    .then(() => {
      toast.success("Message deleted successfully")
      dispatch({
        type: DELETE_MESSAGE,
        payload: id
      });
      success && success();
    })
    .catch(err => {
      if (err.response && err.response.data) {
        toast(err.response.data.errors.error)
      }
    });
};

export const deleteMessageState = id => dispatch => {
  dispatch({
    type: DELETE_MESSAGE,
    payload: id
  });
};

export const deleteConversation = id => dispatch => {
  http
    .delete(`/chats/${id}`)
    .then(() => {
      toast.success("Conversation deleted successfully")
      dispatch({
        type: DELETE_CONVERSATION,
        payload: id
      })
    })
    .catch(err => {
      if (err.response && err.response.data) {
        toast(err.response.data.errors.error)
      }
    });
}

export const readAll = data => ({ type: READ_ALL, payload: data });
