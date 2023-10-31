const router = require('express').Router();
const { addBooking, getBookingById, getBookingsByUser, getBookings } = require('../models/bookingModel');
const { verifyToken } = require('../authentication/auth')


// Create
router.post('/', verifyToken, addBooking)


// Read
router.get('/', verifyToken, getBookings)

//when you click on a booking to go to bookingdetails?
router.get('/:id', getBookingById)



//is this needed? 
router.get('/user/:id', getBookingsByUser)



module.exports = router;