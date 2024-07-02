const express = require('express');
const router = express.Router();
const paqueteController = require('../controllers/paqueteController');

router.get('/', paqueteController.getPaquetes);
router.get('/tiposPaquete', paqueteController.getTiposPaquete);
router.get('/:codigo', paqueteController.getPaqueteById);
router.post('/', paqueteController.createPaquete);
router.put('/:codigo', paqueteController.updatePaquete);
router.delete('/:codigo', paqueteController.deletePaquete);

module.exports = router;
