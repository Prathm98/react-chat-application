import { SET_MESSAGES, SET_TYPING } from "../actions/types";

const initialState = {  
  messages: [],
  channelId: null,
  loading: true,
  typing: []
};

export default function(state=initialState, action){
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state, 
        messages: action.payload.messages, 
        channelId: action.payload.channelId, 
        loading: false };
        
    case SET_TYPING:
      return {
        ...state,
        typing: action.payload,
        loading: false
      };

    default:
      return state;
  }
}