import React from 'react';
import FieldGroup from './FieldGroup';
import styles from '../css/AddPlacePage.css';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import {API_URL} from '../constants';
import {withRouter} from 'react-router-dom';

class AddPlaceForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      address: '',
      description: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  handleChange(fieldName){
    return (event) =>{
      // computed value !
      this.setState({[fieldName]: event.target.value});
    };
  }
  submit(){
    console.log('called');
    axios.post(`${API_URL}/places`,
      {
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
      }
    )
      .then(()=>{
        console.log('logging');
        this.props.history.push('/t/bars');
      });
  }
  render(){
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
          <FieldGroup className="col-lg-6" id='place-name' bsSize="lg" type='text' value={this.state.name} onChange={this.handleChange('name')} placeholder='* Name of the Place' />
        </div>
        <div className="row">
          <FieldGroup className="col-lg-6" id='place-address' bsSize="lg" type='text' value={this.state.address} onChange={this.handleChange('address')} placeholder='* Address' />
        </div>
        <div className="row">
          <FieldGroup className="col-lg-6" id='place-description' bsSize="lg" type='text' value={this.state.description} onChange={this.handleChange('description')} placeholder='* description' />
        </div>
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
