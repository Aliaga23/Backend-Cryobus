const express = require('express');
const router = express.Router();
const { getBitacora } = require('../controllers/bitacoraController');

router.get('/', getBitacora);

module.exports = router;
