import React from 'react';
import { connect } from 'react-redux';
import {NavLink, Link} from 'react-router-dom';
import store from '../store';
import {getPlaces} from '../actions/places';


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

const Place = ({name, address, slug, description}) =>
  <div style={{paddingBottom: '30px'}} className="row">
    <Link to={`/p/${slug}`}>
      <img src="http://esq.h-cdn.co/assets/cm/15/06/54d3cdbba4f40_-_esq-01-bar-lgn.jpg" className="img-rounded col-md-4" width="304" height="236" />
    </Link>
    <div>
      <h3> {name} </h3>
      <div><h2>{description}</h2></div>
      <div>{address}</div>
    </div>
  </div>;

const Places = ({places}) =>
  <div className="container">
    {places.map((place, i) =>
      <Place name={place.name} slug={place.slug} address={place.address} description={place.description} key={i} />
    )}
  </div>;

const mapStateToPropsForPlaces = (state) => {
  return {
    places: state.places.list
  };
};

const PlacesContainer = connect(mapStateToPropsForPlaces)(Places);

class PlacesPage extends React.Component{
  componentWillMount(){
    store.dispatch(getPlaces());
  }
  render() {
    return (
      <div className='container'>
        <HelloWorld text={this.props.match.params.type}/>
        <MainButtonBar  />
        <PlacesContainer />
      </div>
    );
  }
};

export default PlacesPage;
