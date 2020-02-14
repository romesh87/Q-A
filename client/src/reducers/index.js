import { combineReducers } from 'redux';

import question from './question';
import auth from './auth';

const rootReducer = combineReducers({ question, auth });

export default rootReducer;
