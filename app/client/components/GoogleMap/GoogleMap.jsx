import React from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import '../../css/GoogleMap.css';


const Marker = () =>
  <div className='marker-icon'>;
  </div>;


const GoogleMap = ({center, zoom, lat, lng})=>{
  return (
    <GoogleMapReact center={center} zoom={zoom}>
      <Marker lat={lat} lng={lng} />
    </GoogleMapReact>
  );
};

const mapStateToProps = ({googleMap}) =>{
  return {
    center: googleMap.center,
    zoom: googleMap.zoom,
    lat: googleMap.lat,
    lng: googleMap.lng
  };
};

export default connect(mapStateToProps)(GoogleMap);
