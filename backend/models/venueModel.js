const Venue = require('../schemas/venueSchema');



exports.addVenue = async (req, res) => {

  const { name, adress, numberOfPeople, information, amenities, contact, 
    website, arrangements, thumbnail, images, pricePerHour, rating, favourite } = req.body;

  // if(!name) res.status(400).json({ message: 'You need to give the product a name' });
  // if(!description) res.status(400).json({ message: 'You need to give the product a description' });
  // if(!price) res.status(400).json({ message: 'You need to give the product a price' });
  // if(!imageURL) res.status(400).json({ message: 'You need to give the product a imageURL' });
  // if(!tags) res.status(400).json({ message: 'You need to give the product a tag' });
  // if(!rating) res.status(400).json({ message: 'You need to give the product a rating' });
  // if(!review) res.status(400).json({ message: 'You need to give the product a review' });

  const venue = await Venue.create({ name, adress, numberOfPeople, information, amenities, contact, 
    website, arrangements, thumbnail, images, pricePerHour, rating, favourite });

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
