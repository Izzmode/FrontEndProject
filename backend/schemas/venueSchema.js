const mongoose = require('mongoose');

const venueSchema = mongoose.Schema({
  name: { type: String },
  address: { type: String },
  area: { type: String},
  longitude: { type: Number },
  latitude: { type: Number },
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
  reviews: [ 
      {text: {type: String},
      reviewer: {type: String}}
    ],
  transportation: [
    {
      mode: { type: String }, 
      stop: { type: String }, 
      distance: { type: String }, 
    },
  ] 
});


module.exports = mongoose.model('Venue', venueSchema)