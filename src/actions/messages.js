import { SET_MESSAGES } from './types';

export const setMessages = (messages, channelId) => dispatch => {
  dispatch({
    type: SET_MESSAGES,
    payload: {messages, channelId}
  });
}