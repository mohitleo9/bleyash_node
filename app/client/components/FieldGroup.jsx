import React from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import {Row, Col} from 'react-flexbox-grid';

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
