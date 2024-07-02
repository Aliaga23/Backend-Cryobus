const express = require('express');
const router = express.Router();
const paqueteController = require('../controllers/paqueteController');

router.get('/', paqueteController.getPaquetes);
router.get('/:codigo', paqueteController.getPaqueteById);
router.post('/', paqueteController.createPaquete);
router.put('/:codigo', paqueteController.updatePaquete);
router.delete('/:codigo', paqueteController.deletePaquete);

router.post('/:codigo/tipos', paqueteController.addTipoPaqueteToPaquete);
router.delete('/:codigo/tipos', paqueteController.removeTipoPaqueteFromPaquete);

module.exports = router;
