const express = require('express');
const { fetchAllNotasTraslado, createNotaTraslado } = require('../controllers/reporteTrasladoController');

const router = express.Router();

router.get('/', fetchAllNotasTraslado);
router.post('/', createNotaTraslado);

module.exports = router;
