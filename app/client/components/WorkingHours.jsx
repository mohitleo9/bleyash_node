import React from 'react';
import FieldGroup from './FieldGroup';

import { Row, Col } from 'react-flexbox-grid';


const WorkingHours = ()=> {
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
        {days.map(({day, openingHour, closingHour, closed}) =>(
          <Row key={day}>
            <Col xs={12} md={2} style={{display: 'flex', alignItems: 'center'}}>
              {day}:
            </Col>
            <Col xs>
              <Row>
                <Col xs={2}>
                  <FieldGroup required type='text' placeholder='opening' />
                </Col>
                <Col xs={2}>
                  <FieldGroup required type='text' placeholder='closing' />
                </Col>
                {/* {openingHour} - {closingHour} */}
              </Row>
            </Col>
          </Row>
        ))}
      </Col>
    </Row>
  );
};

export default WorkingHours;
