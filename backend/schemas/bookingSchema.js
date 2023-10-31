const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  customerId: { type: mongoose.Types.ObjectId, ref: 'User', },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
  totalPrice: { type: Number },
  date: { type: Date },
  startTime: { type: Date },
  endTime: { type: Date },
  bookingNumber: { type: Number },
  catering: { type: Boolean },
}, {
  timestamps: true
})

//lämna bookingNUmber tom så ger mongodb den ett nummer


module.exports = mongoose.model('Booking', bookingSchema)

//billing, ska det vara pdf fil att ladda ner. Kolla typen av det. tbd även fixa time, bookingnumber och kolla catering
//ska jag ha med terms?? hårdkoda terms