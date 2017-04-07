import React from 'react';
import store from '../store';
import {getPlace} from '../actions/place';
import { connect } from 'react-redux';
import {getFormattedAddress} from '../utils';
import Gallery from 'react-photo-gallery';

class PlacePage extends React.Component{
  componentWillMount(){
    store.dispatch(getPlace(this.props.match.params.slug));
  }
  render() {
    const {place, images} = this.props;
    if (!place){
      return null;
    }
    console.log('place is');
    console.log(place);
    return (
      <div className="container">
        <div className="row">
          <img src="http://esq.h-cdn.co/assets/cm/15/06/54d3cdbba4f40_-_esq-01-bar-lgn.jpg" className="img-rounded img-responsive center-block"/>
        </div>
        <div className="row">
          <h3> {place.name} </h3>
          <h2>{place.description}</h2>
          <h1>{getFormattedAddress(place.address)}</h1>
        </div>
        cmllllll
        <div className="row" style={{height: "50%", width: "50%"}}>
          <Gallery photos={images} />
        </div>
        <div className="row">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
          tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
          vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
          no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    place: state.place,
    images: state.place && state.place.images.map((image)=>({src: image, height: 100, width: 100})),
  };
};

export default connect(mapStateToProps)(PlacePage);
