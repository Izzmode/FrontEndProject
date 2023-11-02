const router = require('express').Router();
const { addVenue, getVenues, getVenueById } = require('../models/venueModel');
// const { verifyToken } = require('../authentication/auth')



// Create
router.post('/', addVenue);

// Read
router.get('/', getVenues);
router.get('/:id', getVenueById);


module.exports = router;