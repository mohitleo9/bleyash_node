const slugify = require('slugify');
const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const PlaceSchema   = new Schema({
  name: String,
  address: String,
  description: String,
  slug: {
    type: String,
    unique: true,
    index: true,
  }
});

function random(digits=4){
  return Math.floor(Math.random() * Math.pow(10, digits));
};

PlaceSchema.pre('save', function(next){
  // not bullet proof but it should work
  this.slug = slugify(this.name, random());
  next();
});

module.exports = mongoose.model('Place', PlaceSchema);
