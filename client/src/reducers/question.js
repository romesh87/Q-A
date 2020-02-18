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
    case actionTypes.UPDATE_UPVOTES:
      return {
        ...state,
        question: {
          ...state.question,
          answers: state.question.answers.map(answer =>
            answer._id === action.payload.id
              ? { ...answer, upvotes: action.payload.upvotes }
              : answer
          )
        }
      };
    case actionTypes.UPDATE_FAVOURITE:
      return {
        ...state,
        question: {
          ...state.question,
          answers: state.question.answers.map(answer =>
            answer._id === action.payload.id
              ? { ...answer, isFavourite: action.payload.isFavourite }
              : answer
          )
        }
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
