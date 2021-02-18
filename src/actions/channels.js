import { SET_CURRENT_CHANNEL, SET_CHANNELS, SET_PRIVATE_CHANNEL, SET_NOTIFY_CHANNEL, CLEAR_NOTIFY_CHANNEL, UPDATE_CHANNELS } from './types';

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

export const updateChannels = channel => dispatch => {
  dispatch({
    type: UPDATE_CHANNELS,
    payload: channel
  });
}

export const setNotificationChannel = channelId => dispatch => {
  dispatch({
    type: SET_NOTIFY_CHANNEL,
    payload: channelId
  });
}

export const clearNotificationForCurrent = channelId => dispatch => {
  dispatch({
    type: CLEAR_NOTIFY_CHANNEL,
    payload: channelId
  });
}
