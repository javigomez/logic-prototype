import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BlockList from './BlockList';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { formReducer } from './store/formStore'

const store = createStore(formReducer, applyMiddleware(logger))

ReactDOM.render(
  <Provider store={store}>
    <BlockList />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
