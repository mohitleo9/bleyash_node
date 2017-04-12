import React from 'react';
import FieldGroup from './FieldGroup';
import styles from '../assets/css/AddPlacePage.css';
import {Button, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';
import axios from 'axios';
import update from 'immutability-helper';
import {API_URL, PLACE_TYPES, PLACE_TYPES_TO_URLS} from '../constants';
import {withRouter} from 'react-router-dom';
import lodash from 'lodash';
import AutoSuggest from './AutoSuggest';
import {GoogleMap, EnableDraggingButton} from './GoogleMap';
import Dropzone from './DropZone';
import ga from '../actions/googleMap';
import store from '../store';
import {getFormattedAddress} from '../utils';
import Rating  from 'react-rating';
import { Grid, Row, Col } from 'react-flexbox-grid';
import WorkingHours from './WorkingHours.jsx';


const Dollar = () =>
  <i className="fa fa-usd" style={{color: 'black', fontSize: 30}} aria-hidden="true"></i>;

const EmptyDollar = () =>
  <i className="fa fa-usd" style={{color: '#ccc', fontSize: 30}} aria-hidden="true"></i>;

class AddressForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      countries: []
    };
  }
  componentWillMount(){
    axios.get(`${API_URL}/countries`)
      .then((res)=>{
        const options = res.data.countries.map((country) => {
          return {value: country.name};
        });
        this.setState({countries: options});
      });
  }
  render(){
    const {handleAddress, handleCountry, address} = this.props;

    return (
      <Col xs>
        <FieldGroup required label='Address' value={address.address1} onChange={handleAddress("address1")} className="" id='address-1' bsSize="lg" type='text' placeholder='* Address Line 1' />
        <FieldGroup required label="Nighbourhood" value={address.neighborhood} onChange={handleAddress("neighborhood")} className="" id='neighborhood' bsSize="lg" type='text' placeholder='Neighbourhood' />
        <FieldGroup required label="City" value={address.city} onChange={handleAddress("city")} className="" id='city' bsSize="lg" type='text' placeholder='* City' />
        <FieldGroup required label="Zipcode" value={address.zipcode} onChange={handleAddress("zipcode")} className="" id='zipcode' bsSize="lg" type='text' placeholder='* Zipcode' />
        <FieldGroup required value={address.country}>
          <Row>
            <Col xs={12} md={2} style={{display: 'flex', alignItems: 'center'}}>
              <ControlLabel> Country </ControlLabel>
            </Col>
            <Col xs md>
              <AutoSuggest required value={address.country} placeholder="* Country" allSuggestions={this.state.countries} onChange={handleCountry} />
            </Col>
          </Row>
        </FieldGroup>
      </Col>
    );
  }
}

class AddPlaceForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      _promises: [],
      isPromisePending: false,
      name: '',
      images: [],
      address: {
        address1: '',
        neighborhood: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
      },
      description: '',
      type: '',
      phone: '',
      website: '',
      workingHours: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) =>
        ({
          day,
          openingHour: "",
          closingHour: "",
          closed: false,
        })
      ),
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchLocation = lodash.debounce(this.fetchLocation.bind(this), 1000);
    this.handleName = this.handleName.bind(this);
    this.handleCountry = this.handleCountry.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.autoFillAddress = this.autoFillAddress.bind(this);
    this.handleMapQuery = lodash.debounce(this.handleMapQuery.bind(this), 300);
    this.submit = this.submit.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.autoCompleteService = new window.google.maps.places.AutocompleteService;
    this.handleImageData = this.handleImageData.bind(this);
    this.geocoder = new google.maps.Geocoder();
    this.addPendingPromise = this.addPendingPromise.bind(this);
    this.handleWorkingHours = this.handleWorkingHours.bind(this);
  }
  handleChange(fieldName){
    return (event) =>{
      // computed value !
      this.setState({[fieldName]: event.target.value});
    };
  }
  handleAddress(fieldName){
    return (event) =>{
      let address = {...this.state.address};
      address[fieldName]= event.target ? event.target.value :event.value;
      this.setAddress(address);
    };
  }
  handleWorkingHours(day, fieldName){
    //helper
    const getWh = (day, whs) =>
      whs.find((wh) => wh.day === day);

    return (event)=>{
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      const index = this.state.workingHours.findIndex((wh)=> wh.day === day);
      // this follows mongodb like syntax
      let workingHours = update(this.state.workingHours, {[index]: {[fieldName]: {$set: value}}});
      // get the updated monday (if monday was updated)
      const monday = getWh("Monday", workingHours);

      if (day === "Monday" && fieldName !=='closed' && monday.openingHour && monday.closingHour){
        // let's autofill the rest
        workingHours = this.state.workingHours.map((wh)=> ({...wh, ...{openingHour: monday.openingHour, closingHour: monday.closingHour}}));
      }
      this.setState({workingHours});
    };
  }
  handleSelect(fieldName){
    return (event) =>{
      this.setState({[fieldName]: event.target.value});
    };
  }
  fetchLocation(address) {

    const formattedAddress = getFormattedAddress(address);
    console.log('the request address is');
    console.log(formattedAddress);
    this.geocoder.geocode({address: formattedAddress}, (results, status) =>{
      console.log('location is');
      const location = results[0].geometry.location;
      console.log(results);
      store.dispatch(ga.updateLocationAndCenter({
        lat: location.lat(),
        lng: location.lng()
      }));
    });


  }
  setAddress(address, updateLocation=true){
    // used for hooks
    this.setState({address});

    const isComplete = (a, requiredFields=['address1', 'city', 'zipcode', 'country']) =>
      !lodash.some(requiredFields, (key) => !a[key]);

    if (updateLocation && isComplete(address)){
        this.fetchLocation(address);
    }
  }
  handleCountry(event, {newValue}){
    let address = {...this.state.address};
    address.country = newValue;
    this.setAddress(address);
  }
  handleName(event, {newValue}){
    this.setState({'name': newValue});
  }
  submit(){
    this.setState({isPromisePending: true});
    Promise.all(this.state._promises).then(()=>{
      const {googleMap: {lat, lng}} = store.getState();
      const address = {...this.state.address, ...{lat, lng}};

      axios.post(`${API_URL}/places`,
        {
          name: this.state.name,
          images: this.state.images,
          address: address,
          description: this.state.description,
          type: this.state.type,
        })
        .then(()=>{
          console.log('completed');
          this.props.history.push(`/t/${PLACE_TYPES_TO_URLS[this.state.type]}`);
        });
    });
  }
  parseAddress(addressComponents, place){
    const getField = (fields)=> {
      return _.find(addressComponents, (c)=> lodash.intersection(c.types, fields).length === fields.length );
    };
    const getFieldVal = (fields) =>{
      const val = getField(fields) || '';
      return val && val.long_name;
    };
    // only works for serbia
    let address = {
      address1: `${getFieldVal(['route'])} ${getFieldVal(['street_number'])}`,
      neighborhood: getFieldVal(['sublocality_level_1']),
      city: getFieldVal(['locality', 'political']),
      state: '',
      zipcode: getFieldVal(['postal_code']),
      country: getFieldVal(['country']),
    };
    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    store.dispatch(ga.updateLocationAndCenter(location));
    return address;
  }
  autoFillAddress(event, {suggestion}){
    let placeId = suggestion.result.place_id;
    // it needs some element which it tires to render data to (usually map)
    let service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails({placeId}, (place, status)=>{
      console.log(place);
      this.setAddress(this.parseAddress(place.address_components, place), false);
    });
  }
  handleMapQuery(input, callback){
    let request = {input};
    // set this complete variable to prevent making further calls
    if (!input || (this.complete && input.includes(this.lastCompleteInput))){
      return callback(null, {
        suggestions: []
      });
    }
    this.autoCompleteService.getPlacePredictions(
      request,
      (results, status)=>{
        let suggestions = results ? results.map((res, i)=> {
          return {
            value: res.description,
            result: res
          };
        }) : [];
        const error = !(status in ['OK', 'ZERO_RESULTS']);
        this.complete = status === 'ZERO_RESULTS';
        if (this.complete){
          this.lastCompleteInput = input;
        }
        callback(null, {
          suggestions,
        });
      }
    );
  }
  handleImageData(data){
    // so for now we just need the urls;
    this.setState({images: [...this.state.images, data.url]});
  }
  addPendingPromise(promise){
    this.setState({_promises: [...this.state._promises, ...[promise]]});
  }
  render(){
    const types = Object.values(PLACE_TYPES);
    return (
      <form onSubmit={this.submit}>
        {/* main container */}
        <Row>
          {/* left half of page */}
          <Col xsOffset={1} xs>
            <Row>
              <Col xs>
                <legend> Add New Place </legend>
              </Col>
            </Row>
            {/* name autocomplete */}
            <Row>
              <Col xs>
                <FieldGroup value={this.state.name} required>
                  <Row>
                    <Col xs={12} md={2} style={{display: 'flex', alignItems: 'center'}}>
                      <ControlLabel> Name </ControlLabel>
                    </Col>
                    <Col xs md >
                      <AutoSuggest placeholder="* Name of Place" onSuggestionSelected={this.autoFillAddress} value={this.state.name} onChange={this.handleName} getSuggestions={this.handleMapQuery} />
                    </Col>
                  </Row>
                </FieldGroup>
              </Col>
            </Row>

            {/* address */}
            <Row>
              <AddressForm handleCountry={this.handleCountry} handleAddress={this.handleAddress} address={this.state.address}/>
            </Row>


            {/* Phone */}
            <Row>
              <Col xs>
                <FieldGroup label="Phone" required id='place-phone' bsSize="lg" type='text' value={this.state.phone} onChange={this.handleChange('phone')} placeholder='* phone' />
              </Col>
            </Row>

            {/* Website */}
            <Row>
              <Col xs>
                <FieldGroup label="Website" required id='place-website' bsSize="lg" type='text' value={this.state.website} onChange={this.handleChange('website')} placeholder='* website' />
              </Col>
            </Row>

            {/* description */}
            <Row style={{paddingBottom: 50}}>
              <Col xs>
                <FieldGroup label="Description" required id='place-description' bsSize="lg" type='text' value={this.state.description} onChange={this.handleChange('description')} placeholder='* description' />
              </Col>
            </Row>

            {/* Type of Bar */}
            <Row>
              <Col xs>
                <FormGroup controlId="formControlsSelect">
                  <Row>
                    <Col xs={12} md={2} style={{display: 'flex', alignItems: 'center'}}>
                      <ControlLabel>Type of Bar</ControlLabel>
                    </Col>
                    <Col xs>
                      <FormControl required value={this.state.value} onChange={this.handleSelect('type')} componentClass="select" placeholder="Type">
                        <option value="">Select Type</option>
                        {types.map((type) => <option key={type} value={type}>{type.toUpperCase()}</option>)}
                      </FormControl>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>

            {/* price range */}
            <Row>
              <Col xs>
                <Row>
                  <Col xs={12} md={2} style={{display: 'flex', alignItems: 'center'}}>
                    Price Range
                  </Col>
                  <Col xs className='input-lg'>
                    <Rating full={<Dollar />} empty={<EmptyDollar />} placeholder={<EmptyDollar />} stop={4} />
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* working hours  */}
            {/* it's already wrapped in row>col */}
            <WorkingHours handleWorkingHours={this.handleWorkingHours} workingHours={this.state.workingHours}/>

            {/* other attributes */}
            {['Alcohol', 'Credit Card', 'Wifi', 'A/C', 'Parking', 'Outside Sitting', 'View', 'Live Music'].map((attrName) =>
              <Row>
                <Col xs>
                  <Row>
                    <Col xs={12} md={2} style={{display: 'flex', alignItems: 'center'}}>
                      {attrName}
                    </Col>
                    <Col xs>
                      <Checkbox />
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}

          </Col>

          {/* right half of page */}
          <Col xsOffset={1} xs>
            {/* google map */}
            <Row center='xs'>
              <Col xs>
                <div style={{height: '300px'}}>
                  <GoogleMap />
                </div>
              </Col>
            </Row>

            {/* drag button */}
            <Row center='xs'>
              <Col xs>
                <EnableDraggingButton text="Correct Marker"/>
              </Col>
            </Row>

            {/* dropzone */}
            <Row center='xs'>
              <Col xs>
                <Dropzone addPendingPromise={this.addPendingPromise} handleImageData={this.handleImageData} />
              </Col>
            </Row>
          </Col>

        </Row>
        {/* <div className="row"> */}
        {/*   <div className="col-md-8"> */}
        {/*     <span className="underline h4">Add a new place &nbsp; </span> */}
        {/*     <br/> */}
        {/*     <small style={{color: '#C2C2C2'}}>To fill out the information, just write over words. Required fields are marked with (*)</small> */}
        {/*   </div> */}
        {/*   <div style={{paddingTop: '30px' }} className="col-md-4"> */}
        {/*     <Button bsStyle="primary" disabled={this.state.isPromisePending} type="submit" bsSize="large"> */}
        {/*       {this.state.isPromisePending ? <i className="fa fa-spin fa-spinner" aria-hidden="true" /> : null} */}
        {/*        &nbsp; Publish this place */}
        {/*     </Button> */}
        {/*   </div> */}
        {/* </div> */}
      </form>
    );
  }
};
const AddPlaceFormWithRouter = withRouter(AddPlaceForm);

const AddPlacePage = () =>
  <Grid fluid>
    <AddPlaceFormWithRouter />
  </Grid>;

export default AddPlacePage;
