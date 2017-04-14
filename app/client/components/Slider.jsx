import React from 'react';
import Slider from 'react-slick';
import '../assets/css/Slider.css';


const PrevArrow = ({onClick}) =>
  <i onClick={onClick} className="fa fa-arrow-left arrow-prev" aria-hidden="true" />;

const NextArrow = ({onClick})=>
  <i onClick={onClick} className="fa fa-arrow-right arrow-next" aria-hidden="true"></i>;

const SliderWithArrow = (props) =>
  <Slider prevArrow={<PrevArrow />} nextArrow={<NextArrow />} {...props} />;

export default SliderWithArrow;
