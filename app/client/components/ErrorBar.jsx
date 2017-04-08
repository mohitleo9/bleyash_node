import React from 'react';
import { connect } from 'react-redux';
import {Alert} from 'react-bootstrap';

const ErrorBar = ({errors})=>{
  if (!errors)
    return null;

  return (
    <div>
      {errors.map((error, i) => (
        <Alert key={i} bsStyle="danger">
          <strong>Holy guacamole! Something Went Wrong!</strong>
          <br/>
          {error.data.error}
        </Alert>
      ))}
    </div>
  );
};

const mapStateToProps = ({errors}) =>({
  errors: errors.list
});

export default connect(mapStateToProps)(ErrorBar);
