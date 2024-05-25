const express = require('express');
const { getRegistros, createRegistro } = require('../controllers/bitacoraController');

const router = express.Router();

router.get('/', getRegistros);
router.post('/', createRegistro);

module.exports = router;
