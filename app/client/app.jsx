import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { HashRouter as Router} from 'react-router-dom';

// this is so that the html file can be reloaded on change
// require('./index.ejs');

// Create app
const container = document.querySelector('#app-container');

//Render
// maybe move Router in App??
ReactDOM.render(
  <Router>
    <App />
  </Router> ,
  container
);
