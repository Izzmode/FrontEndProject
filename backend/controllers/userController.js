const router = require('express').Router();
const { verifyToken } = require('../authentication/auth');
const { addUser, login, getUserData } = require('../models/userModel');


// Create
router.post('/add', addUser);
router.post('/login', login);

//Read

router.get('/profile', verifyToken, getUserData)

module.exports = router;