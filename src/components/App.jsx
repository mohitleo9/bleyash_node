import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const NavBar = () => (
  <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="#">BLEYASH</a>
      </div>
      <div className="collapse navbar-collapse navbar-right" id="bs-example-navbar-collapse-1">
        <button type="button" className="btn btn-default navbar-btn">Sign in</button>
        <ul className="nav navbar-nav">
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

const Search = () => (
  <div className="col-lg-8 col-md-7 col-sm-6">
    <input type="text" className="col-md-4 form-control" placeholder="Search"></input>
  </div>
);

const HomeButton = ({text}) => (
  <button className="btn btn-default" type="submit">{text}</button>
);

const App = () => (
  <div>
    <NavBar />
    <div className='container'>
      <div className="row" style={{'paddingBottom': '100px', 'paddingTop': '100px'}}>
        <Search />
      </div>
      <div className="row">
        <h1>Hello, World!</h1>
      </div>
      <div className="row">
        <div className="btn-group">
          <HomeButton text="Bar" />
          <HomeButton text="Resturant" />
          <HomeButton text="Clubs" />
        </div>
      </div>
    </div>
  </div>
);


export default App;
