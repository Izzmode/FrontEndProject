const mongoose = require('mongoose');

const venueSchema = mongoose.Schema({
  name: { type: String },
  adress: { type: String },
  numberOfPeople: { type: Number },
  information: {type: String },
  amenities: [ 
    {
        service: { type: String },
    }],
  contact: {
        fullName: { type: String },
        email: { type: String } 
        },
  website: { type: String },
  arrangements: [ 
    {
        seating: { type: String},
        capacity: { type: Number } 
    }],
  thumbnail: { type: String },
  images: { type: [String] },
  pricePerHour: { type: Number },
  rating: { type: Number },
  favourite: { type: Boolean }
})

module.exports = mongoose.model('Venue', venueSchema)