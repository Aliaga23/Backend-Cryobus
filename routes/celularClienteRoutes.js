const express = require('express');
const { getCelularesByCliente, createCelular, deleteCelular } = require('../controllers/celularClienteController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/:codigoCliente', authenticate, authorize([30]), getCelularesByCliente);
router.post('/', authenticate, authorize([13]), createCelular);
router.delete('/:codigoCliente/:numero', authenticate, authorize([13]), deleteCelular);

module.exports = router;
