import { combineReducers } from 'redux';
import authReducer from './authReducer';

// whatever keys are passed into combineReducers as object represent the keys existing in state object
export default combineReducers({
  auth: authReducer
});
