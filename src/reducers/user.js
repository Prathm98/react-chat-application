import { SET_USER, CLEAR_USER } from "../actions/types";

const initialState = {
  currentUser: null,
  loading: true
};

export default function(state=initialState, action){
  switch (action.type) {
    case SET_USER:
      return {...state, currentUser: action.payload.currentUser, loading: false};
    case CLEAR_USER:
      return {...state, currentUser: null, loading: false};
    default:
      return state;
  }
}