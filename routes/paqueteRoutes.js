// routes/paqueteRoutes.js
const express = require('express');
const router = express.Router();
const paqueteController = require('../controllers/paqueteController');

router.get('/', paqueteController.getPaquetes);
router.post('/', paqueteController.createPaquete);
router.get('/:codigo', paqueteController.getPaqueteById);

router.put('/:codigo', paqueteController.updatePaquete);
router.delete('/:codigo', paqueteController.deletePaquete);
router.get('/:codigoPaquete/tipos', paqueteController.getTiposPaquete);
router.post('/:codigoPaquete/tipos', paqueteController.addTipoPaqueteToPaquete);
router.delete('/:codigoPaquete/tipos', paqueteController.removeTipoPaqueteFromPaquete);

module.exports = router;
