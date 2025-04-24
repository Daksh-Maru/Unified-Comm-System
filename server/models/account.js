const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  balance: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);
