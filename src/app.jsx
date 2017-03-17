import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// this is so that the html file can be reloaded on change
require('./index.html');

console.log("msg");

// Create app
const container = document.querySelector('#app-container');

//Render
ReactDOM.render(
  <App />,
  container
);
