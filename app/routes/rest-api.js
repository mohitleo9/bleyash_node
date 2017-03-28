const routes = require('express').Router();
const {getPlaces, getPlace, postPlace, deletePlace} = require('./Place');

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

routes.route('/places')
  .get(getPlaces)
  .post(postPlace);

routes.route('/places/:slug')
  .get(getPlace)
  .delete(deletePlace);

module.exports = routes;
