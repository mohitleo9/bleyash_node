import React from 'react';
import Rating  from 'react-rating';


const Dollar = ({dollarStyle}) =>{
  let style = {color: 'black', fontSize: 30};
  if (dollarStyle){
    Object.assign(style, dollarStyle);
  }
  return <i className="fa fa-usd" style={style} aria-hidden="true"></i>;
};

const EmptyDollar = ({dollarStyle}) =>{
  let style = {color: '#ccc', fontSize: 30};
  if (dollarStyle){
    Object.assign(style, dollarStyle);
  }
  return <i className="fa fa-usd" style={style} aria-hidden="true"></i>;
};

const PriceRating = ({dollarStyle, ...props}) =>
  <Rating stop={4} full={<Dollar dollarStyle={dollarStyle}/>} empty={<EmptyDollar dollarStyle={dollarStyle} />} placeholder={<EmptyDollar dollarStyle={dollarStyle}/>} {...props} />;

export default PriceRating;

