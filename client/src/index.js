// this file renders very root component to the DOM

// this file controls the data layer (redux)

import 'materialize-css/dist/css/materialize.min.css'; //use CSS from materialize-css module
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // component that makes store accessible to every component in App
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// to test server logic in the window with OAuth flow without postman
import axios from 'axios';
window.axios = axios;

// store represents global level state- 1st arg: all reducers in app, 2nd arg: initial state of app
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//ReactDOM takes 2 arguments: 1) root component, 2)where to render component inside DOM
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
