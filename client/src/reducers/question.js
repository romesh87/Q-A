import * as actionTypes from '../actions/actionTypes';

const initialState = {
  questions: [],
  question: null,
  loading: true,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        loading: false
      };
    case actionTypes.GET_QUESTION:
      return {
        ...state,
        question: action.payload,
        loading: false
      };
    case actionTypes.QUESTION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
