import { AppContainer } from 'react-hot-loader'; // required
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // App
import './app.css';

const mountApp = document.getElementById('app');

ReactDOM.render(
  <AppContainer component={App} />,
    mountApp
);

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(
      <AppContainer component={require('./App').default} />, mountApp
    );
  });
  
}
