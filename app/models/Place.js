const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const PlaceSchema   = new Schema({
    name: String,
    Address: String,
    description: String
});

module.exports = mongoose.model('Place', PlaceSchema);
