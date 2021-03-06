import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { HashRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import store from './store';
import axiosRegister from './utils/axiosConfig';
import './assets/vendor/bootstrap/css/bootstrap.css';
import './assets/vendor/bootstrap/themes/bootstrap-paper-theme.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// register global config;
// this is so that the html file can be reloaded on change
// require('./index.ejs');

// Create app
const container = document.querySelector('#app-container');

axiosRegister(store);

const render = ()=>{
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </AppContainer> ,
    container
  );
};

render();

if (module.hot) {
  module.hot.accept('./components/App', () => { render(); });
};
