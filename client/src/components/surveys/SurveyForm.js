// SurveyForm shows form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/Surveys" className="btn red lighten-1 white-text">
            Cancel
            <i className="material-icons right">clear</i>
          </Link>
          <button
            className="btn waves-effect waves-light right teal white-text"
            type="submit"
            name="action"
          >
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

// takes a single argument: values - object containing all values from form: name and value of each field
function validate(values) {
  const errors = {}; // if redux form gets empty error object then all is well
  // if errors object has properties, redux form assumes there is an error and halts submission process
  // for each property not on values, create one on errors

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name, noValueError }) => {
    // square bracket means that we're going to figure out which property to look at on the fly
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

// reduxForm helper requires one option to be passed into form component: form
export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false // allows survey info to persist during creation
})(SurveyForm);
