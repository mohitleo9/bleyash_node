import React from 'react';
import {SearchContainer} from './Search';
import {Link} from 'react-router-dom';

const MainButtonBar = () =>
  <div className="row">
    <div className="btn-group btn-group-justified">
      <Link to="/t/bars/" className="btn btn-default">Bars</Link>
      <Link to="/t/resturants" className="btn btn-default">Resturants</Link>
      <Link to="/t/clubs" className="btn btn-default">Clubs</Link>
    </div>
  </div>;

const HelloWorld = () =>
  <div className="row">
    <h1>Hello, World!</h1>
  </div>;

const HomePage = () =>
  <div className='container'>
    <SearchContainer />
    <HelloWorld />
    <MainButtonBar />
  </div>;

export default HomePage;
