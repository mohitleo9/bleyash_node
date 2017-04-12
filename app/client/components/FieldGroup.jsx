import React from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import {Row, Col} from 'react-flexbox-grid';
import lodash from 'lodash';

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
    return !!value;
  }
  validationState(value, customValidator){
    // don't validate if nothing has changed
    if (!this.state.isDirty){
      return null;
    }
    // all validators must return true if they validate else false
    let validators = [];
    if (this.props.required){
      validators.push(this.requiredValidator);
    }
    if (customValidator){
      validators.push(customValidator);
    }
    // check if some don't validate
    const isValid = !lodash.some(validators, (validator)=> !validator(value));
    return isValid ? null : 'error';
  }
  render(){
    const { id, validator, label, help, ...props} = this.props;
    return (
      <FormGroup validationState={this.validationState(props.value, validator)} controlId={id}>
        {this.props.children ?
          this.props.children
          :(
            <Row>
              { label &&
                <Col xs={12} md={2} style={{display: 'flex', alignItems: 'center'}}>
                  <ControlLabel>{label}</ControlLabel>
                </Col>
              }
              <Col xs md>
                <FormControl {...props} />
              </Col>
              {help && <HelpBlock>{help}</HelpBlock>}
            </Row>
          )
        }
      </FormGroup>
    );
  }
}

export default FieldGroup;
