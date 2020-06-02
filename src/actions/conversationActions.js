import http from "../services/httpService"
import {
  GET_CONVERSATION,
  UPDATE_CONVERSATION,
  CLEAR_CONVERSATION,
  GET_ALL_CONVERSATIONS,
  START_IMAGE_LOADER,
  STOP_IMAGE_LOADER
} from "../constants/actionTypes";

export const getAllConversations = () => dispatch => {
  http
    .get('/chats')
    .then(res => {
      console.log(res.data.data.conversations);
      dispatch({
        type: GET_ALL_CONVERSATIONS,
        payload: res.data.data.conversations
      });
    });
};

export const getConversation = slug => dispatch => {
  http
    .get(`/chats/user/${slug}`)
    .then(res => {
      dispatch({
        type: GET_CONVERSATION,
        payload: res.data.data
      });
    });
};

export const updateConversation = data => dispatch => {
  dispatch({
    type: UPDATE_CONVERSATION,
    payload: data
  });
};

export const createMessage = data => () => {
  http
    .post('/chats/message', { message: data.message, conversation_id: data.room, user_id: data.user.id })
    .then();
};

export const clearConversation = () => dispatch => {
  dispatch({ type: CLEAR_CONVERSATION, payload: null });
};

export const uploadImage = (image, success, faliure) => dispatch => {
  dispatch({ type: START_IMAGE_LOADER });

  http
    .post('/chats/message/image', image, {})
    .then(res => {
      dispatch({ type: STOP_IMAGE_LOADER });
      success(res.data.data.image);
    })
    .catch(err => {
      dispatch({ type: STOP_IMAGE_LOADER });
      faliure(err.response)
    });
};