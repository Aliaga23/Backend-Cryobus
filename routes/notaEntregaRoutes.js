// routes/notaEntregaRoutes.js
const express = require('express');
const router = express.Router();
const notaEntregaController = require('../controllers/notaEntregaController');

router.get('/', notaEntregaController.getNotasEntrega);
router.get('/:nro', notaEntregaController.getNotaEntregaById);
router.post('/', notaEntregaController.createNotaEntrega);
router.put('/:nro', notaEntregaController.updateNotaEntrega);
router.delete('/:nro', notaEntregaController.deleteNotaEntrega);

module.exports = router;
