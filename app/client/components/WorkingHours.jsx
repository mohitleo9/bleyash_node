import React from 'react';
import FieldGroup from './FieldGroup';
import {Checkbox} from 'react-bootstrap';

import { Row, Col } from 'react-flexbox-grid';

const timeValidator = (time) =>
  /(1[0-2]|0[1-9]):([0-5][0-9]) ([AaPp][Mm])/.test(time);

class WorkingHours extends React.Component{
  render(){
    return (
      <Row style={{paddingBottom: 30}}>
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
                  <Col xs={3}>
                    <FieldGroup validator={timeValidator} value={openingHour} onChange={this.props.handleWorkingHours(day, 'openingHour')} disabled={closed} type='text' placeholder='hh:mm am/pm' />
                  </Col>
                  <Col xs={3}>
                    <FieldGroup validator={timeValidator} value={closingHour} onChange={this.props.handleWorkingHours(day, 'closingHour')} disabled={closed} type='text' placeholder='hh:mm am/pm' />
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
