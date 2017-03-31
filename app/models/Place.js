const slugify = require('slugify');
const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const PLACE_TYPES = {
  BAR: 'bar',
  RESTURANT: 'resturant',
  CLUB: 'club'
};

const PlaceSchema   = new Schema({
  name: { type: String },
  address: String,
  description: String,
  type: { type: String, enum: Object.values(PLACE_TYPES) },
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
