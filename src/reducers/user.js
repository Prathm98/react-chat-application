import { SET_USER, CLEAR_USER, SET_COLORS } from "../actions/types";

const initialState = {
  currentUser: null,
  loading: true,
  colors: {Sidebar: '#ffffff', Links: '#000000', Background: '#f3f3f3'}
};

export default function(state=initialState, action){
  switch (action.type) {
    case SET_USER:
      return {...state, currentUser: action.payload.currentUser, loading: false};
    case SET_COLORS:
      return {...state, colors: action.payload, loading: false};
    case CLEAR_USER:
      return {...state, currentUser: null, loading: false};
    default:
      return state;
  }
}