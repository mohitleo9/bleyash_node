import React from 'react';
import {Image} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {NavLink, Link} from 'react-router-dom';
import store from '../store';
import {getPlaces} from '../actions/places';
import PriceRating from './PriceRating';
import {URLS_TO_PLACE_TYPES} from '../constants';
import {getFormattedAddress} from '../utils';
import Slider from 'react-slick';
import {YES_NO_PLACE_ATTRS, YES_NO_PLACE_ATTRS_DISPLAY_LABELS} from '../../common/commonConstants';
import '../assets/css/PlacesPage.css';


const MainButtonBar = () =>
  <Row style={{paddingBottom: '100px'}}>
    <div className="btn-group btn-group-justified">
      <NavLink to="/t/bars/" activeClassName="active" className="btn btn-default">Bars</NavLink>
      <NavLink to="/t/resturants" className="btn btn-default">Resturants</NavLink>
      <NavLink to="/t/clubs" className="btn btn-default">Clubs</NavLink>
      <NavLink to="/t/pubs" className="btn btn-default">Pubs</NavLink>
      <NavLink to="/t/cafes" className="btn btn-default">Cafes</NavLink>
    </div>
  </Row>;

const HelloWorld = ({text}) =>
  <Row>
    <h1>{text || 'Places Page'}</h1>
  </Row>;

const PrevArrow = ({onClick}) =>
  <i onClick={onClick} className="fa fa-arrow-left arrow-prev" aria-hidden="true" />;

const NextArrow = ({onClick})=>
  <i onClick={onClick} className="fa fa-arrow-right arrow-next" aria-hidden="true"></i>;

const Place = ({name, address, slug, description, place, coverImage}) =>
  <Row style={{paddingBottom: 30}}>
    <Col xs={3}>
      <Link to={`/p/${slug}`}>
        <Image src={coverImage} rounded responsive />
      </Link>
    </Col>
    <Col xs={5}>
      <h3> {name} </h3>
      <span className="lead">{getFormattedAddress(address, true)}</span>
      <br/>
      <span>
        {YES_NO_PLACE_ATTRS.filter((attr) => place[attr])
            .map((attr)=> YES_NO_PLACE_ATTRS_DISPLAY_LABELS[attr])
            .join(', ')
        }
      </span>
      <div> <PriceRating initialRate={place.priceRating} dollarStyle={{fontSize: 10}} readonly/> </div>
    </Col>
    <Col xs={4}>
      {place.images.length ?
        <Slider prevArrow={<PrevArrow />} nextArrow={<NextArrow />} infinite slidesToShow={2} focusOnSelect lazyLoad speed={500}>
            {place.images.map((imageSrc) =>
              <Image key={imageSrc} src={imageSrc} rounded responsive />
            )}
          </Slider>
      : null}
    </Col>
  </Row>;

const Places = ({places}) =>
  <div>
    {places.map((place, i) =>
      <Place
        name={place.name} slug={place.slug} address={place.address}
        description={place.description} place={place} key={i}
        coverImage={place.images.length ? place.images[0] : "http://esq.h-cdn.co/assets/cm/15/06/54d3cdbba4f40_-_esq-01-bar-lgn.jpg"}
      />
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
    store.dispatch(getPlaces(this.getType(this.props.match.params.typeUrl)));
  }
  getType (typeUrl){
    return URLS_TO_PLACE_TYPES[typeUrl];
  }
  componentWillReceiveProps({match}){
    store.dispatch(getPlaces(this.getType(match.params.typeUrl)));
  }
  render() {
    return (
      <Grid fluid>
        <HelloWorld text={this.props.match.params.typeUrl}/>
        <MainButtonBar  />
        <PlacesContainer />
      </Grid>
    );
  }
};

export default PlacesPage;
