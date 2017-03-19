import React from 'react';
import {NavLink} from 'react-router-dom';


const MainButtonBar = () =>
  <div className="row">
    <div className="btn-group btn-group-justified">
      <NavLink to="/t/bars/" activeClassName="active" className="btn btn-default">Bars</NavLink>
      <NavLink to="/t/resturants" className="btn btn-default">Resturants</NavLink>
      <NavLink to="/t/clubs" className="btn btn-default">Clubs</NavLink>
    </div>
  </div>;

const HomeButton = ({text}) => (
  <a className="btn btn-default" type="submit">{text}</a>
);

const HelloWorld = ({text}) =>
  <div className="row">
    <h1>{text || 'Places Page'}</h1>
  </div>;

const PlacesPage = ({match}) =>{
  return (
  <div className='container'>
    <HelloWorld text={match.params.type}/>
    <MainButtonBar />
  </div>
  );
  }

export default PlacesPage;
