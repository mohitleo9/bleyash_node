const fs = require('fs');
const lodash = require('lodash');

const getCountries = (req, res) => {
  const countries = JSON.parse(fs.readFileSync(__dirname + '/data/countries.json'));
  res.json({countries});
};

const getStatesForCountry = (req, res) =>{
  const countryName = req.params.name;
  const countries = JSON.parse(fs.readFileSync(__dirname + '/data/countries.json'));
  const country = lodash.find(countries, ['name', countryName]);
  const states  = JSON.parse(fs.readFileSync(__dirname + `/data/countries/${country.filename}.json`));
  res.json(states);
};

module.exports = {
  getCountries,
  getStatesForCountry,
};
