const express = require('express');
const { logoutUser } = require('../controllers/logoutController');
const { authenticate } = require('../middleware/auth'); // Middleware de autenticación para proteger la ruta

const router = express.Router();

router.post('/logout', authenticate, logoutUser);

module.exports = router;
