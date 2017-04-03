const routes = require('express').Router();
const {getPlaces, getPlace, postPlace, deletePlace} = require('./Place');
const {getCountries, getStatesForCountry} = require('./Country');

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

routes.route('/places')
  .get(getPlaces)
  .post(postPlace);

routes.route('/places/:slug')
  .get(getPlace)
  .delete(deletePlace);

routes.route('/countries')
  .get(getCountries);

routes.route('/countries/:name/states')
  .get(getStatesForCountry);

module.exports = routes;
