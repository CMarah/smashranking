const mongoose = require('mongoose');

const SetsSchema = new mongoose.Schema({
  p1_name: {
    type: String,
  },
  p2_name: {
    type: String,
  },
  p1_score: {
    type: Number,
  },
  p2_score: {
    type: Number,
  },
  tournament_name: {
    type: String,
  },
});

module.exports = mongoose.model('Sets', SetsSchema);
