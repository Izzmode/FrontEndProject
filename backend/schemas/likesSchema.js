const mongoose = require('mongoose');

const likesSchema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', },
    venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' }
})


//populera bookings och liked venues?
module.exports = mongoose.model('Likes', likesSchema)