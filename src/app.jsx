import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// XXX: check what this is about?
require('./index.html');

console.log("msg");

// Create app
const container = document.querySelector('#app-container');

//Render
ReactDOM.render(
  <App />,
  container
);
