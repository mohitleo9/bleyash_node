import React from 'react';
import {NavLink} from 'react-router-dom';


const MainButtonBar = () =>
  <div style={{paddingBottom: '100px'}} className="row">
    <div className="btn-group btn-group-justified">
      <NavLink to="/t/bars/" activeClassName="active" className="btn btn-default">Bars</NavLink>
      <NavLink to="/t/resturants" className="btn btn-default">Resturants</NavLink>
      <NavLink to="/t/clubs" className="btn btn-default">Clubs</NavLink>
    </div>
  </div>;

const HelloWorld = ({text}) =>
  <div className="row">
    <h1>{text || 'Places Page'}</h1>
  </div>;

const Place = ({name}) =>
  <div style={{paddingBottom: '30px'}} className="row">
    <img src="http://esq.h-cdn.co/assets/cm/15/06/54d3cdbba4f40_-_esq-01-bar-lgn.jpg" className="img-rounded col-md-4" width="304" height="236" />
    <div>
      <h3> {name} </h3>
      <div><h2>asdfasdf</h2></div>
      <div>mangostreet Serbia</div>
    </div>
  </div>;

const Places = () =>
  <div className="container">
    <Place name="bar1" />
    <Place name="bar2" />
    <Place name="bar3" />
  </div>;

const PlacesPage = ({match}) =>{
  return (
  <div className='container'>
    <HelloWorld text={match.params.type}/>
    <MainButtonBar  />
    <Places />
  </div>
  );
  }

export default PlacesPage;
