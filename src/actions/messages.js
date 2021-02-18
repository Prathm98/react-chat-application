import { SET_MESSAGES } from './types';

export const setMessages = (messages, channelId) => dispatch => {
  messages.sort((a, b) => b.timestamp - a.timestamp);
  dispatch({
    type: SET_MESSAGES,
    payload: {messages, channelId}
  });
}