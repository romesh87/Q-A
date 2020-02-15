import { combineReducers } from 'redux';

import question from './question';
import auth from './auth';
import alert from './alert';

const rootReducer = combineReducers({ question, auth, alert });

export default rootReducer;
