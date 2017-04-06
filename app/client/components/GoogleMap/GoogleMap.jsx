import React from 'react';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ src }) =>
  <div>
    <img style={{height: '25px', width: '25px'}} src={src} />
  </div>;

class GoogleMap extends React.Component{
  render(){
    console.log('My props');
    console.log(this.props);
    // if (!(this.props.lat && this.props.lng)){
    //   return null;
    // }
    return (
      <GoogleMapReact
        center={this.props.center}
        zoom={this.props.zoom}
      >
        <AnyReactComponent src="http://simpleicon.com/wp-content/uploads/beer-64x64.png"
          lat={this.props.lat}
          lng={this.props.lng}
          text={this.props.text}
        />
      </GoogleMapReact>
    );
  }
};

GoogleMap.defaultProps = {
  center: {lat: 44.795, lng: 20.469},
  zoom: 11,
  lat: 44.795,
  lng: 20.469,
  text: 'asdf',
};

export default GoogleMap;
