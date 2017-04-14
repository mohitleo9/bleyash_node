import React from 'react';
import store from '../store';
import {getPlace} from '../actions/place';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {getFormattedAddress} from '../utils';
import {GoogleMap} from './GoogleMap';
import PriceRating from './PriceRating';
import {Image, Thumbnail} from 'react-bootstrap';
import Slider from './Slider';
import ga from '../actions/googleMap';
import {YES_NO_PLACE_ATTRS, YES_NO_PLACE_ATTRS_DISPLAY_LABELS} from '../../common/commonConstants';

class PlacePage extends React.Component{
  componentWillMount(){
    // looks like cheating  but whatever
    store.dispatch(getPlace(this.props.match.params.slug))
      .then(({address}) =>{
        store.dispatch(ga.updateLocationAndCenter({
          lat: address.lat,
          lng: address.lng,
        }));
      });
  }
  render() {
    const {place, images} = this.props;
    if (!place){
      return null;
    }
    return (
      <Grid fluid>
        <Row>
          {/* left half of the page */}
          <Col xsOffset={1} xs={5}>
            {/* place info like name etc */}
            <Row>
              <Col xs>
                <h3> {place.name} </h3>
                <span className="lead">{getFormattedAddress(place.address, true)}</span>
                <br />
                <span>{place.phone}</span>
                <br />
                <span><a href={place.website}>{place.website}</a></span>
              </Col>
            </Row>

            {/* google maps */}
            <Row>
              <Col xs>
                <div style={{height: '300px'}}>
                  <GoogleMap />
                </div>
              </Col>
            </Row>

            {/* type of place */}
            <Row>
              <Col xs>
                Type: {place.type.toUpperCase()}
              </Col>
            </Row>

            {/* price rating */}
            <Row>
              <Col xs>
                <PriceRating
                  initialRate={place.priceRating}
                  dollarStyle={{fontSize: 10}} readonly
                />
              </Col>
            </Row>

            {/* Working Hours */}
            <Row style={{paddingBottom: 30}}>
              <Col xs>
                <Row>
                  <Col xs>
                    Working Hours:
                  </Col>
                </Row>

                {place.workingHours.map(({day, openingHour, closingHour, closed}) =>
                  <Row key={day}>
                    <Col xs={12} md={3}>
                      {day}:
                    </Col>
                    <Col xs>
                      <Row>
                        <Col xs={4}>
                          {closed ? 'closed': openingHour} - {closed ? 'closed': closingHour}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>

            {/* YES NO ATTRS */}

            { YES_NO_PLACE_ATTRS.map((attrName) =>
              <Row key={attrName}>
                <Col xs>
                  <Row>
                    <Col xs={12} md={3} style={{display: 'flex', alignItems: 'center'}}>
                      {YES_NO_PLACE_ATTRS_DISPLAY_LABELS[attrName]}
                    </Col>
                    <Col xs>
                      {place[attrName] ? 'YES': 'No'}
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}

            {/* interior design */}
            <Row style={{paddingBottom: 20}}>
              <Col xs>
                <Row>
                  <Col xs={12} md={3} style={{display: 'flex', alignItems: 'center'}}>
                    Interior Design
                  </Col>
                  <Col xs>
                    {place.interiorDesign}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          {/* right half of the page */}
          <Col xsOffset={1} xs={5}>
            {place.images.length ?
              <div>
                {/*  big picture slider */}
                <Row style={{paddingTop: 120}}>
                  <Col xs>
                    <Slider infinite slidesToShow={1} focusOnSelect lazyLoad speed={500}>
                      {place.images.map((imageSrc) =>
                        <Image key={imageSrc} src={imageSrc} rounded responsive />
                      )}
                    </Slider>
                  </Col>
                </Row>

                {/* Small preview thumbnails */}
                <Row style={{paddingTop: 120}}>
                  <Col xs>
                    <Slider infinite slidesToShow={3} focusOnSelect lazyLoad speed={500}>
                      {place.images.map((imageSrc) =>
                        <Thumbnail key={imageSrc} src={imageSrc}/>
                      )}
                    </Slider>
                  </Col>
                </Row>
              </div>
            : null}
          </Col>

        </Row>
      </Grid>
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
