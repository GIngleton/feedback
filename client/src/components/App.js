// If a file is exporting a class or react component, file name is labeled with a capital letter

// this is the root component

// this file controls the rendering layer (react-router)

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux'; // react-redux allows react and redux to work nicely together.
// connect gives certain components the ability to call action creators
import * as actions from '../actions'; // imports all of the action creators from /actions/index.js as object

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
  // componentDidMount is the preferred location to make any type of AJAX request

  componentDidMount() {
    this.props.fetchUser();
  }
  // BrowserRouter expects to have only ONE child
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
// first argument of connect is reserved for mapStateToProps: when unused pass null
// second argument is all action creators to be connected
// now actions can be called inside component as this.props
