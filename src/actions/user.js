import { SET_USER, CLEAR_USER, SET_COLORS } from "./types";

export const setUser = user => dispatch => {
  dispatch({
    type: SET_USER,
    payload: {currentUser: user}
  });
}

export const setColor = colors => dispatch => {
  dispatch({
    type: SET_COLORS,
    payload: colors
  });
}

export const clearUser = () => dispatch => {
  dispatch({
    type: CLEAR_USER
  });
}