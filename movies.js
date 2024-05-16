const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: String,
  img: String,
  summary: String
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

