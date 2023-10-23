const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true }
})


//populera bookings och liked venues?
module.exports = mongoose.model('User', userSchema)