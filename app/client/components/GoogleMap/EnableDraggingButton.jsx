import React from 'react';
import {Button} from 'react-bootstrap';
import googleMapActions from '../../actions/googleMap';
import { connect } from 'react-redux';


const EnableDraggingButton = ({onClick, disabled, text})=> {
  if (disabled){
    return <small style={{color: '#959595'}}><a onClick={onClick}>Click Here</a> To save the changes to the map</small> ;
  }
  else {
    return <small style={{color: '#959595'}}>*Think this is Wrong <a onClick={onClick}>Click Here</a> To move the marker</small> ;
  }
};

const mapStateToProps = ({googleMap}) => ({
  disabled: googleMap.draggingAllowed
});

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(googleMapActions.toggleDragging(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnableDraggingButton);
