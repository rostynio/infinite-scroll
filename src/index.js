import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes';
import { Provider } from 'react-redux';
import store from './store/store';
import './assets/styles/index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
