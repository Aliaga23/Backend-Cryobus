const express = require('express');
const { fetchAllRegistros, createRegistro } = require('../controllers/bitacoraController');

const router = express.Router();

router.get('/', fetchAllRegistros);
router.post('/', createRegistro);

module.exports = router;
