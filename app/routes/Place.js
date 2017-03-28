const _ = require('lodash');
const Place = require('../models/Place.js');

const PUBLIC_FIELDS = ['name', 'address', 'description', 'slug'];

const getPlaces = (req, res) => {
  Place.find(null, PUBLIC_FIELDS, (err, places) => {
    if (err) {
      res.send(err);
    }
    else {
      res.json(places);
    }
  });
};
const getPlace = (req, res, next)=> {
  console.log('asdfasdf');
  console.log(req.params);
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
