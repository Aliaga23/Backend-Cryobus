const express = require('express');
const router = express.Router();
const { getTipoEnvios, getTipoEnvioById, createTipoEnvio, updateTipoEnvio, deleteTipoEnvio } = require('../controllers/tipoEnvioController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate,authorize([12]) , getTipoEnvios);
router.get('/:id', authenticate,authorize([12]) , getTipoEnvioById);
router.post('/', authenticate,authorize([29]) , createTipoEnvio);
router.put('/:id', authenticate, authorize([29]) ,updateTipoEnvio);
router.delete('/:id', authenticate,authorize([29]) , deleteTipoEnvio);

module.exports = router;

