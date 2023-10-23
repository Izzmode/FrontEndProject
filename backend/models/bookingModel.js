const Booking = require('../schemas/bookingSchema');

Booking.calculatePrice = async function (booking) {

  // Fetch the venue object based on the ObjectId reference
  const populatedBooking = await Booking.findById(booking._id).populate('venue');
  const venue = populatedBooking.venue;

  const durationInHours = (booking.endTime - booking.startTime) / 3600000; // Milliseconds to hours
  
    // Calculate the total price
    const totalPrice = venue.pricePerHour * durationInHours;
  
    return totalPrice;
  };

// Create new booking

exports.addBooking = async (req, res) => {
  
  const { customerId, venue, startTime, endTime, catering, billing } = req.body;
  if(!venue) return res.status(400).json({ message: 'You need to enter venues to your cart' })


  // Creating new booking with the logged in user's id as customerId
  const booking = await Booking.create({
    customerId,
    venue,
    startTime,
    endTime,
    catering,
    billing
  })

  if(!booking) return res.status(500).json({ message: 'Something went wrong when creating booking' })


  const totalPrice = await Booking.calculatePrice(booking);
  

  // Add the totalPrice to the booking object
  booking.totalPrice = totalPrice;

  console.log(totalPrice)

  // Save the booking with the totalPrice
  await booking.save();


  res.status(201).json(booking)
}

exports.getBookings = async (req, res) => {

  const bookings = await Booking.find()
  .populate({ path: 'venue', select: 'name adress thumbnail' })
//   .populate({ path: 'bookingStatus', select: 'status' })

  if(!bookings) res.status(500).json({ message: 'Something went wrong when getting bookings' })

  res.status(200).json(bookings)
}


// Get a specific booking by id

exports.getBookingById = async (req, res) => {

  const booking = await Booking.findById(req.params.id)

  if(!booking) res.status(404).json({ message: 'Could not find booking' })

  res.status(200).json(booking)
}


// Get all bookings made by specific user

exports.getBookingsByUser = async (req, res) => {

  const bookings = await Booking.find({ customerId: req.params.id })
  .populate({ path: 'venue', select: 'name adress thumbnail' })
//   .populate({ path: 'bookingStatus', select: 'status' })

  if(!bookings) res.status(404).json({ message: 'Could not find bookings' })

  res.status(200).json(bookings)
}