import React from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import {updateState} from '../../actions/googleMap';
import '../../css/GoogleMap.css';


const Marker = () =>
  <div className="place">;
  </div>;


class GoogleMap extends React.Component{
  render(){
    const MAP_OPTIONS = {
      scrollwheel: false,
    };
    const {center, zoom, lat, lng, draggable} = this.props;
    return (
      <GoogleMapReact center={center} zoom={zoom} options={MAP_OPTIONS}
        draggable={draggable}
        onChange={this.props.onChange}
        onChildMouseUp={this.props.onChildMouseUp}
        onChildMouseDown={this.props.onChildMouseDown}
        onChildMouseMove={this.props.onChildMouseMove}
      >
        <Marker lat={lat} lng={lng}
        />
      </GoogleMapReact>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: ({center, zoom}) => {
      dispatch(updateState({center, zoom}));
    },
    onChildMouseUp: (hoverKey, childProps, mouse) =>{
      dispatch(updateState({
        draggable: true,
      }));
    },
    onChildMouseDown: (hoverKey, childProps, mouse) =>{
      dispatch(updateState({
        draggable: false,
        lat: mouse.lat,
        lng: mouse.lng
      }));
    },
    onChildMouseMove: (hoverKey, childProps, mouse) =>{
      dispatch(updateState({
        draggable: false,
        lat: mouse.lat,
        lng: mouse.lng
      }));
    },
  };
};

const mapStateToProps = ({googleMap}) =>{
  return {
    center: googleMap.center,
    zoom: googleMap.zoom,
    lat: googleMap.lat,
    lng: googleMap.lng,
    draggable: googleMap.draggable,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);
