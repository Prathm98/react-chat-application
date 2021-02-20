import { SET_MESSAGES, SET_TYPING } from './types';

export const setMessages = (messages, channelId) => dispatch => {
  messages.sort((a, b) => b.timestamp - a.timestamp);
  dispatch({
    type: SET_MESSAGES,
    payload: {messages, channelId}
  });
}

export const setTyping = (arr) => dispatch => {
  dispatch({
    type: SET_TYPING,
    payload: arr
  });
}