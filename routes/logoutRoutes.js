const express = require('express');
const { logoutUser } = require('../controllers/logoutController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, logoutUser);

module.exports = router;
