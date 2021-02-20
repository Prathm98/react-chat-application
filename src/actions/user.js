import { SET_USER, CLEAR_USER, SET_COLORS, UPDATE_USER_AVATAR } from "./types";

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

export const updateUserAvatar = url => dispatch => {
  dispatch({
    type: UPDATE_USER_AVATAR,
    payload: url
  });
}

export const clearUser = () => dispatch => {
  dispatch({
    type: CLEAR_USER
  });
}