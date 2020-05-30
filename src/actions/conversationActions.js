import http from "../services/httpService"
import { GET_CONVERSATION, UPDATE_CONVERSATION, CLEAR_CONVERSATION } from "../constants/actionTypes";

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

  http
    .post('/chats/message', { message: data.message, conversation_id: data.room })
    .then()
};

export const clearConversation = () => dispatch => {
  dispatch({ type: CLEAR_CONVERSATION, payload: null });
}