const express = require('express');
const { fetchAllNotasTraslado, createNotaTraslado } = require('../controllers/notaTrasladoController');

const router = express.Router();

router.get('/', fetchAllNotasTraslado);
router.post('/', createNotaTraslado);

module.exports = router;
