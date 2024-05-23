// routes/tipoEnvioRoutes.js
const express = require('express');
const { getTipoEnvios, getTipoEnvioById, createTipoEnvio, updateTipoEnvio, deleteTipoEnvio } = require('../controllers/tipoEnvioController');

const router = express.Router();

router.get('/', getTipoEnvios);
router.get('/:id', getTipoEnvioById);
router.post('/', createTipoEnvio);
router.put('/:id', updateTipoEnvio);
router.delete('/:id', deleteTipoEnvio);

module.exports = router;
