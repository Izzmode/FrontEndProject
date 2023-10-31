const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

// Create token
exports.generateToken = (user) => {
    const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '1d' })
    return token
  }


// Verify token
exports.verifyToken = (req, res, next) => {
  try {


    //the payload/userId is here added as "userId" in req obj
    //TBD remove _id if adding more things to payload? fname osv, desctruct in userModel
    const token = req.headers.authorization.split(' ')[1]
    req.userId = jwt.verify(token, secretKey)._id
    console.log(req.userId)
    next();

  } catch {
    res.status(401).json({ message: 'Access restricted. You need to login.' })
  }
}
