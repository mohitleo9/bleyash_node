import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import NavBar from './NavBar';
import HomePage from './HomePage';


const App = () => (
  <div>
    <Route path="/" component={NavBar}/>
    <Route exact={true} path="/" component={HomePage}/>
  </div>
);


export default App;
