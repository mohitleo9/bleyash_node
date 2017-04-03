import React from 'react';
import FieldGroup from './FieldGroup';
import styles from '../css/AddPlacePage.css';
import {Button, FormGroup, FormControl} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import axios from 'axios';
import {API_URL, PLACE_TYPES, PLACE_TYPES_TO_URLS} from '../constants';
import {withRouter} from 'react-router-dom';
import lodash from 'lodash';

class AddPlaceForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      address: '',
      description: '',
      type: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleMapQuery = this.handleMapQuery.bind(this);
    this.submit = this.submit.bind(this);
    this.autoCompleteService = new window.google.maps.places.AutocompleteService;
  }
  handleChange(fieldName){
    return (event) =>{
      // computed value !
      this.setState({[fieldName]: event.target.value});
    };
  }
  handleSelect(fieldName){
    return (event) =>{
      this.setState({[fieldName]: event.target.value});
    };
  }
  handleName(event){
    //used by react select
    // const val = event.value.terms[0].value;
    const val = event.value;
    this.setState({'name': val});
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
  handleMapQuery(input, callback){
    let request = {input};
    // complete does not work so we have to prevent making further calls
    if (!input || (this.complete && input.includes(this.lastCompleteInput))){
      return callback(null, {});
    }
    this.autoCompleteService.getPlacePredictions(
      request,
      (results, status)=>{
        let options = results && results.map((res, i)=> {
          return {
            value: res.terms[0].value,
            label: res.description
          };
        });
        const error = !(status in ['OK', 'ZERO_RESULTS']);
        // complete option does not work https://github.com/JedWatson/react-select/issues/1514
        this.complete = status === 'ZERO_RESULTS';
        if (this.complete){
          this.lastCompleteInput = input;
        }
        callback(null, {
          options,
          complete: this.complete,
        });
      }
    );
  }
  render(){
    const types = Object.values(PLACE_TYPES);
    return (
      <form onSubmit={this.submit}>
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
          <Select.Async name="form-field-name" value={this.state.name} onChange={this.handleName} loadOptions={lodash.debounce(this.handleMapQuery, 300)} />
        </div>
        <div className="row">
          <FieldGroup className="col-lg-6" id='place-address' bsSize="lg" type='text' value={this.state.address} onChange={this.handleChange('address')} placeholder='* Address' />
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
