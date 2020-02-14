import axios from 'axios';

import * as actionTypes from './actionTypes';

export const getQuestions = () => async dispatch => {
  try {
    const res = await axios.get('/api/questions');
    dispatch({
      type: actionTypes.GET_QUESTIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: actionTypes.QUESTION_ERROR,
      payload: err.response
    });
  }
};
