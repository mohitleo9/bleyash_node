import React from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

class FieldGroup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isDirty: false,
      lastValue: props.value
    };
    this.validationState = this.validationState.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if (!this.state.isDirty && this.state.lastValue !== nextProps.value){
      this.setState({isDirty: true});
    }
  }
  validationState(value){
    if (this.state.isDirty){
      return value ? null : 'error';
    }
    else {
      return null;
    }
  }
  render(){
    const { id, label, help, ...props} = this.props;
    return (
      <FormGroup validationState={this.validationState(props.value)} controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }
}

export default FieldGroup;
