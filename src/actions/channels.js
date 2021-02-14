import { SET_CURRENT_CHANNEL, SET_CHANNELS } from './types';

export const setCurrentChannel = channel => dispatch => {
  dispatch({
    type: SET_CURRENT_CHANNEL,
    payload: channel
  });
}

export const setChannels = channels => dispatch => {
  dispatch({
    type: SET_CHANNELS,
    payload: channels
  });
}