import axios from 'axios';

import * as actionTypes from './actionTypes';
import { setAlert } from './alert';

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

export const addQuestion = text => async dispatch => {
  try {
    console.log(text);
    const res = await axios.post(`/api/questions`, { text });
    dispatch({
      type: actionTypes.ADD_QUESTION,
      payload: res.data
    });
  } catch (err) {
    err.response.data.errors.forEach(el =>
      dispatch(setAlert(el.msg, 'danger'))
    );
    dispatch({
      type: actionTypes.QUESTION_ERROR,
      payload: err.response
    });
  }
};

export const deleteQuestion = id => async dispatch => {
  try {
    await axios.delete(`/api/questions/${id}`);
    dispatch({
      type: actionTypes.DELETE_QUESTION,
      payload: id
    });
  } catch (err) {
    err.response.data.errors.forEach(el =>
      dispatch(setAlert(el.msg, 'danger'))
    );
    dispatch({
      type: actionTypes.QUESTION_ERROR,
      payload: err.response
    });
  }
};

export const addAnswer = (id, text) => async dispatch => {
  try {
    const res = await axios.post(`/api/questions/${id}/answer`, { text });

    dispatch({
      type: actionTypes.ADD_ANSWER,
      payload: res.data
    });
  } catch (err) {
    err.response.data.errors.forEach(el =>
      dispatch(setAlert(el.msg, 'danger'))
    );
    dispatch({
      type: actionTypes.QUESTION_ERROR,
      payload: err.response
    });
  }
};

export const deleteAnswer = (quest_id, ans_id) => async dispatch => {
  try {
    await axios.delete(`/api/questions/${quest_id}/answer/${ans_id}`);
    dispatch({
      type: actionTypes.DELETE_ANSWER,
      payload: ans_id
    });
  } catch (err) {
    err.response.data.errors.forEach(el =>
      dispatch(setAlert(el.msg, 'danger'))
    );
    dispatch({
      type: actionTypes.QUESTION_ERROR,
      payload: err.response
    });
  }
};

export const upvoteAnswer = (questId, ansId) => async dispatch => {
  try {
    const res = await axios.put(
      `/api/questions/${questId}/answer/${ansId}/upvote`
    );
    dispatch({
      type: actionTypes.UPDATE_UPVOTES,
      payload: { id: ansId, upvotes: res.data }
    });
  } catch (err) {
    err.response.data.errors.forEach(el =>
      dispatch(setAlert(el.msg, 'danger'))
    );
    dispatch({
      type: actionTypes.QUESTION_ERROR,
      payload: err.response
    });
  }
};

export const downvoteAnswer = (questId, ansId) => async dispatch => {
  try {
    const res = await axios.put(
      `/api/questions/${questId}/answer/${ansId}/downvote`
    );
    dispatch({
      type: actionTypes.UPDATE_UPVOTES,
      payload: { id: ansId, upvotes: res.data }
    });
  } catch (err) {
    err.response.data.errors.forEach(el =>
      dispatch(setAlert(el.msg, 'danger'))
    );
    dispatch({
      type: actionTypes.QUESTION_ERROR,
      payload: err.response
    });
  }
};

export const favouriteAnswer = (questId, ansId) => async dispatch => {
  try {
    const res = await axios.put(
      `/api/questions/${questId}/answer/${ansId}/favourite`
    );
    dispatch({
      type: actionTypes.UPDATE_FAVOURITE,
      payload: { id: ansId, isFavourite: res.data }
    });
  } catch (err) {
    err.response.data.errors.forEach(el =>
      dispatch(setAlert(el.msg, 'danger'))
    );
    dispatch({
      type: actionTypes.QUESTION_ERROR,
      payload: err.response
    });
  }
};

export const unfavouriteAnswer = (questId, ansId) => async dispatch => {
  try {
    const res = await axios.put(
      `/api/questions/${questId}/answer/${ansId}/unfavourite`
    );
    dispatch({
      type: actionTypes.UPDATE_FAVOURITE,
      payload: { id: ansId, isFavourite: res.data }
    });
  } catch (err) {
    err.response.data.errors.forEach(el =>
      dispatch(setAlert(el.msg, 'danger'))
    );
    dispatch({
      type: actionTypes.QUESTION_ERROR,
      payload: err.response
    });
  }
};
