import React from 'react';

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

export default NavBar;
