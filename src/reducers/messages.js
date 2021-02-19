import { SET_MESSAGES } from "../actions/types";

const initialState = {  
  messages: [],
  channelId: null,
  loading: true
};

export default function(state=initialState, action){
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state, 
        messages: action.payload.messages, 
        channelId: action.payload.channelId, 
        loading: false };
        
    default:
      return state;
  }
}