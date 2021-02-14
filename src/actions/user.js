import { SET_USER, CLEAR_USER } from "./types";

export const setUser = user => dispatch => {
  dispatch({
    type: SET_USER,
    payload: {currentUser: user}
  });
}

export const clearUser = () => dispatch => {
  console.log('clear');
  dispatch({
    type: CLEAR_USER
  });
}