const router = require('express').Router();

const { toggleLike, getLikes } = require('../models/likesModel');
const { verifyToken } = require('../authentication/auth')



// Create
router.post('/add', verifyToken, toggleLike)

// Read
router.get('/', verifyToken, getLikes)



module.exports = router;