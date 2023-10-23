const router = require('express').Router();
const { addBooking, getBookingById, getBookingsByUser, getBookings } = require('../models/bookingModel');
// const { verifyToken, checkAdmin } = require('../authentication/auth')


// Create
// router.post('/', verifyToken, addOrder)
router.post('/', addBooking)

// router.post('/add/:id', addToExistingOrder)

// Read
router.get('/', getBookings)
// router.get('/', verifyToken, checkAdmin, getOrders)
router.get('/:id', getBookingById)
router.get('/user/:id', getBookingsByUser)



module.exports = router;