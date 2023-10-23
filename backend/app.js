const express = require('express');
const cors = require('cors')
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

// app.use('/api/users', require('./controllers/userController'));
app.use('/api/venues', require('./controllers/venueController'));
app.use('/api/bookings', require('./controllers/bookingController'))

module.exports = app