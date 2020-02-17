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

export const getQuestion = id => async dispatch => {
  try {
    const res = await axios.get(`/api/questions/${id}`);
    dispatch({
      type: actionTypes.GET_QUESTION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: actionTypes.QUESTION_ERROR,
      payload: err.response
    });
  }
};
