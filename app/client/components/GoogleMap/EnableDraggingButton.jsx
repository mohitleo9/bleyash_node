import React from 'react';
import {Button} from 'react-bootstrap';
import googleMapActions from '../../actions/googleMap';
import { connect } from 'react-redux';


const EnableDraggingButton = ({onClick, disabled, text})=> {
  return (
    <Button disabled={disabled} onClick={onClick} bsStyle="primary" bsSize="small">{text}</Button>
  );
};

const mapStateToProps = ({googleMap}) => ({
  disabled: googleMap.draggingAllowed
});

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(googleMapActions.updateDragging(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnableDraggingButton);
