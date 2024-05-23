// routes/notaEntregaRoutes.js
const express = require('express');
const router = express.Router();
const notaEntregaController = require('../controllers/notaEntregaController');

router.get('/', notaEntregaController.getNotasEntrega);
router.get('/:nro', notaEntregaController.getNotaEntregaById);
router.post('/', notaEntregaController.createNotaEntrega);
router.put('/:nro', notaEntregaController.updateNotaEntrega);
router.delete('/:nro', notaEntregaController.deleteNotaEntrega);
router.get('/clientes', notaEntregaController.getClientes);
router.get('/tiposEnvio', notaEntregaController.getTiposEnvio);
router.get('/estadosEntrega', notaEntregaController.getEstadosEntrega);
router.get('/paquetes', notaEntregaController.getPaquetes);

module.exports = router;
