const express = require('express');
const router = express.Router();
const paqueteController = require('../controllers/paqueteController');

router.get('/', paqueteController.getPaquetes);
router.post('/', paqueteController.createPaquete);
router.put('/:codigo', paqueteController.updatePaquete);
router.delete('/:codigo', paqueteController.deletePaquete);
router.get('/:codigoPaquete/tipos', paqueteController.getTiposByPaquete);
router.post('/:codigoPaquete/tipos', paqueteController.addTipoToPaquete);
router.delete('/:codigoPaquete/tipos', paqueteController.removeTipoFromPaquete);

module.exports = router;
