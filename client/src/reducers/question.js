import * as actionTypes from '../actions/actionTypes';

const initialState = {
  questions: [],
  questionsCount: null,
  searchText: null,
  question: null,
  loading: true,
  editing: null,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_QUESTIONS:
      return {
        ...state,
        questionsCount: action.payload.count,
        searchText: action.payload.searchText,
        questions: action.payload.results,
        loading: false
      };

    case actionTypes.GET_QUESTION:
      return {
        ...state,
        question: action.payload,
        loading: false
      };

    case actionTypes.ADD_QUESTION:
      return {
        ...state,
        questions: [action.payload, ...state.questions]
      };

    case actionTypes.DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(quest => quest._id !== action.payload)
      };

    case actionTypes.SET_EDITING:
      return {
        ...state,
        editing: action.payload
      };

    case actionTypes.CLEAR_EDITING:
      return {
        ...state,
        editing: null
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

    case actionTypes.ADD_ANSWER:
      return {
        ...state,
        question: {
          ...state.question,
          answers: [action.payload, ...state.question.answers]
        }
      };

    case actionTypes.UPDATE_ANSWER:
      return {
        ...state,
        question: {
          ...state.question,
          answers: state.question.answers.map(ans =>
            ans._id === action.payload.id
              ? { ...ans, text: action.payload.text }
              : ans
          )
        }
      };

    case actionTypes.DELETE_ANSWER:
      return {
        ...state,
        question: {
          ...state.question,
          answers: state.question.answers.filter(
            ans => ans._id !== action.payload
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
