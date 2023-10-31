const Likes = require('../schemas/likesSchema');

exports.toggleLike = async (req, res) => {
    const { venueId } = req.body;

    // Ensure a user is authenticated (you can use your `verifyToken` middleware here)

    try {
        // Check if the user has already liked the venue
        const existingLike = await Likes.findOne({
            user: req.userId, // Assuming this is set by your `verifyToken` middleware
            venue: venueId,
        });

        if (existingLike) {
            // If the user has already liked the venue, delete the existing like
            await Likes.deleteOne({
                user: req.userId,
                venue: venueId,
            });

            return res.status(200).json({ message: 'Venue unliked' });
        } else {
            // If the user hasn't liked the venue, create a new like
            const like = await Likes.create({
                user: req.userId,
                venue: venueId,
            });

            if (!like) {
                return res.status(500).json({ message: 'Something went wrong when adding a like' });
            }

            return res.status(201).json(like);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getLikes = async (req, res) => {

    try{
    
      const likes = await Likes.find({ user: req.userId })
      // console.log(req.userId)
      //TBD populate more from venue
      .populate({ path: 'venue', select: 'name adress thumbnail' })
    //   .populate({ path: 'bookingStatus', select: 'status' })
    
      if(likes.length === 0) return res.status(404).json({ message: 'No likes found' });
    
      res.status(200).json(likes)
    }
    
      catch {
        return res.status(500).json()
      }
    }
    

