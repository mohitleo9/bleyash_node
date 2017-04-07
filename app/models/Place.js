const slugify = require('slugify');
const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const PLACE_TYPES = {
  BAR: 'bar',
  RESTURANT: 'resturant',
  CLUB: 'club'
};

const AddressSchema = new Schema({
  address1: {type: String, required: true, minlength: 2},
  neighborhood: {type: String, required: true, minlength: 2},
  city: {type: String, required: true, minlength: 2},
  state: String,
  zipcode: {type: String, required: true, minlength: 2},
  country: {type: String, required: true, minlength: 2},
  lat: {type: Number, required: true},
  lng: {type: Number, required: true},
});

const PlaceSchema   = new Schema({
  name: { type: String, required: true},
  address: AddressSchema,
  description: {type: String, required: true},
  type: { type: String, enum: Object.values(PLACE_TYPES), required: true},
  slug: {
    type: String,
    unique: true,
    index: true,
  }
});

function random(digits=4, min, max){
  return Date.now() % Math.pow(10, digits);
};

PlaceSchema.pre('save', function(next){
  // not bullet proof but it should work
  this.slug = slugify(this.name + random());
  next();
});

PlaceSchema.index({name: 1, type: 1}, {unique: true});

module.exports = mongoose.model('Place', PlaceSchema);
