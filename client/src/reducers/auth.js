import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true
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

    case actionTypes.LOAD_USER:
      return {
        ...state,
        token: localStorage.getItem('token'),
        isAuthenticated: true,
        user: action.payload,
        loading: false
      };

    case actionTypes.SIGNUP_FAIL:
    case actionTypes.LOGIN_FAIL:
    case actionTypes.AUTH_FAIL:
    case actionTypes.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false
      };

    default:
      return state;
  }
};

export default reducer;
