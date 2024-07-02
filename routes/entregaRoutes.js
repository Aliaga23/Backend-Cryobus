const express = require('express');
const router = express.Router();
const entregaController = require('../controllers/entregaController');

router.get('/', entregaController.getEntregas);
router.get('/:nro', entregaController.getEntregaByNRO);
router.post('/', entregaController.createOrUpdateEntrega);
router.put('/:nro', entregaController.createOrUpdateEntrega);

module.exports = router;
