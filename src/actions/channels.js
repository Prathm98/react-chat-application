import { SET_CURRENT_CHANNEL, SET_CHANNELS, SET_PRIVATE_CHANNEL } from './types';

export const setCurrentChannel = channel => dispatch => {
  dispatch({
    type: SET_CURRENT_CHANNEL,
    payload: channel
  });
}

export const setPrivateChannel = channel => dispatch => {
  dispatch({
    type: SET_PRIVATE_CHANNEL,
    payload: channel
  });
}

export const setChannels = channels => dispatch => {
  dispatch({
    type: SET_CHANNELS,
    payload: channels
  });
}