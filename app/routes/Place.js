const Place = require('../models/Place.js');

const getPlaces = (req, res) => {
  Place.find(null, null, (err, persons) => {
    if (err) {
      res.send(err);
    }
    else {
      res.json(persons);
    }
  })

}
const getPlace = (req, res)=> {}
const postPlace = (req, res)=> {
  // assign the body to check for errors on save
  let place = Object.assign(new Place, req.body);

  place.save( (err) => {
    if (err) {
      res.send(err);
    }
    res.json({message: 'place created'});
  })
}
const deletePlace = (req, res)=> {}

module.exports = {getPlaces, getPlace, postPlace, deletePlace};
