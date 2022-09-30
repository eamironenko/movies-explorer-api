const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: { //длительность фильма
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    length: 4,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    match: /^https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{2,}\b([-\w()@:%.+~#=\\?&]*)/i,
  },
  trailerLink: {
    type: String,
    required: true,
    match: /^https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{2,}\b([-\w()@:%.+~#=\\?&]*)/i,
  },
  thumbnail: {
    type: String,
    required: true,
    match: /^https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{2,}\b([-\w()@:%.+~#=\\?&]*)/i,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('user', movieSchema);