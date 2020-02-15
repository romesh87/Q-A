import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALERT:
      return state.concat(action.payload);

    case actionTypes.REMOVE_ALERT:
      return state.filter(el => el.id !== action.payload);
    default:
      return state;
  }
};

export default reducer;
