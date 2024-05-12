const mongoose = require('mongoose');

// Define schema
const courseSchema = new mongoose.Schema({
  university: String,
  name: String,
  level: String
});

// Define model
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
