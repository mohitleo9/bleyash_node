const _ = require('lodash');
const Place = require('../models/Place.js');

const PUBLIC_FIELDS = [
  'name', 'address', 'description', 'slug', 'type', 'images',
  'phone', 'website', 'alcohol', 'priceRating', 'creditCard',
  'wifi', 'ac', 'parking', 'outsideSitting', 'liveMusic', 'interiorDesign',
  'workingHours',
];

const getPlaces = (req, res) => {
  const query = req.query.type ? {type: req.query.type} : null;
  Place.find(query, PUBLIC_FIELDS, (err, places) => {
    if (err) {
      res.send(err);
    }
    else {
      res.json(places);
    }
  });
};
const getPlace = (req, res, next)=> {
  Place.find({'slug': req.params.slug}, PUBLIC_FIELDS, (err, place) =>{
    if (err) {
      return next(err);
    }
    else {
      res.json(place);
    }
  });
};
const postPlace = (req, res, next)=> {
  // assign the body to check for errors on save
  const data = _.pick(req.body, PUBLIC_FIELDS);
  let place = Object.assign(new Place, data);

  place.save( (err) => {
    if (err) {
      return next(err);
    }
    res.json({message: 'place created'});
  });
};
const deletePlace = (req, res)=> {};

module.exports = {getPlaces, getPlace, postPlace, deletePlace};
