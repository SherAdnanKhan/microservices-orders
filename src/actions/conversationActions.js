import http from "../services/httpService"
import { GET_CONVERSATION } from "../constants/actionTypes";

export const getConversation = slug => dispatch => {
  http
    .get(`/chats/user/${slug}`)
    .then(res => {
      dispatch({
        type: GET_CONVERSATION,
        payload: res.data.data.conversation
      });
    });
}