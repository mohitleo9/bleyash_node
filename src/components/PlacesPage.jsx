import React from 'react';
import {SearchContainer} from './Search';


const MainButtonBar = () =>
  <div className="row">
    <div className="btn-group btn-group-justified">
      <HomeButton text="Bars" />
      <HomeButton text="Resturants" />
      <HomeButton text="Clubs" />
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
    <SearchContainer />
    <HelloWorld text={match.params.type}/>
    <MainButtonBar />
  </div>
  );
  }

export default PlacesPage;
