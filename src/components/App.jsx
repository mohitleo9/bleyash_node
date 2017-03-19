import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import NavBar from './NavBar';
import HomePage from './HomePage';
import PlacesPage from './PlacesPage';


const App = () => (
  <div>
    <Route path="/" component={NavBar}/>
    <Route exact={true} path="/" component={HomePage}/>
    <Route path="/t/" component={PlacesPage}/>
  </div>
);


export default App;
