// routes/estadoEntregaRoutes.js
const express = require('express');
const estadoEntregaController = require('../controllers/estadoEntregaController');
const router = express.Router();

router.get('/', estadoEntregaController.getEstadosEntrega);
router.get('/:id', estadoEntregaController.getEstadoEntrega);
router.post('/', estadoEntregaController.createEstadoEntrega);
router.put('/:id', estadoEntregaController.updateEstadoEntrega);
router.delete('/:id', estadoEntregaController.deleteEstadoEntrega);

module.exports = router;
