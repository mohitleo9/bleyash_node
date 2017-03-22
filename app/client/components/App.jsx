import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import HomePage from './HomePage';
import PlacesPage from './PlacesPage';
import NavBar from './NavBar';


const App = (props) =>{
  return (
  <div>
    <Route path="/" component={NavBar}/>
    <Route exact={true} path="/" component={HomePage}/>
    <Route path="/t/:type" component={PlacesPage}/>
  </div>
)};


export default App;
