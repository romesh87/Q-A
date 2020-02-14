import axios from 'axios';

import * as actionTypes from './actionTypes';
import { setAuthHeader } from '../utils/setAuthHeader';

export const signUp = (name, email, password) => async dispatch => {
  try {
    const res = await axios.post('api/users/signup', { name, email, password });
    dispatch({
      type: actionTypes.SIGNUP_SUCCESS,
      payload: res.data.token
    });
    loadUser();
  } catch (err) {
    dispatch({
      type: actionTypes.SIGNUP_FAIL,
      payload: err.response
    });
  }
};

export const logIn = (email, password) => async dispatch => {
  try {
    const res = await axios.post('api/users/login', { email, password });

    loadUser();
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: res.data.token
    });
  } catch (err) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      payload: err.response
    });
  }
};

export const logOut = () => async dispatch => {
  dispatch({
    type: actionTypes.LOGOUT
  });
};

export const loadUser = () => async dispatch => {
  try {
    setAuthHeader(localStorage.getItem('token'));

    const res = await axios.get('/api/users');
    dispatch({
      type: actionTypes.LOAD_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: actionTypes.AUTH_FAIL,
      payload: err.response
    });
  }
};
