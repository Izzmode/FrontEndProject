const User = require('../schemas/userSchema');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../authentication/auth');


 // Add new user

 exports.addUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'You need to enter an email address' });
  }

  if (!password) {
    return res.status(400).json({ message: 'You need to enter a password' });
  }

  const user = await User.findOne({ email })
  if(user){
    return res.status(404).json({
      message: "this user already exists"
    })
  }

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password
    const hash = await bcrypt.hash(password, salt);

    // Creating a new user with the hashed password in the database
    const _user = new User({ email, passwordHash: hash });
    const user = await _user.save();

    if (!user) {
      return res.status(500).json({ message: 'Something went wrong when creating a new user' });
    }
      
    // Generating token
      return res.status(200).json(generateToken(user))
  } 
  
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error while creating a new user' });
  }
};



// Log in

exports.login = async (req, res) => {
  
  const { email, password } = req.body;

  if(!email || !password) res.status(400).json({ message: 'You need to enter an email address and a password' })

  // Checking if input email exists as saved user email
  const user = await User.findOne({ email });
  if(!user) return res.status(401).json({ message: 'Incorrect credentials' })
  

  // Comparing entered password with decrypted saved password
  const result = await bcrypt.compare(password, user.passwordHash);
  if(!result) return res.status(401).json({ message: 'Incorrect credentials' })

  // Generating token
  res.status(200).json(generateToken(user))

}


//TBD do not return whole user obj, that returns the hashed password
// exports.getUserData = (req, res) => {
//  const id = req.userId

//  User.findById(id)
//  .then (user => {

//   //add more things here or find other way to leave out passwordhash
//   const _user = { email: user.email, id: user._id }
//   res.status(200).json(_user)
 
// })
// }