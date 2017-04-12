import React from 'react';
import FieldGroup from './FieldGroup';
import {Checkbox} from 'react-bootstrap';

import { Row, Col } from 'react-flexbox-grid';


class WorkingHours extends React.Component{
  render(){
    return (
      <Row>
        <Col xs>
          <Row>
            <Col xs={12} md={2} style={{display: 'flex', alignItems: 'center'}}>
              Working Hours:
            </Col>
          </Row>

          { this.props.workingHours.map(({day, openingHour, closingHour, closed}) =>(
            <Row key={day}>
              <Col xs={12} md={2} style={{display: 'flex', alignItems: 'center'}}>
                {day}:
              </Col>
              <Col xs>
                <Row>
                  <Col xs={2}>
                    <FieldGroup value={openingHour} onChange={this.props.handleWorkingHours(day, 'openingHour')} disabled={closed} type='text' placeholder='opening' />
                  </Col>
                  <Col xs={2}>
                    <FieldGroup value={closingHour} onChange={this.props.handleWorkingHours(day, 'closingHour')} disabled={closed} type='text' placeholder='closing' />
                  </Col>
                  <Col xs>
                    <Checkbox checked={closed} onChange={this.props.handleWorkingHours(day, 'closed')}>
                      Closed
                    </Checkbox>
                  </Col>
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
