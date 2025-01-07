const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true },
   address: { type: String, required: true },
   location: { type: String },
   date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
