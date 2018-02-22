import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

// whatever keys are passed into combineReducers as object represent the keys existing in state object
export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer
});
