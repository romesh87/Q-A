import uuid from 'uuid';

import * as actionTypes from './actionTypes';

export const setAlert = (text, type = null, timeOut = 5000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: actionTypes.SET_ALERT,
    payload: {
      id,
      text,
      type
    }
  });

  setTimeout(() => {
    dispatch({
      type: actionTypes.REMOVE_ALERT,
      payload: id
    });
  }, timeOut);
};
