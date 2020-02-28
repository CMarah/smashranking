const mongoose = require('mongoose');

const PlayersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  ts_avg: {
    type: Number,
  },
  ts_sig: {
    type: Number,
  },
  country: {
    type: String,
  },
});

module.exports = mongoose.model('Players', PlayersSchema);
