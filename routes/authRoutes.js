const express = require('express');
const { authenticateUser } = require('../middleware/auth');
const { loginUser } = require('../controllers/loginController');
const router = express.Router();

router.post('/login', authenticateUser, loginUser);

module.exports = router;
