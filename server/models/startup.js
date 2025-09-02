const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  name: String,
  industry: String,
  description: String,
  founder: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Startup', startupSchema);
