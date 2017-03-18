import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';

// this is so that the html file can be reloaded on change
require('./index.html');

// Create app
const container = document.querySelector('#app-container');

//Render
ReactDOM.render(
  <Router>
    <App />
  </Router> ,
  container
);
