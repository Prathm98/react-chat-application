import { SET_CURRENT_CHANNEL, SET_CHANNELS, SET_PRIVATE_CHANNEL,
  SET_NOTIFY_CHANNEL, CLEAR_NOTIFY_CHANNEL } from "../actions/types";

const initialState = {
  currentChannel: null,
  channels: [],
  notifyChannels: [],
  loading: true
};

export default function(state=initialState, action){
  switch (action.type) {
    case SET_CURRENT_CHANNEL:
      return {...state, currentChannel: {...action.payload, isPrivateChannel: false}, loading: false};
    case SET_PRIVATE_CHANNEL:
      return {...state, currentChannel: action.payload, loading: false};
    case SET_NOTIFY_CHANNEL:
      if(state.notifyChannels.includes(action.payload)){
        return state;
      }
      if(state.currentChannel && state.currentChannel.id == action.payload){
        return state;
      }
      return {...state, notifyChannels: [...state.notifyChannels, action.payload], loading: false};
    case CLEAR_NOTIFY_CHANNEL:
      if(!state.notifyChannels.includes(action.payload)){
        return state;
      }
      return {...state, notifyChannels: state.notifyChannels.filter(channel => channel != action.payload), 
        loading: false};
    case SET_CHANNELS:
      return {...state, channels: action.payload, loading: false};
    default:
      return state;
  }
}