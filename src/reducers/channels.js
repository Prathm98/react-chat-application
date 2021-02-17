import { SET_CURRENT_CHANNEL, SET_CHANNELS, SET_PRIVATE_CHANNEL } from "../actions/types";

const initialState = {
  currentChannel: null,
  channels: [],
  loading: true
};

export default function(state=initialState, action){
  switch (action.type) {
    case SET_CURRENT_CHANNEL:
      return {...state, currentChannel: {...action.payload, isPrivateChannel: false}, loading: false};
    case SET_PRIVATE_CHANNEL:
      return {...state, currentChannel: action.payload, loading: false};
    case SET_CHANNELS:
      return {...state, channels: action.payload, loading: false};
    default:
      return state;
  }
}