import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false
      };

    case actionTypes.SIGNUP_FAIL:
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };

    case actionTypes.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: true,
        error: null
      };

    default:
      return state;
  }
};

export default reducer;
