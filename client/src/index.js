import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import App from './components/App';
import reducers from './reducers';
import './index.less';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
window.axios = axios;

const middlewares = process.env.NODE_ENV !== "production" ? [reduxThunk, logger] : [reduxThunk];
const store = createStore(reducers, {}, applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.querySelector('#root')
);