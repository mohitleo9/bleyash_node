import React from 'react';
import FieldGroup from './FieldGroup';
import styles from '../css/AddPlacePage.css';
import {Button, FormGroup, FormControl} from 'react-bootstrap';
import axios from 'axios';
import {API_URL, PLACE_TYPES, PLACE_TYPES_TO_URLS} from '../constants';
import {withRouter} from 'react-router-dom';
import lodash from 'lodash';
import AutoSuggest from './AutoSuggest';
import GoogleMap from './GoogleMap';
import {updateLocationAndCenter} from '../actions/googleMap';
import store from '../store';


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
      <div>
        <FieldGroup value={address.address1} onChange={handleAddress("address1")} className="col-lg-6" id='address-1' bsSize="lg" type='text' placeholder='* Address Line 1' />
        <FieldGroup value={address.neighborhood} onChange={handleAddress("neighborhood")} className="col-lg-6" id='neighborhood' bsSize="lg" type='text' placeholder='Neighbourhood' />
        <FieldGroup value={address.city} onChange={handleAddress("city")} className="col-lg-6" id='city' bsSize="lg" type='text' placeholder='* City' />
        <FieldGroup value={address.state} onChange={handleAddress("state")} className="col-lg-6" id='state' bsSize="lg" type='text' placeholder='* State' />
        <FieldGroup value={address.zipcode} onChange={handleAddress("zipcode")} className="col-lg-6" id='zipcode' bsSize="lg" type='text' placeholder='* Zipcode' />
        <AutoSuggest value={address.country} placeholder="* Country" allSuggestions={this.state.countries} onChange={handleCountry} />
      </div>
    );
  }
}

class AddPlaceForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      address: {
        address1: '',
        neighborhood: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
      },
      description: '',
      type: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleCountry = this.handleCountry.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.autoFillAddress = this.autoFillAddress.bind(this);
    this.handleMapQuery = lodash.debounce(this.handleMapQuery.bind(this), 300);
    this.submit = this.submit.bind(this);
    this.autoCompleteService = new window.google.maps.places.AutocompleteService;
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
      this.setState({address});
    };
  }
  handleSelect(fieldName){
    return (event) =>{
      this.setState({[fieldName]: event.target.value});
    };
  }
  handleCountry(event, {newValue}){
    let address = {...this.state.address};
    address.country = newValue;
    this.setState({address});
  }
  handleName(event, {newValue}){
    this.setState({'name': newValue});
  }
  submit(){
    axios.post(`${API_URL}/places`,
      {
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        type: this.state.type,
      }
    )
      .then(()=>{
        this.props.history.push(`/t/${PLACE_TYPES_TO_URLS[this.state.type]}`);
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
    console.log('I am ');
    console.log(place);
    // only works for serbia
    let address = {
      address1: `${getFieldVal(['street_number'])} ${getFieldVal(['route'])}`,
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
    store.dispatch(updateLocationAndCenter(location));
    return address;
  }
  autoFillAddress(event, {suggestion}){
    let placeId = suggestion.result.place_id;
    // it needs some element which it tires to render data to (usually map)
    let service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails({placeId}, (place, status)=>{
      console.log(place);
      this.setState({address: this.parseAddress(place.address_components, place)});
    });
  }
  handleMapQuery(input, callback){
    let request = {input};
    // complete does not work so we have to prevent making further calls
    if (!input || (this.complete && input.includes(this.lastCompleteInput))){
      return callback(null, {});
    }
    this.autoCompleteService.getPlacePredictions(
      request,
      (results, status)=>{
        let suggestions = results && results.map((res, i)=> {
          return {
            value: res.description,
            result: res
          };
        });
        const error = !(status in ['OK', 'ZERO_RESULTS']);
        this.complete = status === 'ZERO_RESULTS';
        if (this.complete){
          this.lastCompleteInput = input;
        }
        callback(null, {
          suggestions,
          complete: this.complete,
        });
      }
    );
  }
  render(){
    const types = Object.values(PLACE_TYPES);
    const {lat, lng} = this.state.address;
    return (
      <form onSubmit={this.submit}>
        <div style={{height: '300px', width:'50%'}}>
          <GoogleMap />
        </div>
        <div className="row">
          <div className="col-md-8">
            <span className="underline h4">Add a new place &nbsp; </span>
            <br/>
            <small style={{color: '#C2C2C2'}}>To fill out the information, just write over words. Required fields are marked with (*)</small>
          </div>
          <div style={{paddingTop: '30px' }} className="col-md-4">
            <Button bsStyle="primary" type="submit" bsSize="large">Publish this place</Button>
          </div>
        </div>
        <div className="row">
          {/* <Select.Async name="form-field-name" value={this.state.name} onChange={this.handleName} loadOptions={lodash.debounce(this.handleMapQuery, 300)} /> */}
          <AutoSuggest placeholder="* Name of Place" onSuggestionSelected={this.autoFillAddress} value={this.state.name} onChange={this.handleName} getSuggestions={this.handleMapQuery} />
        </div>
        <div className="row">
          <AddressForm handleCountry={this.handleCountry} handleAddress={this.handleAddress} address={this.state.address}/>
        </div>
        <div className="row">
          <FieldGroup className="col-lg-6" id='place-description' bsSize="lg" type='text' value={this.state.description} onChange={this.handleChange('description')} placeholder='* description' />
        </div>
        <FormGroup controlId="formControlsSelect">
          <FormControl value={this.state.value} onChange={this.handleSelect('type')} componentClass="select" placeholder="Type">
            <option value="">Select Type</option>
            {types.map((type) => <option key={type} value={type}>{type.toUpperCase()}</option>)}
          </FormControl>
        </FormGroup>
      </form>
    );
  }
};
const AddPlaceFormWithRouter = withRouter(AddPlaceForm);

const AddPlacePage = () =>
  <div className="container">
    <AddPlaceFormWithRouter />
  </div>;

export default AddPlacePage;
