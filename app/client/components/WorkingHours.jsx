import React from 'react';
import FieldGroup from './FieldGroup';
import {Checkbox} from 'react-bootstrap';

import { Row, Col } from 'react-flexbox-grid';


class WorkingHours extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      done: false,
      openingHour: '',
      closingHour: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(fieldName){
    return (event) => {
      this.setState({[fieldName]: event.target.value});
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (!this.state.done && this.state.openingHour && this.state.closingHour){
      this.setState({done: true});
    }
  }
  render(){
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'].map((day) =>
      ({
        day,
        openingHour: "7:30 am",
        closingHour: "12:30 pm",
        closed: false,
      })
    );
    return (
      <Row>
        <Col xs>
          <Row>
            <Col xs={12} md={2} style={{display: 'flex', alignItems: 'center'}}>
              Working Hours:
            </Col>
          </Row>

          { !this.state.done &&
            <Row>
              <Col xs={2}>
                <FieldGroup value={this.state.openingHour} onChange={this.handleChange('openingHour')} required type='text' placeholder='opening' />
              </Col>
              <Col xs={2}>
                <FieldGroup value={this.state.closingHour} onChange={this.handleChange('closingHour')} required type='text' placeholder='closing' />
              </Col>
              {/* {openingHour} - {closingHour} */}
            </Row>
          }
          { this.state.done && days.map(({day, openingHour, closingHour, closed}) =>(
            <Row key={day}>
              <Col xs={12} md={2} style={{display: 'flex', alignItems: 'center'}}>
                {day}:
              </Col>
              <Col xs>
                <Row>
                  <Col xs={2}>
                    <FieldGroup defaultValue={this.state.openingHour} required type='text' placeholder='opening' />
                  </Col>
                  <Col xs={2}>
                    <FieldGroup defaultValue={this.state.closingHour} required type='text' placeholder='closing' />
                  </Col>
                  <Col xs>
                    <Checkbox>
                      Closed
                    </Checkbox>
                  </Col>
                  {/* {openingHour} - {closingHour} */}
                </Row>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    );
  }
};

export default WorkingHours;
