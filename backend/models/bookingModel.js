const Booking = require('../schemas/bookingSchema');


//function for calculation the total price for booking
// Booking.calculatePrice = async function (booking) {

//   // Fetch the venue object based on the ObjectId reference
//   const populatedBooking = await Booking.findById(booking._id).populate('venue');
//   const venue = populatedBooking.venue;

//   const durationInHours = (booking.endTime - booking.startTime) / 3600000; // Milliseconds to hours
  
//     // Calculate the total price
//     const totalPrice = venue.pricePerHour * durationInHours;
  
//     return totalPrice;
//   };


  // Create new booking
exports.addBooking = async (req, res) => {
  
  const { venue, date, hours, catering, totalPrice } = req.body;
  if(!venue) return res.status(400).json({ message: 'You need to enter venues to your cart' })

  console.log(req.userId)
  // Creating new booking with the logged in user's id as customerId, change to userId?
  const booking = await Booking.create({
    customerId: req.userId,
    venue,
    date,
    hours,
    catering,
    totalPrice
  })

  if(!booking) return res.status(500).json({ message: 'Something went wrong when creating booking' })

  //saving the total price by running the function
  // const totalPrice = await Booking.calculatePrice(booking);
  

  // Add the totalPrice to the booking object
  // booking.totalPrice = totalPrice;
  
  // Save the booking with the totalPrice
  await booking.save();
  
  
  res.status(201).json(booking)
}

exports.getBookings = async (req, res) => {

    try{

      const bookings = await Booking.find({ customerId: req.userId })
      //TBD populate more from venue
      .populate({ path: 'venue', select: 'name address thumbnail' })
    //   .populate({ path: 'bookingStatus', select: 'status' })

      if(!bookings) res.status(500).json({ message: 'Something went wrong when getting bookings' })

      res.status(200).json(bookings)
    }

    catch {
        return res.status(500).json()
    }
}


// Get a specific booking by id
//TBD populate here aswell?

exports.getBookingById = async (req, res) => {

  const booking = await Booking.findById(req.params.id)

  if(!booking) res.status(404).json({ message: 'Could not find booking' })

  res.status(200).json(booking)
}













// Get all bookings made by specific user
//Is this needed??????

exports.getBookingsByUser = async (req, res) => {

  const bookings = await Booking.find({ customerId: req.params.id })
  .populate({ path: 'venue', select: 'name adress thumbnail' })
//   .populate({ path: 'bookingStatus', select: 'status' })

  if(!bookings) res.status(404).json({ message: 'Could not find bookings' })

  res.status(200).json(bookings)
}

// exports.getBookingsByUserTest = async (req, res) => {

//   const bookings = await Booking.find({ customerId: req.userId })
//   .populate({ path: 'venue', select: 'name adress thumbnail' })
// //   .populate({ path: 'bookingStatus', select: 'status' })

//   if(!bookings) res.status(404).json({ message: 'Could not find bookings' })

//   res.status(200).json(bookings)
// }