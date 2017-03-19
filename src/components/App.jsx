import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import NavBar from './Navbar';
import HomePage from './HomePage';


const App = () => (
  <div>
    <NavBar />
    <HomePage />
  </div>
);


export default App;
