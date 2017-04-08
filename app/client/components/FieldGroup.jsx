import React from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

class FieldGroup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isDirty: false,
    };
    this.validationState = this.validationState.bind(this);
    this.requiredValidator = this.requiredValidator.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if (!this.state.isDirty && this.props.value !== nextProps.value){
      this.setState({isDirty: true});
    }
  }
  requiredValidator(value){
    if (this.state.isDirty){
      return value ? null : 'error';
    }
    else {
      return null;
    }
  }
  validationState(value){
    if (this.props.required){
      return this.requiredValidator(value);
    }
    else {
      return null;
    }
  }
  render(){
    const { id, label, help, ...props} = this.props;
    return (
      <FormGroup validationState={this.validationState(props.value)} controlId={id}>
        {this.props.children ?
          this.props.children
          :(
            <div>
              <ControlLabel>{label}</ControlLabel>
              <FormControl {...props} />
              {help && <HelpBlock>{help}</HelpBlock>}
            </div>
          )
        }
      </FormGroup>
    );
  }
}

export default FieldGroup;
