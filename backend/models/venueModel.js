const Venue = require('../schemas/venueSchema');



exports.addVenue = async (req, res) => {

  const { name, address, area, longitude, latitude, numberOfPeople, information, amenities, contact, 
    website, arrangements, thumbnail, images, pricePerHour, rating, reviews, transportation } = req.body;

  // if(!name) res.status(400).json({ message: 'You need to give the product a name' });
  // if(!adress) res.status(400).json({ message: 'You need to give the product a adress' });
  // if(!numberOfPeople) res.status(400).json({ message: 'You need to add numberOfPeople' });
  // if(!information) res.status(400).json({ message: 'You need to give the product informationL' });
  // if(!amenities) res.status(400).json({ message: 'You need to give the product amenities' });
  // if(!contact) res.status(400).json({ message: 'You need to give the product a contact' });
  // if(!pricePerHour) res.status(400).json({ message: 'You need to give the product pricePerHour' });

  const venue = await Venue.create({ name, address, area, longitude, latitude, numberOfPeople, information, amenities, contact, 
    website, arrangements, thumbnail, images, pricePerHour, rating, reviews, transportation });

  if(!venue) res.status(500).json({ message: 'Something went wrong when creating new venue' });

  res.status(201).json(venue)
}
// Get all venues

exports.getVenues = async (req, res) => {

  const venues = await Venue.find();

  if(!venues) res.status(500).json({ message: 'Something went wrong when getting venues' });

  res.status(200).json(venues)
}


// Get specific venue by id

exports.getVenueById = async (req, res) => {

  const venue = await Venue.findById(req.params.id)

  if(!venue) res.status(404).json({ message: 'Could not find venue' });

  res.status(200).json(venue)
}
