const mongoose = require('mongoose');

// Define schema
const universitySchema = new mongoose.Schema({
  country: String,
  city: String,
  name: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
  },
  students: [{
    year: Number,
    number: Number
  }]
});

// Define model
const University = mongoose.model('University', universitySchema);

module.exports = University;
